export async function handler(event) {
  try {
    const apiKey = process.env.GEMINIAPIKEY;
    
    // 1. Check if API Key exists
    if (!apiKey) throw new Error("API Key is missing in Netlify settings!");

    const { title, photo } = JSON.parse(event.body);

    // 2. Clean the image data (removes the "data:image/jpeg;base64," prefix)
    const cleanBase64 = photo.includes(',') ? photo.split(',')[1] : photo;

    // 3. Call the NEWEST 2026 Gemini 3 Flash model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: `Create a YouTube Shorts thumbnail. Title: "${title}". Style: Cinematic, bold text, high contrast.` },
              { inlineData: { mimeType: "image/jpeg", data: cleanBase64 } }
            ]
          }],
          generationConfig: {
            "response_mime_type": "application/json"
          }
        })
      }
    );

    const data = await response.json();

    // 4. Detailed Error Catching
    if (data.error) {
      throw new Error(`Google API Error: ${data.error.message}`);
    }

    if (!data.candidates || !data.candidates[0].content.parts[0].inlineData) {
      // If AI Studio works but this doesn't, it might be returning TEXT instead of an IMAGE
      console.log("Gemini Output:", data.candidates[0].content.parts[0].text);
      throw new Error("Model returned text instead of an image. Check your prompt.");
    }

    const generatedImage = data.candidates[0].content.parts[0].inlineData.data;

    return {
      statusCode: 200,
      body: JSON.stringify({ image: `data:image/png;base64,${generatedImage}` }),
    };

  } catch (error) {
    console.error("DEBUG LOG:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
