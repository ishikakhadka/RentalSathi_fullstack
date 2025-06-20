"use client";

import React from "react";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import villa from "/public/assets/villa.jpg";
import { IBasketItem } from "./PropertyBasketContainer";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import { IResponse } from "@/interface/response.interface";
import { IError } from "@/interface/error.interface";
import toast from "react-hot-toast";

const PropertyBasketPage = (props: IBasketItem) => {
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-property-basket"],
    mutationFn: async () => {
      return await axiosInstance.delete(`/cart/property/delete/${props._id}`);
    },
    onSuccess: (res: IResponse) => {
      toast.success(res.data.message);
      router.push("/tenant/rooms");
    },
    onError: (error: IError) => {
      toast.error(error.response.data.message);
    },
  });
  const handleNavigate = () => {
    // Navigate to property detail page with property ID
    router.push(`/property-details/${props.property._id}`);
  };
  if (isPending) {
    return <CircularProgress />;
  }
  return (
    <>
      {/* Property Card */}
      <Box
        onClick={handleNavigate}
        className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] flex flex-col"
      >
        <Image
          src={props.property.image ? props.property.image : villa}
          alt="Property Title"
          height={200}
          width={400}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <Typography variant="body2" sx={{ color: "#7F4F24", mb: 0.5 }}>
              Title:
              <span className="ml-1 text-[#D17C25] font-medium">
                {props.property.title}
              </span>
            </Typography>
            <Typography variant="body2" sx={{ color: "#7F4F24", mb: 0.5 }}>
              No of Rooms:
              <span className="ml-1 text-[#D17C25] font-medium">
                {props.property.noOfRooms}
              </span>
            </Typography>
            <Typography variant="body2" sx={{ color: "#7F4F24", mb: 0.5 }}>
              Location:
              <span className="ml-1 text-[#D17C25] font-medium">
                {props.property.location}
              </span>
            </Typography>
            <Typography variant="body2" sx={{ color: "#7F4F24", mb: 0.5 }}>
              Price:
              <span className="ml-1 text-[#D17C25] font-medium">
                ${props.property.price}
              </span>
            </Typography>

            {/* <p className="text-green-800 font-semibold mt-2"></p> */}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              mutate();
            }}
            className="mt-4 px-4 py-2 rounded-xl text-white bg-amber-950"
          >
            Remove
          </button>
        </div>
      </Box>
    </>
  );
};

export default PropertyBasketPage;
