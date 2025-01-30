import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://aiimagica.vercel.app/",
    credentials: true,
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

connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port " + process.env.PORT || 3000);
  });
  app.get('/', (req, res)=>{
    res.send("Helooooo")
  })
});
