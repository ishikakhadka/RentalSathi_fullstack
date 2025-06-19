import mongoose from "mongoose";

const dbName = process.env.dbName || "rental-sathi";
const dbUserName = process.env.dbUserName || "ishika";
const dbPassword = process.env.dbPassword || encodeURIComponent("ishika123");
const dbHost = process.env.dbHost || "ishika.lk02b.mongodb.net";
const dbOptions =
  process.env.dbOptions || "retryWrites=true&w=majority&appName=Ishika";

const connectDB = async () => {
  try {
    const url = `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?${dbOptions}`;

    await mongoose.connect(url);

    console.log("DB connection established...");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
