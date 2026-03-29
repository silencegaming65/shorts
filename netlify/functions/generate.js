export async function handler(event) {
  try {
    const apiKey = process.env.GEMINIAPIKEY;
    const { title, photo } = JSON.parse(event.body);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: `Create a YouTube Shorts thumbnail. TITLE: "${title}". Use the person in the photo. Cinematic style.` },
              { inlineData: { mimeType: "image/jpeg", data: photo.split(',')[1] || photo } }
            ]
          }],
          generationConfig: { response_mime_type: "application/json" }
        })
      }
    );

    const data = await response.json();
    // This looks for the base64 image string Gemini sends back
    const generatedImage = data.candidates[0].content.parts[0].inlineData.data;

    return {
      statusCode: 200,
      body: JSON.stringify({ image: `data:image/png;base64,${generatedImage}` }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "AI Failed: " + error.message }),
    };
  }
}
