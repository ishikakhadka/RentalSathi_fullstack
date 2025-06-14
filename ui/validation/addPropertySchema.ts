import * as yup from "yup";
import { propertyCategoriesForDropDown } from "@/constant/general.constant";

export const PropertySchema = yup.object({
  title: yup
    .string()
    .required("Title is required.")
    .max(255, "Title should not exceed 255 characters."),

  location: yup
    .string()
    .required("Location is required.")
    .max(255, "Location should not exceed 255 characters."),

  price: yup
    .number()
    .typeError("Price must be a number.")
    .min(0, "Price must be a positive number.")
    .required("Price is required."),

  noOfRooms: yup
    .number()
    .typeError("Number of rooms must be a number.")
    .min(1, "There must be at least 1 room.")
    .integer("Number of rooms must be an integer.")
    .required("Number of rooms is required."),

  category: yup
    .string()
    .required("Category is required.")
    .oneOf(
      propertyCategoriesForDropDown.map((c) => c.value),
      "Invalid category selected."
    ),

  description: yup
    .string()
    .required("Description is required.")
    .min(10, "Description should be at least 10 characters.")
    .max(1000, "Description should not exceed 1000 characters."),
});
