import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing in .env.local");
}

export async function MongoConnection() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB ✔️");
  } catch (error) {
    console.error("Failed to connect to MongoDB ❌", error);
  }
}
