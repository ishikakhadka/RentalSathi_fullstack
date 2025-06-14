import express from "express";
import mongoose from "mongoose";
import PropertyTable from "../properties/property.model.js";
import CartTable from "./cart.model.js";
import { isTenant } from "../middleware/middleware.authentication.js";
import { validateMongoIdFromReqParams } from "../middleware/validate.mongo.id.js";
import validateReqBody from "../middleware/validate.req.body.middleware.js";
import { addItemToCartSchema } from "./cart.validation.js"; // Update schema accordingly
import { cartCount } from "./cart.service.js";

const router = express.Router();

// Add property to cart
router.post(
  "/cart/property/add",
  isTenant,
  validateReqBody(addItemToCartSchema),
  async (req, res) => {
    const propertyId = req.body.propertyId;
    const tenantId = req.loggedInUserId;

    if (!mongoose.isValidObjectId(propertyId)) {
      return res.status(409).send({ message: "Invalid property ID" });
    }

    const property = await PropertyTable.findById(propertyId);
    if (!property) {
      return res.status(404).send({ message: "Property does not exist" });
    }

    const cartExists = await CartTable.findOne({ tenantId, propertyId });
    if (cartExists) {
      return res.status(409).send({ message: "Property already in your list" });
    }

    await CartTable.create({ tenantId, propertyId });

    return res.status(200).send({ message: "Property added to your list" });
  }
);

// Delete property from cart
router.delete(
  "/cart/property/delete/:id",
  isTenant,
  validateMongoIdFromReqParams,
  async (req, res) => {
    const cartId = req.params.id;
    const cartItem = await CartTable.findById(cartId);

    if (!cartItem) {
      return res.status(404).send({ message: "Property not found in list" });
    }

    if (!cartItem.tenantId.equals(req.loggedInUserId)) {
      return res.status(403).send({ message: "Access denied" });
    }

    await CartTable.deleteOne({ _id: cartId });
    return res.status(200).send({ message: "Removed property from list" });
  }
);

// Flush all properties from cart
router.delete("/cart/flush", isTenant, async (req, res) => {
  await CartTable.deleteMany({ tenantId: req.loggedInUserId });
  return res.status(200).send({ message: "Cleared your saved properties" });
});

// List saved properties
router.get("/cart/list", isTenant, async (req, res) => {
  const tenantId = req.loggedInUserId;

  const propertyList = await CartTable.aggregate([
    { $match: { tenantId } },
    {
      $lookup: {
        from: "properties",
        localField: "propertyId",
        foreignField: "_id",
        as: "propertyDetail",
      },
    },
    {
      $project: {
        _id: 1,
        property: {
          $first: "$propertyDetail",
        },
      },
    },
  ]);

  return res.status(200).send({ message: "Success", propertyList });
});

// Count saved properties
router.get("/cart/property/count", isTenant, cartCount);

export { router as cartController };
