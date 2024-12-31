import mongoose from "mongoose";

export default async function ConnectTODb() {
  const uri = process.env.MONGODB_URI;

  try {
    if (mongoose.connections[0].readyState) {
      return false;
    }
    await mongoose.connect(uri);
  } catch (error) {}
}
