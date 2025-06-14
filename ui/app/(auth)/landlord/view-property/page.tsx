import React from "react";
import { Box, Typography, Paper, Divider, Pagination } from "@mui/material";
import CardContainerLandlord from "@/components/CardContainerLandlord";

const ViewProperty = () => {
  return (
    <Box className="min-h-screen px-4 py-8 bg-[#EFD6C0] flex justify-center">
      <Paper
        elevation={3}
        className="p-4 md:p-10 rounded-xl shadow-md bg-[#EFD6C0] w-[1000px]"
      >
        <Typography
          variant="h4"
          component="h1"
          className="font-bold mb-2 text-center text-[#3E4C3A]"
        >
          My Properties
        </Typography>

        <Typography
          variant="subtitle1"
          className="text-center mb-6 text-gray-600"
        >
          Manage and view all your listed properties here.
        </Typography>

        <Divider className="mb-6" />

        <Box className="flex flex-wrap gap-6 justify-center">
          <CardContainerLandlord />
        </Box>
      </Paper>
    </Box>
  );
};

export default ViewProperty;
