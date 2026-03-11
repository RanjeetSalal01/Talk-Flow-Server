import mongoose from "mongoose";

export async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI || "";
    await mongoose.connect(uri);
    console.log("✓ MongoDB Connected");
  } catch (error) {
    console.error("✗ MongoDB Error:", error);
    process.exit(1);
  }
}

export default mongoose;

