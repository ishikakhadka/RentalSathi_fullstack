"use client";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const AddPropertyButton = () => {
  const router = useRouter();
  return (
    <Button
      type="submit"
      variant="contained"
      color="secondary"
      sx={{
        marginTop: "2rem",
      }}
      onClick={() => {
        router.push("/add-property");
      }}
    >
      Add Property
    </Button>
  );
};

export default AddPropertyButton;
