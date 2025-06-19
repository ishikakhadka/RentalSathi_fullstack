"use client";
import {
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PropertyCard from "./PropertyCard";
import axiosInstance from "@/lib/axios.instance";
import { useQuery } from "@tanstack/react-query";

import Image from "next/image";
import viewproperty from "/public/assets/viewproperty.png";
import AddPropertyButton from "./AddPropertyButton";

export interface IPropertyList {
  image?: string;
  _id: string;
  title: string;
  location: string;
  price: number;
  noOfRooms: number;
  shortDescription: string;
  category: string;
}
const CardContainerLandlord = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isPending, data } = useQuery({
    queryKey: ["get-seller-list", currentPage],
    queryFn: async () => {
      return await axiosInstance.post(
        "/properties/landlord/list",

        {
          page: currentPage,
          limit: 3,
        }
      );
    },
  });
  const propertyList: IPropertyList[] = data?.data?.Properties ?? [];
  const totalPages: number = data?.data?.totalPages;
  if (isPending) {
    return <CircularProgress color="warning" />;
  }
  // if (error) {
  //   toast.error(error?.response?.data?.message);
  // }
  if (!data || propertyList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-10 space-y-4">
        <Image
          src={viewproperty}
          alt="Empty Property Basket"
          width={400}
          height={200}
        />

        <AddPropertyButton />
      </div>
    );
  }

  return (
    <Stack className="flex flex-col items-center">
      <Box className="min-h-screen px-4 py-8 bg-[#EFD6C0] flex justify-center">
        <Paper
          elevation={3}
          className="p-4 md:p-10 rounded-xl shadow-md bg-[#EFD6C0] w-[1000px]"
        >
          <Typography
            variant="h4"
            component="h1"
            className="font-bold mb-2 text-center text-[#3E4C3A]"
          >
            My Properties
          </Typography>

          <Typography
            variant="subtitle1"
            className="text-center mb-6 text-gray-600"
          >
            Manage and view all your listed properties here.
          </Typography>

          <Divider className="mb-6" />

          <Box className="flex flex-wrap gap-6 justify-center">
            <Box className="flex flex-wrap gap-12 p-8 m-8 justify-center items-center">
              {propertyList.map((item) => {
                return <PropertyCard key={item._id} {...item} />;
              })}
            </Box>
          </Box>
        </Paper>
      </Box>

      {totalPages > 0 && (
        <Pagination
          page={currentPage}
          count={totalPages}
          variant="outlined"
          color="secondary"
          onChange={(_, value: number) => {
            setCurrentPage(value);
          }}
        />
      )}
    </Stack>
  );
};

export default CardContainerLandlord;
