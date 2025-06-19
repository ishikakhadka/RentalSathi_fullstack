import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    const url = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?${process.env.DB_OPTION}`;

    await mongoose.connect(url);
    console.log("Successfully connected to db");

    console.log("DB connection established...");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
