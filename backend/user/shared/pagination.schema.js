import yup from "yup";
export const paginationSchema = yup.object({
  page: yup.number().min(1).integer().default(1),
  limit: yup.number().min(1).integer().default(10),
});
