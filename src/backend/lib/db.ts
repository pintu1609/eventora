import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://pintukumar808284:ZyLWuB7bdBrOebml@cluster0.kqbqscz.mongodb.net/eccomerece_test";

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
}
