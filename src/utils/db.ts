import mongoose from "mongoose";

export async function connectDB() {
  try {
    const url = process.env.MONGODB_URL || "";
    await mongoose.connect(url);
    console.log("✓ MongoDB Connected");
  } catch (error) {
    console.error("✗ MongoDB Error:", error);
    process.exit(1);
  }
}

export default mongoose;

