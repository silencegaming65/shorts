export const generateThumbnail = async (title: string, photo: string): Promise<string> => {
  try {
    const res = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, photo }),
    });

    if (!res.ok) throw new Error("Backend failed");

    const data = await res.json();
    
    // This MUST match the "image" key we sent from the function above
    return data.image; 
    
  } catch (error) {
    console.error("Frontend Error:", error);
    throw error;
  }
};
