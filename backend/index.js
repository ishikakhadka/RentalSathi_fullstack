import express from "express";
import connectDB from "./db.connection.js";
import cors from "cors";
import { userController } from "./user/user.controller.js";
const app = express();
app.use(express.json());

//registering routes
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);
await connectDB();
app.use(userController);
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App is listening to  port ${PORT}`);
});
