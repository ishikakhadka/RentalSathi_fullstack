"use client";
import { Box, Chip, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import { IPropertyList } from "../CardContainerLandlord";
import DeleteProperty from "../DeletePropertyDialog";

const RemoveCard = (props: IPropertyList) => {
  return (
    <>
      <Box
        className="w-[350px] h-[500px] rounded-xl transition-all duration-300 overflow-hidden flex flex-col"
        sx={{
          backgroundColor: "#fffaf5",
          border: "1px solid #f1e4d1",
          boxShadow: "0 4px 12px rgba(191, 151, 111, 0.15)",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 10px 20px rgba(191, 151, 111, 0.25)",
          },
        }}
      >
        <Image
          className="cursor-pointer hover:opacity-90 transition-opacity duration-300"
          src={props.image ? props.image : ""}
          height={200}
          width={400}
          alt={props.title}
          priority
        />

        <Box
          className="p-4 flex flex-col flex-grow"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            minHeight: 0,
          }}
        >
          <Box className="flex justify-between items-start mb-2">
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
