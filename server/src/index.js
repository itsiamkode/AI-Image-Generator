import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();

// ✅ Dynamic CORS Configuration
const allowedOrigins = [
  "https://aiimagica.vercel.app", // ✅ Production Frontend
  "http://localhost:5173", // ✅ Dev Frontend (Vite Default)
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Manually Set Headers for Vercel Serverless Functions
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins.includes(req.headers.origin) ? req.headers.origin : "");
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

// ✅ Connect to MongoDB
const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected!!!!");
  } catch (error) {
    console.error("Error Failed to Connect", error);
  }
};

// ✅ Start Server Based on `NODE_ENV`
if (process.env.NODE_ENV !== "production") {
  connectDB().then(() => {
    app.listen(8080, () => console.log("Server running on port 8080"));
  });
}

// ✅ Export app for Vercel Deployment
export default app;
