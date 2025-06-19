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

import axiosInstance from "@/lib/axios.instance";
import { useQuery } from "@tanstack/react-query";

import Image from "next/image";
import RemoveCard from "./RemoveCard";
import AddPropertyButton from "../AddPropertyButton";
import viewproperty from "/public/assets/viewproperty.png";

export interface IPropertyList {
  _id: string;
  title: string;
  location: string;
  price: number;
  noOfRooms: number;
  shortDescription: string;
  category: string;
}

const RemoveContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, data } = useQuery({
    queryKey: ["get-seller-list", currentPage],
    queryFn: async () => {
      return await axiosInstance.post("/properties/landlord/list", {
        page: currentPage,
        limit: 3,
      });
    },
  });

  const propertyList: IPropertyList[] = data?.data?.Properties ?? [];
  const totalPages: number = data?.data?.totalPages;

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress color="warning" />
      </Box>
    );
  }

  if (!data || propertyList.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={10}
        px={2}
      >
        <Image
          src={viewproperty}
          alt="Empty Property Basket"
          width={300}
          height={200}
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <AddPropertyButton />
      </Box>
    );
  }

  return (
    <Stack alignItems="center" spacing={4} sx={{ px: 2, py: 4 }}>
      <Box className="min-h-screen px-4 py-8 bg-[#EFD6C0] flex justify-center">
        <Paper
          elevation={3}
          className="p-4 md:p-10 rounded-xl shadow-md bg-[#EFD6C0] w-[1000px]"
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            textAlign="center"
            color="#3E4C3A"
            mb={1}
          >
            My Properties
          </Typography>

          <Typography
            variant="subtitle1"
            textAlign="center"
            color="text.secondary"
            mb={4}
          >
            Delete all your listed properties here.
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <Box className="flex justify-center">
            <Box className="flex flex-col md:flex-row flex-wrap gap-12 p-8 m-8 justify-center items-center">
              {propertyList.map((item) => {
                return <RemoveCard key={item._id} {...item} />;
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
          onChange={(_, value) => setCurrentPage(value)}
        />
      )}
    </Stack>
  );
};

export default RemoveContainer;
