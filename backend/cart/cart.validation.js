import yup from "yup";
export const addItemToCartSchema = yup.object({
  propertyId: yup.string().required().trim(),
});
