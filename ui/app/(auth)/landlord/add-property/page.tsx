import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import AddPropertyForm from "@/components/AddPropertyForm";

const AddProperty = () => {
  return (
    <Box className="flex justify-center items-center min-h-screen p-15   bg-[#EFD6C0]">
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 4,
          width: "100%",
          maxWidth: 650,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#3E4C3A",
            textAlign: "center",
          }}
        >
          Add a New Property
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ color: "#6c757d", textAlign: "center", mb: 3 }}
        >
          Fill in the details below to list your property.
        </Typography>

        <AddPropertyForm />
      </Paper>
    </Box>
  );
};

export default AddProperty;
