"use client";

import { IError } from "@/interface/error.interface";
import { RegisterUserResponse } from "@/interface/register.interface";
import axiosInstance from "@/lib/axios.instance";
// import registerUserSchema from "@/validation/registerUserSchema"; // <- Temporarily disabled for testing
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

// ✅ Moved interface to the top
interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  dob: string;
  role: string;
  gender: string;
}

const RegisterForm = () => {
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (values: IRegisterForm) => {
      return await axiosInstance.post("/user/register", values);
    },
    onSuccess: (res: RegisterUserResponse) => {
      toast.success(res?.data.message);
      router.push("/");
    },
    onError: (error: IError) => {
      toast.error(error?.response?.data?.message || "Registration failed");
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        dob: "",
        role: "",
        gender: "",
      }}
      // validationSchema={registerUserSchema} // <- Re-enable after testing
      onSubmit={(values: IRegisterForm) => {
        console.log("Submitting values:", values);
        mutate(values);
      }}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center items-center m-8 p-4 gap-3 shadow-2xl w-[450px] mx-auto"
          style={{ minHeight: "100vh" }}
        >
          <Typography variant="h5">Register</Typography>

          <FormControl fullWidth>
            <TextField
              label="First Name"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <FormHelperText error>{formik.errors.firstName}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Last Name"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <FormHelperText error>{formik.errors.lastName}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth>
            <TextField label="Email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email && (
              <FormHelperText error>{formik.errors.email}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth>
            <TextField
              type="password"
              label="Password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <FormHelperText error>{formik.errors.password}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="DOB"
              type="date"
              {...formik.getFieldProps("dob")}
              InputLabelProps={{ shrink: true }}
            />
            {formik.touched.dob && formik.errors.dob && (
              <FormHelperText error>{formik.errors.dob}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth>
            <TextField label="Address" {...formik.getFieldProps("address")} />
            {formik.touched.address && formik.errors.address && (
              <FormHelperText error>{formik.errors.address}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select {...formik.getFieldProps("gender")} label="Gender">
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"others"}>Other</MenuItem>
            </Select>
            {formik.touched.gender && formik.errors.gender && (
              <FormHelperText error>{formik.errors.gender}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select {...formik.getFieldProps("role")} label="Role">
              <MenuItem value={"tenant"}>Tenant</MenuItem>
              <MenuItem value={"landlord"}>Landlord</MenuItem>
            </Select>
            {formik.touched.role && formik.errors.role && (
              <FormHelperText error>{formik.errors.role}</FormHelperText>
            )}
          </FormControl>

          <Stack className="p-3 gap-2 w-full justify-center items-center">
            <Button
              fullWidth
              variant="contained"
              type="submit"
              style={{ backgroundColor: "#6c2d2d" }}
            >
              Register
            </Button>
            <Link href="/" className="text-purple-800">
              Already a user? Login.
            </Link>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
