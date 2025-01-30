import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://aiimagica.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Routes
import PostRouter from "./routes/PostsRoutes.js";
import GenerateImageRouter from "./routes/GenerateImageRoute.js";

app.use("/api/posts", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "HELLO MUZZ!!!",
  });
});

// Connect to MongoDB
const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected!!!!");
  } catch (error) {
    console.error("Error Failed to Connect", error);
  }
};

// Connect to DB before handling requests
connectDB();

// ✅ Export app instead of `app.listen()`
export default app;
