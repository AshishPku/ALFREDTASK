import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import flashcardRoutes from "./routes/FlashCardRoutes.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const __dirname = path.resolve();
// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use("/api/flashcards", flashcardRoutes);
// Database connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI is missing in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((e) => console.error("MongoDB connection error:", e));

app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
