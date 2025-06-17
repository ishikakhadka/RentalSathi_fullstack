import yup from "yup";
export const PropertySchema = yup.object({
  title: yup.string().required().trim().max(255),
  location: yup.string().required("location is required.").trim().max(255),
  price: yup.number().min(0, "Price should be positive number.").required(),
  noOfRooms: yup.number().min(1).integer().required(),
  category: yup
    .string()
    .required()
    .trim()
    .oneOf([
      "Villa",
      "Apartment",
      "Commercial",
      "Homestay",
      "Flats",
      "Warehouse",
    ]),

  description: yup.string().required().trim().min(10).max(1000),
});
