"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const AddPropertyButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="contained"
      color="success"
      sx={{
        mt: 2,
        px: 4,
        py: 1.5,
        fontSize: "1rem",
        borderRadius: "10px",
        textTransform: "none",
        fontWeight: "600",
        boxShadow: 2,
      }}
      onClick={() => router.push("/landlord/add-property")}
    >
      Add Property.
    </Button>
  );
};

export default AddPropertyButton;
