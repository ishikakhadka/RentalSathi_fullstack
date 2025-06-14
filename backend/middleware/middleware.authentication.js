import jwt from "jsonwebtoken";
import PropertyTable from "../properties/property.model.js";
import UserTable from "../user/user.model.js";

export const isLandlord = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Received token:", token);

  if (!token) {
    console.log("No token found");
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload = null;

  try {
    const secretKey = "ajfdakhksdhkl890";
    payload = jwt.verify(token, secretKey);
    console.log("Token payload:", payload);
  } catch (error) {
    console.log("Token verification failed:", error.message);
    return res.status(401).send({ message: "Unauthorized." });
  }

  const user = await UserTable.findOne({ email: payload.email });
  console.log("Found user:", user);

  if (!user) {
    console.log("User not found");
    return res.status(401).send({ message: "Unauthorized." });
  }

  if (user.role !== "landlord") {
    console.log("User role is not landlord:", user.role);
    return res.status(401).send({ message: "Unauthorized." });
  }

  req.loggedInUserId = user._id;
  next();
};

export const isTenant = async (req, res, next) => {
  // extract token from req.headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // extract payload from token by decryption

  let payload = null;

  try {
    const secretKey = "ajfdakhksdhkl890";

    payload = jwt.verify(token, secretKey);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // find user using email from payload
  const user = await UserTable.findOne({ email: payload.email });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  if (user.role !== "tenant") {
    return res.status(401).send({ message: "Unauthorized." });
  }
  req.loggedInUserId = user._id;
  next();
};

export const isUser = async (req, res, next) => {
  // extract token from req.headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // extract payload from token by decryption

  let payload = null;

  try {
    const secretKey = "ajfdakhksdhkl890";

    payload = jwt.verify(token, secretKey);
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // find user using email from payload
  const user = await UserTable.findOne({ email: payload.email });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }
  req.loggedInUserId = user._id;
  next();
};
