import mongoose from "mongoose";

const connectDB = async () => {
  console.log("CWD =", process.cwd());
  console.log("MONGO_URI =", process.env.MONGO_URI);

  if (!process.env.MONGO_URI) {
    throw new Error("❌ MONGO_URI is missing");
  }

  await mongoose.connect(process.env.MONGO_URI);
};

export default connectDB;
