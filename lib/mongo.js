
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URI;
if (!MONGO_URL) {
  throw new Error("Please set the MONGODB_URI environment variable");
}

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGO_URL, opts).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
