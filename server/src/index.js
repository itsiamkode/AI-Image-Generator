import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://aiimagica.vercel.app",
  })
);
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

import PostRouter from "./routes/PostsRoutes.js";
app.use("/api/posts", PostRouter);
import GenerateImageRouter from "./routes/GenerateImageRoute.js";
app.use("/api/generateImage", GenerateImageRouter);
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "HELLO MUZZ!!!",
  });
});

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database Connected!!!!");
    })
    .catch((error) => {
      console.error("Error Failed to Connect");
      console.log(error);
    });
};

const startServer = async (req, res) => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server Started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
