import { createError } from "../error.js";
import axios from "axios";
import { Buffer } from "buffer";
const API_KEY =
  "0f0a6878e60856678178e710798b7c81a3d0dad1ded7e5833d631e21c169989ad2146656f932579911aa9d4de472d38e"; // Replace with your actual API key

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",

      formData,

      {
        headers: {
          "x-api-key": API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    return res.status(200).json({ image: resultImage });
  } catch (error) {
    next(
      createError(error.status, error?.response?.data?.message || error.message)
    );
  }
};
