import express from "express";
import PropertyTable from "./property.model.js";
import yup from "yup";
import {
  isLandlord,
  isTenant,
  isUser,
} from "../middleware/middleware.authentication.js";
import validateReqBody from "../middleware/validate.req.body.middleware.js";
import { PropertySchema } from "./property.validation.js";
import { paginationSchema } from "../user/shared/pagination.schema.js";
import { validateMongoIdFromReqParams } from "../middleware/validate.mongo.id.js";
import { isOwnerofProperty } from "./properties.middleware.js";

const router = express.Router();

// add property
router.post(
  "/properties/add",
  isLandlord,
  validateReqBody(PropertySchema),
  async (req, res) => {
    try {
      const newProperty = {
        ...req.body,
        landlordId: req.loggedInUserId, // ✅ FIXED: was landlordIdId
      };

      await PropertyTable.create(newProperty);

      return res.status(201).send({
        message: "Property listed successfully.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Something went wrong while adding the property.",
      });
    }
  }
);

// view property list by tenant
router.post(
  "/properties/tenant/list",
  isTenant,
  validateReqBody(paginationSchema),
  async (req, res) => {
    const paginationData = req.body;
    const limit = paginationData.limit;
    const page = paginationData.page;
    const skip = (page - 1) * limit;

    const property = await PropertyTable.aggregate([
      {
        $match: {},
      },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          title: 1,
          location: 1,
          noOfRooms: 1,
          price: 1,
          category: 1,
          shortDescription: { $substr: ["$description", 0, 100] },
        },
      },
    ]);

    const totalItems = await PropertyTable.find().countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).send({ Properties: property, totalPages });
  }
);

// view property list by landlord
router.post(
  "/properties/landlord/list",
  isLandlord,
  validateReqBody(paginationSchema),
  async (req, res) => {
    const paginationData = req.body;
    const limit = paginationData.limit;
    const page = paginationData.page;
    const skip = (page - 1) * limit;

    const property = await PropertyTable.aggregate([
      {
        $match: {
          landlordId: req.loggedInUserId,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          title: 1,
          location: 1,
          noOfRooms: 1,
          price: 1,
          category: 1,
          shortDescription: { $substr: ["$description", 0, 100] },
        },
      },
    ]);

    const totalItems = await PropertyTable.countDocuments({
      landlordId: req.loggedInUserId,
    });
    const totalPages = Math.ceil(totalItems / limit);

    return res
      .status(200)
      .send({ message: "Property list", Properties: property, totalPages });
  }
);

// get property detail by id
router.get(
  "/properties/detail/:id",
  isUser,
  validateMongoIdFromReqParams,
  async (req, res) => {
    const propertyId = req.params.id;
    const property = await PropertyTable.findOne({ _id: propertyId });

    if (!property) {
      return res.status(404).send({
        message: "Property doesnt exist.",
      });
    }

    return res
      .status(200)
      .send({ message: "Success", PropertyDetails: property });
  }
);

// delete property
router.delete(
  "/properties/delete/:id",
  isLandlord,
  validateMongoIdFromReqParams,
  isOwnerofProperty,
  async (req, res) => {
    await PropertyTable.deleteOne({ _id: req.params.id });
    console.log(req.params.id);
    return res.status(200).send({ message: "Deleted property Successfully" });
  }
);
//edit property
router.put(
  "/properties/edit/:id",
  isLandlord,
  validateMongoIdFromReqParams,
  isOwnerofProperty,
  validateReqBody(PropertySchema),
  async (req, res) => {
    const propertyId = req.params.id;
    const newProperty = req.body;
    await PropertyTable.updateOne(
      { _id: propertyId },
      {
        $set: {
          ...newProperty,
        },
      }
    );
    return res
      .status(200)
      .send({ message: "Product has been updated Successfully" });
  }
);

export { router as propertyController };
