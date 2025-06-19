import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    const url = `${process.env.MONGO_DB_ISHIKA}`;

    await mongoose.connect(url).then(console.log(`Successfully connected to db`));
    // console.log("Successfully connected to db");

    // console.log("DB connection established...");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();
export default connectDB;
