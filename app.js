import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Custom request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Moves to the next middleware or route
});


// Optional: Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

app.get("/", (req, res) => {
  res.send("Welcome to Product Management API!");
});

app.use("/api/products", productRoutes);

// Catch-all for 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
