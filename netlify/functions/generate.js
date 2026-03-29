export async function handler(event) {
  try {
    // 🔑 Using your new key from the screenshot
    const apiKey = "AIzaSyBkoh610hihVDp-fiFIVwRDS8AxkejTB-g"; 

    const { title, photo } = JSON.parse(event.body);
    
    // Clean the image data
    const cleanBase64 = photo.includes(',') ? photo.split(',')[1] : photo;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: `Create a professional YouTube Shorts thumbnail. TITLE: "${title}". SUBJECT: Use the person in the photo. STYLE: Cinematic, high contrast, vibrant.` },
              { inlineData: { mimeType: "image/jpeg", data: cleanBase64 } }
            ]
          }]
        })
      }
    );

    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    // Get the generated image data
    const generatedImage = data.candidates[0].content.parts[0].inlineData.data;

    return {
      statusCode: 200,
      body: JSON.stringify({ image: `data:image/png;base64,${generatedImage}` }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
