"use client";

import {
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Paper,
  Stack,
  Typography,
  useTheme,
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
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#EFD6C0",
          px: { xs: 2, md: 6 },
          py: { xs: 4, md: 6 },
          borderRadius: 3,
          boxShadow: 3,
        }}
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
          Manage and view all your listed properties here.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
          {propertyList.map((item) => (
            <PropertyCard key={item._id} {...item} />
          ))}
        </Box>
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

export default CardContainerLandlord;
