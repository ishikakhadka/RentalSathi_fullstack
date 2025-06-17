"use client";

import React, { useState } from "react";
import { Form, Formik } from "formik";
import Link from "next/link";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios.instance";
import toast from "react-hot-toast";
import { PropertySchema } from "@/validation/addPropertySchema";
import { propertyCategoriesForDropDown } from "@/constant/general.constant";
import Image from "next/image";
import { File } from "buffer";
import axios from "axios";

export interface IAddProperty {
  title: string;
  location: string;
  price: number;
  noOfRooms: number;
  category: string;
  description: string;
}
const AddPropertyForm = () => {
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationKey: ["add-property"],
    mutationFn: async (values: IAddProperty) => {
      return await axiosInstance.post("/properties/add", values);
    },
    onSuccess: () => {
      toast.success("Property added!");
      router.push("/landlord/view-property");
    },
    onError: () => {
      toast.error("Failed to add property");
    },
  });
  const HandleImageUploadToCloudinary = async (image: File) => {
    try {
      const cloud_name = "dsrdkujjb";
      const upload_preset = "rental-sathi";
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", upload_preset);
      const res = await axios.post(
        ` https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      return res.data.secure_url;
    } catch (error) {
      console.log("error", error);
      toast.error("Image Upload Failed!!");
    }
  };
  return (
    <Box>
      {isPending && <LinearProgress color="success" />}
      <Formik
        initialValues={{
          title: "",
          location: "",
          price: 0, // Should be a number
          noOfRooms: 1, // Should be a number
          category: "",

          description: "",
        }}
        validationSchema={PropertySchema}
        onSubmit={async (values: IAddProperty) => {
          let imageUrl = "";
          if (image) {
            imageUrl = await HandleImageUploadToCloudinary(image);
          }
          mutate({ ...values, image: imageUrl });
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-2 items-center justify-center p-4 min-w-[350px] shadow-lg rounded-xl bg-white"
          >
            <Typography variant="h5">Add Property</Typography>
            {localUrl && (
              <Image
                src={localUrl}
                alt="Product Image"
                height={250}
                width={250}
                style={{
                  width: "350px",
                  objectFit: "cover",
                }}
              />
            )}

            <input
              type="file"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (!event || !event.target || !event.target.files) {
                  return;
                }
                const image = event.target.files[0];
                const Url = URL.createObjectURL(image);
                setLocalUrl(Url);
                setImage(image);
              }}
            ></input>
            <FormControl fullWidth>
              <TextField
                label="Property Title"
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title ? (
                <FormHelperText error>{formik.errors.title}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Location"
                {...formik.getFieldProps("location")}
              />
              {formik.touched.location && formik.errors.location ? (
                <FormHelperText error>{formik.errors.location}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Price ($)"
                type="number"
                {...formik.getFieldProps("price")}
              />
              {formik.touched.price && formik.errors.price ? (
                <FormHelperText error>{formik.errors.price}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="No. of rooms "
                type="number"
                {...formik.getFieldProps("noOfRooms")}
              />
              {formik.touched.noOfRooms && formik.errors.noOfRooms ? (
                <FormHelperText error>{formik.errors.noOfRooms}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Categories</InputLabel>
              <Select label="Categories" {...formik.getFieldProps("category")}>
                {propertyCategoriesForDropDown.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
              {formik.touched.category && formik.errors.category ? (
                <FormHelperText error>{formik.errors.category}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Description"
                multiline
                minRows={4}
                maxRows={8}
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description ? (
                <FormHelperText error>
                  {formik.errors.description}
                </FormHelperText>
              ) : null}
            </FormControl>

            <Button
              disabled={isPending}
              fullWidth
              variant="contained"
              color="success"
              type="submit"
            >
              Add Property
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddPropertyForm;
