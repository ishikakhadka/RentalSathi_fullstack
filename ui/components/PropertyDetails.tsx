"use client";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteProperty from "./DeletePropertyDialog";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";
import { useParams, useRouter } from "next/navigation";
import TenantDetailButtons from "./TenantDetailButtons";
import AddToPropertyBasket from "./PropertyBasket/AddToPropertyBasket";

export interface IPropertyDetails {
  title: string;
  _id: string;
  category: string;
  price: number;
  location: string;
  noOfRooms: number;
  description: string;
  image?: string;
}

const PropertyDetailSection = () => {
  const [userRole, setUserRole] = useState("");
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;

  useEffect(() => {
    if (window && typeof window !== "undefined") {
      setUserRole(window.localStorage.getItem("role") as string);
    }
  }, []);

  const { data, isPending } = useQuery({
    queryKey: ["get-property-details"],
    queryFn: async () => {
      return await axiosInstance.get(`/properties/detail/${propertyId}`);
    },
  });

  const propertyDetails: IPropertyDetails = data?.data?.PropertyDetails;

  if (isPending) {
    return <CircularProgress color="warning" />;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: "80%",
        mx: "auto",
        mt: 5,
        borderRadius: 3,
        padding: 2.5,
        backgroundColor: "#fef9f4",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        color="#5A3E36"
        mb={3}
        textAlign="center"
      >
        Property Details
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {propertyDetails.image ? (
            <Image
              src={propertyDetails.image}
              height={280}
              width={380}
              alt="Property Image"
              className="rounded-2xl hover:opacity-90 transition-opacity duration-300 ease-in-out shadow-md"
            />
          ) : null}
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Typography variant="h6" fontWeight={600} color="#4E342E">
            {propertyDetails.title}
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              label={propertyDetails.category}
              sx={{
                backgroundColor: "#A5572D",
                color: "#fff",
                fontWeight: 800,
                padding: "10px",
                fontSize: "large",
              }}
            />
          </Box>

          <Typography variant="body1" fontWeight={500}>
            Price:{" "}
            <span className="font-extrabold text-[#B65A1B]">
              {propertyDetails.price}$
            </span>
          </Typography>

          <Typography variant="body1" fontWeight={500}>
            No. of Rooms:{" "}
            <span className="text-[#A85C3C] font-extrabold">
              {propertyDetails.noOfRooms}
            </span>
          </Typography>

          <Typography variant="body1" fontWeight={500}>
            Location:{" "}
            <span className="text-[#A85C3C] font-extrabold">
              {propertyDetails.location}
            </span>
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#5E4637",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              mt: 1,
            }}
          >
            {propertyDetails.description}
          </Typography>

          {userRole === "landlord" && (
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() =>
                  router.push(`/landlord/edit-property/${propertyId}`)
                }
                startIcon={<EditIcon />}
                sx={{
                  backgroundColor: "#A5572D",
                  "&:hover": {
                    backgroundColor: "#8E4722",
                  },
                  textTransform: "none",
                  fontWeight: 500,
                  px: 4,
                }}
              >
                Edit
              </Button>
              <DeleteProperty propertyId={propertyId} />
            </Box>
          )}

          {userRole === "tenant" && (
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <TenantDetailButtons />
              <AddToPropertyBasket propertyId={propertyId} />
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default PropertyDetailSection;
