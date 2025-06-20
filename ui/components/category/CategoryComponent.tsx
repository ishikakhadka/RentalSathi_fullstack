"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Pagination } from "@mui/material";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import NOLISTING from "/public/assets/NOLISTING.jpg";
import axiosInstance from "@/lib/axios.instance";
import { IPropertyList } from "../CardContainerLandlord";
import PropertyCard from "../PropertyCard";
import Image from "next/image";

const CategoryCardContainer = () => {
  const router = useRouter();
  const category = useParams().category as string;
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, data, isError, error } = useQuery({
    queryKey: ["property-list-tenant", currentPage, category],
    queryFn: async () => {
      return await axiosInstance.post(
        `/property/tenant/category-list/${category}`,
        {
          page: currentPage,
          limit: 3,
        }
      );
    },
    enabled: !!category, // only run when category is available
  });

  const propertyList: IPropertyList[] = data?.data?.propertyList || [];
  const totalPages: number = data?.data?.totalPages || 0;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    // Avoid updating state during render
    setTimeout(() => setCurrentPage(value), 0);
  };

  if (isPending) {
    return (
      <Box className="flex justify-center items-center h-96">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    toast.error(error.message || "Something went wrong.");
    return null;
  }
  if (!data || propertyList.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center ">
        <Image
          src={NOLISTING}
          alt="Empty Property Basket"
          width={400}
          height={300}
        />

        <button
          className="bg-green-900 text-white px-6 py-3 rounded-full text-lg transition-all"
          onClick={() => router.push("/tenant/rooms")}
        >
          Keep Exploring.
        </button>
      </div>
    );
  }

  return (
    <Box className="flex flex-col justify-center items-center m-8 gap-4">
      <h1
        style={{
          color: "#D17C25",
          fontSize: "2rem",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        {`${category} Properties Near YOU.`}
      </h1>
      <Box className="flex flex-wrap justify-center items-center gap-4">
        {propertyList.map((property) => (
          <PropertyCard key={property._id} {...property} />
        ))}
      </Box>

      {totalPages > 1 && (
        <Pagination
          page={currentPage}
          count={totalPages}
          variant="outlined"
          color="secondary"
          onChange={handlePageChange}
        />
      )}
    </Box>
  );
};

export default CategoryCardContainer;
