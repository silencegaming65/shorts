export async function handler(event) {
  try {
    const apiKey = process.env.GEMINIAPIKEY;

    // Get data from frontend
    const { title, photo } = JSON.parse(event.body);

    // Clean base64 image
    const base64Data = photo.split(',')[1] || photo;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    data: base64Data,
                    mimeType: "image/jpeg",
                  },
                },
                {
                  text: `Create a high-quality YouTube thumbnail for: ${title}`,
                },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        }),
      }
    );

    const data = await response.json();

    let imageUrl = "";

    const parts = data?.candidates?.[0]?.content?.parts || [];

    for (const part of parts) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }

    // Return image to frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
