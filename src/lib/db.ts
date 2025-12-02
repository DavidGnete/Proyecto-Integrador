import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing in .env.local");
}

export async function MongoConnection() {
  try {
    // If already connected, return early (avoid multiple connections in dev/hot-reload)
    if (mongoose.connection.readyState >= 1) {
      // 1 = connected, 2 = connecting
      console.log("MongoDB already connected (readyState=", mongoose.connection.readyState, ")");
      return;
    }

    // Connect with a short server selection timeout so failed connections fail fast
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 } as any);
    console.log("Connected to MongoDB ✔️");
  } catch (error) {
    console.error("Failed to connect to MongoDB ❌", error);
    // Important: re-throw so callers can handle the failure (avoid mongoose buffering timeouts)
    throw error;
  }
}
