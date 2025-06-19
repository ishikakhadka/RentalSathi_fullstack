import express from "express";
import connectDB from "./db.connection.js";
import cors from "cors";
import { userController } from "./user/user.controller.js";
import { propertyController } from "./properties/properties.controller.js";
import { cartController } from "./cart/cart.controller.js";
const app = express();
app.use(express.json());

const FRONTEND_URL = process.env.FRONTEND_URL;
//registering routes
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:3000", "http://localhost:3001"],
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
