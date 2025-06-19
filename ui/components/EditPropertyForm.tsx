"use client";
import React from "react";
import { Formik } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { IAddProperty } from "./AddPropertyForm";
import { PropertySchema } from "@/validation/addPropertySchema";
import { propertyCategoriesForDropDown } from "@/constant/general.constant";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import { useParams, useRouter } from "next/navigation";
import { IPropertyDetailResponse } from "@/interface/property.details.interface";
import { IError } from "@/interface/error.interface";
import toast from "react-hot-toast";
import { IResponse } from "@/interface/response.interface";

const EditPropertyForm = () => {
  const params = useParams();
  const propertyId = params.id;
  const router = useRouter();
  const { isPending: editPending, mutate } = useMutation<
    IResponse,
    IError,
    IAddProperty
  >({
    mutationKey: ["edit-product"],
    mutationFn: async (values: IAddProperty) => {
      return await axiosInstance.put(`/properties/edit/${propertyId}`, values);
    },
    onSuccess: (res) => {
      toast.success(res.data?.message);
      router.push(`/common/property-details/${propertyId}`);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to edit property");
    },
  });
  const { isPending, data } = useQuery<IPropertyDetailResponse, IError>({
    queryKey: ["get-property-details"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/properties/detail/${propertyId}`
      );
      return response.data?.PropertyDetails;
    },
  });
  if (isPending) {
    return <CircularProgress />;
  }
  if (editPending) {
    return <LinearProgress />;
  }

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Formik
        enableReinitialize
        initialValues={{
          title: data?.title || "",
          location: data?.location || "",
          price: data?.price || 0,
          noOfRooms: data?.noOfRooms || 1,
          category: data?.category || "",
          description: data?.description || "",
        }}
        validationSchema={PropertySchema}
        onSubmit={(values: IAddProperty) => {
          const newValues = { ...values };
          mutate(newValues);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 w-[350px] p-6 shadow-xl rounded-2xl bg-white"
          >
            <Typography variant="h5" fontWeight={600} align="center">
              Edit Property
            </Typography>

            <FormControl fullWidth>
              <TextField
                label="Property Title"
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <FormHelperText error>{formik.errors.title}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Location"
                {...formik.getFieldProps("location")}
              />
              {formik.touched.location && formik.errors.location && (
                <FormHelperText error>{formik.errors.location}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Price ($)"
                type="number"
                {...formik.getFieldProps("price")}
              />
              {formik.touched.price && formik.errors.price && (
                <FormHelperText error>{formik.errors.price}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="No. of Rooms"
                type="number"
                {...formik.getFieldProps("noOfRooms")}
              />
              {formik.touched.noOfRooms && formik.errors.noOfRooms && (
                <FormHelperText error>{formik.errors.noOfRooms}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select {...formik.getFieldProps("category")} label="Category">
                {propertyCategoriesForDropDown.map((item) => (
                  <MenuItem key={item.id} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText error>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Description"
                multiline
                rows={4}
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description && (
                <FormHelperText error>
                  {formik.errors.description}
                </FormHelperText>
              )}
            </FormControl>

            <Button
              //   disabled={isPending}
              fullWidth
              variant="contained"
              color="success"
              type="submit"
            >
              Save Changes
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditPropertyForm;
