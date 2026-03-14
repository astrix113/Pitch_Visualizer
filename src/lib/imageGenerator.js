import axios from "axios";

export async function generateImage(prompt) {
  try {
    const response = await axios({
      url: "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "image/png", // ⭐ FIX
      },
      data: {
        inputs: prompt,
      },
      responseType: "arraybuffer",
    });

    const base64 = Buffer.from(response.data).toString("base64");

    return `data:image/png;base64,${base64}`;
  } catch (error) {
    if (error.response?.data) {
      const text = Buffer.from(error.response.data).toString();
      console.error("HF ERROR:", text);
    } else {
      console.error("HF ERROR:", error.message);
    }

    return "";
  }
}
