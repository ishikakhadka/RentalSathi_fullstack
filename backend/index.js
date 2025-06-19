import dotenv from "dotenv";
// Configure dotenv before other imports
dotenv.config();

import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import connectDB from "./db.connection.js";
import cors from "cors";

// Configure dotenv to read .env file with absolute path
// dotenv.config({ path: join(__dirname, ".env") });
dotenv.config();
import { userController } from "./user/user.controller.js";
import { propertyController } from "./properties/properties.controller.js";
import { cartController } from "./cart/cart.controller.js";
const app = express();
app.use(express.json());

const FRONTEND_URL = process.env.FRONTEND_URL;
//registering routes

app.use(
  cors({
    origin: [
      "https://rental-sathi-fullstack.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true, // if you're sending cookies (optional)
  })
);

await connectDB();
app.use(userController);
app.use(propertyController);
app.use(cartController);
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App is listening to  port ${PORT}`);
});
