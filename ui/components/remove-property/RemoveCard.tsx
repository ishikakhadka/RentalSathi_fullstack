"use client";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import villa from "/public/assets/villa.jpg";

import { useRouter } from "next/navigation";
import { IPropertyList } from "../CardContainerLandlord";
import DeleteProperty from "../DeletePropertyDialog";

const RemoveCard = (props: IPropertyList) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <Box
        className="w-[350px] h-[500px] rounded-xl transition-all duration-300 overflow-hidden"
        sx={{
          backgroundColor: "#fffaf5",
          border: "1px solid #f1e4d1",
          boxShadow: "0 4px 12px rgba(191, 151, 111, 0.15)",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 10px 20px rgba(191, 151, 111, 0.25)",
          },
        }}
      >
        <Image
          className="cursor-pointer hover:opacity-90 transition-opacity duration-300"
          src={villa}
          height={200}
          width={400}
          alt={props.title}
        />

        <Box
          className="p-4 flex flex-col h-full"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box className="flex justify-between items-center mb-2">
            <Typography
              variant="h6"
              className="font-semibold"
              sx={{ color: "#6B3E26" }}
            >
              {props.title}
            </Typography>
            <Chip
              label={props.category}
              size="small"
              sx={{
                backgroundColor: "#DA8A49",
                color: "#fff",
                fontWeight: 600,
              }}
            />
          </Box>

          <Typography variant="body2" sx={{ color: "#7F4F24", mb: 0.5 }}>
            Price:
            <span className="ml-1 text-[#D17C25] font-medium">
              ${props.price}
            </span>
          </Typography>

          <Typography variant="body2" sx={{ color: "#7F4F24", mb: 0.5 }}>
            No. of rooms:
            <span className="ml-1 text-[#D17C25] font-medium">
              {props.noOfRooms}
            </span>
          </Typography>

          <Typography variant="body2" sx={{ color: "#7F4F24", mb: 1 }}>
            Location:
            <span className="ml-1 text-[#D17C25] font-medium">
              {props.location}
            </span>
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#5e3d2e",
              textAlign: "justify",
              fontSize: "0.9rem",
              lineHeight: 1.5,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              mb: 2,
            }}
          >
            {props.shortDescription}
          </Typography>

          <Box mt="auto">
            <DeleteProperty propertyId={props._id} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RemoveCard;
