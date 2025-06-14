import EditPropertyForm from "@/components/EditPropertyForm";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const EditProperty = () => {
  return (
    <Box
      className="flex justify-center items-center min-h-screen p-15
      bg-[#EFD6C0]"
    >
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
          Edit Your Property
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ color: "#6c757d", textAlign: "center", mb: 3 }}
        >
          Fill in the details below to edit your property.
        </Typography>

        <EditPropertyForm />
      </Paper>
    </Box>
  );
};

export default EditProperty;
