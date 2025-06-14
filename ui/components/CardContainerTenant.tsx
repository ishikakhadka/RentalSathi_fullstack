"use client";
import { Box, CircularProgress, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PropertyCard from "./PropertyCard";
import axiosInstance from "@/lib/axios.instance";
import { useQuery } from "@tanstack/react-query";
export interface IPropertyList {
  _id: string;
  title: string;
  location: string;
  price: number;
  noOfRooms: number;
  shortDescription: string;
  category: string;
}
const CardContainerTenant = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isPending, data } = useQuery({
    queryKey: ["get-seller-list", currentPage],
    queryFn: async () => {
      return await axiosInstance.post("/properties/tenant/list", {
        page: currentPage,
        limit: 3,
      });
    },
  });
  const propertyList: IPropertyList[] = data?.data?.Properties ?? [];
  const totalPages: number = data?.data?.totalPages;
  if (isPending) {
    return <CircularProgress color="warning" />;
  }
  return (
    <Stack className="flex flex-col items-center">
      <Box className="flex flex-wrap gap-12 p-8 m-8 justify-center items-center">
        {propertyList.map((item) => {
          return <PropertyCard key={item._id} {...item} />;
        })}
      </Box>
      <Pagination
        page={currentPage}
        count={totalPages}
        variant="outlined"
        color="secondary"
        onChange={(_, values) => {
          setCurrentPage(values);
        }}
      />
    </Stack>
  );
};

export default CardContainerTenant;
