import mongoose from "mongoose";

// set rule/schema/structure
const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, //"  nepal country  " =>"nepal country"
      maxlength: 255, //characters e.g. "a b"=> 3 characters
    },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    noOfRooms: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Villa",
        "Apartment",
        "Commercial",
        "Homestay",
        "Flats",
        "Warehouse",
      ],
    },
    image: {
      type: String,
      required: false,
      nullable: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },

    landlordId: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// create table
const PropertyTable = mongoose.model("Property", PropertySchema);

export default PropertyTable;
