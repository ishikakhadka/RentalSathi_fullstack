"use client";
import { LoginCredentials } from "@/validation/loginValidationSchema";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import Link from "next/link";
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import toast from "react-hot-toast";
import { IError } from "@/interface/error.interface";
import { ILoginResponse } from "@/interface/login.interface";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios.instance";

interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationKey: ["Login-user"],
    mutationFn: async (values: ILoginForm) => {
      return await axiosInstance.post("/user/login", values);
    },
    onSuccess: (res: ILoginResponse) => {
      const accessToken = res.data.accessToken;
      const firstName = res.data.userDetails?.firstName;
      const role = res.data.userDetails?.role;
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("firstName", firstName);
      window.localStorage.setItem("role", role);
      toast.success("Login Successful");
      if (role === "landlord") {
        router.push("/landlord/home");
      } else {
        router.push("/tenant/home");
      }
    },
    onError: (error: IError) => {
      toast.error(error.response.data.message);
    },
  });

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginCredentials}
      onSubmit={(values: ILoginForm) => mutate(values)}
    >
      {(formik) => (
        <div className="flex justify-center items-center pt-5 w-75">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col w-[340px] rounded-xl overflow-hidden shadow-lg"
            style={{ backgroundColor: "#FAF3E0", borderRadius: "12px" }}
          >
            <div className="py-4" style={{ backgroundColor: "#6b3f3f" }}>
              <Typography
                variant="h5"
                align="center"
                className="text-white font-bold tracking-wide"
              >
                LOGIN HERE
              </Typography>
            </div>

            <div className="flex flex-col gap-4 p-6">
              <FormControl fullWidth>
                <TextField
                  label="Email"
                  {...formik.getFieldProps("email")}
                  variant="standard"
                  sx={{
                    input: { color: "#6b3f3f" },
                    label: { color: "#6b3f3f" },
                  }}
                />
                {formik.touched.email && formik.errors.email && (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Password"
                  type="password"
                  {...formik.getFieldProps("password")}
                  variant="standard"
                  sx={{
                    input: { color: "#6b3f3f" },
                    label: { color: "#6b3f3f" },
                  }}
                />
                {formik.touched.password && formik.errors.password && (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                )}
              </FormControl>

              <Button
                disabled={isPending}
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#6b3f3f",
                  "&:hover": { backgroundColor: "#b25838" },
                }}
              >
                Submit
              </Button>

              <h5 className="text-[#6b3f3f] text-center font-bold">
                Log in with:
              </h5>
              <div className="icons flex justify-center gap-2.5 text-[#6b3f3f]">
                <i className="bi bi-facebook" style={{ fontSize: "25px" }}></i>
                <i className="bi bi-google" style={{ fontSize: "25px" }}></i>
                <i className="bi bi-instagram" style={{ fontSize: "25px" }}></i>
              </div>

              <Link
                href="/register"
                className="text-center text-sm text-[#9e2828] font-semibold"
              >
                Don&apos;t have an account? Sign up here.
              </Link>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
