export async function handler(event) {
  try {
    const apiKey = process.env.GEMINIAPIKEY;

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No data received" }),
      };
    }

    const { title, photo } = JSON.parse(event.body || "{}");

    if (!photo) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No image provided" }),
      };
    }

    const base64Data = photo.split(',')[1];

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
                  text: `Create a YouTube thumbnail for: ${title}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("Gemini response:", data);

    let imageUrl = "";

    const parts = data?.candidates?.[0]?.content?.parts || [];

    for (const part of parts) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    if (!imageUrl) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "No image generated", raw: data }),
      };
    }

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
