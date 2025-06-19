import mongoose from "mongoose";

const DB_NAME = process.env.DB_NAME;
const DB_USER_NAME = process.env.DB_USER_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_OPTION = process.env.DB_OPTION;

const connectDB = async () => {
  try {
    const url = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?${DB_OPTION}`;

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
