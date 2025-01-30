import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();

// ✅ Fix CORS
app.use(
  cors({
    origin: "https://aiimagica.vercel.app", // No trailing slash
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Manually Set Headers for Vercel Serverless Functions
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://aiimagica.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
import PostRouter from "./routes/PostsRoutes.js";
import GenerateImageRouter from "./routes/GenerateImageRoute.js";

app.use("/api/posts", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "HELLO MUZZ!!!" });
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

// ✅ Start Express Server (without NODE_ENV check)
connectDB().then(() => {
  app.listen(8080, () => console.log("Server running on port 8080"));
});

// ✅ Export app for Vercel Deployment
export default app;
