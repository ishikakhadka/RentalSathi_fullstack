import mongoose from "mongoose";

const dbName = "rental-sathi";
const dbUserName = "ishika";
const dbPassword = encodeURIComponent("ishika123");
const dbHost = "ishika.lk02b.mongodb.net";
const dbOptions = "retryWrites=true&w=majority&appName=Ishika";

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
