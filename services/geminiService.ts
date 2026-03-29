export const generateThumbnail = async (title: string, photo: string): Promise<string> => {
  try {
    const res = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, photo }),
    });

    const data = await res.json();

    console.log("Backend response:", data);

    // TEMP: return placeholder image (so error stops)
    return "https://via.placeholder.com/300x500?text=Thumbnail+Generated";
    
  } catch (error) {
    console.error("Frontend Error:", error);
    throw error;
  }
};
