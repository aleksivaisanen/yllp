import mongoose from "mongoose";

/**
 * Database utility to find an already open connection, otherwise open a new connection
 */
export default async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Connected to database.");
  } catch (error) {
    console.log("DB error", error);
  }
};
