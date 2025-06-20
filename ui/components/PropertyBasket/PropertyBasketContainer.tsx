"use client";

import React from "react";
import PropertyBasketPage from "./PropertySection";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import propertybasket from "/public/assets/propertybasket.png";

export interface IProperty {
  image?: string;
  _id: string;
  title: string;
  location: string;
  price: number;
  noOfRooms: number;
  shortDescription?: string;
  category: string;
}

export interface IBasketItem {
  _id: string; // basket item ID
  property: IProperty;
}

const PropertyBasketContainer = () => {
  const router = useRouter();

  const { isPending, data, error } = useQuery({
    queryKey: ["list-property-basket-items"],
    queryFn: async () => {
      return await axiosInstance.get("/cart/list");
    },
  });

  const propertyBasketList: IBasketItem[] = data?.data?.propertyList ?? [];

  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CircularProgress color="warning" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 font-semibold">
        Failed to load property basket. Please try again later.
      </div>
    );
  }

  if (!data || propertyBasketList.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center ">
        <Image
          src={propertybasket}
          alt="Empty Property Basket"
          width={550}
          height={300}
        />

        <button
          className="bg-green-900 text-white px-6 py-3 rounded-full text-lg transition-all"
          onClick={() => router.push("/tenant/rooms")}
        >
          Explore Rooms
        </button>
      </div>
    );
  }

  return (
    <div className=" px-4">
      <h1
        className="text-3xl font-semibold text-center mb-8"
        style={{ color: "#A45A52" }}
      >
        My Property Basket
      </h1>

      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {propertyBasketList.map((item) => (
          <PropertyBasketPage key={item._id} {...item} />
        ))}
      </Box>

      {/* Continue Exploring Button */}
      <div className="flex justify-center mt-10">
        <button
          className="bg-green-900 text-white px-6 py-3 rounded-full text-lg transition-all"
          onClick={() => router.push("/tenant/rooms")}
        >
          Continue Exploring
        </button>
      </div>
    </div>
  );
};

export default PropertyBasketContainer;
