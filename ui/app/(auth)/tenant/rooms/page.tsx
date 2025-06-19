import React from "react";

// import CardContainer from "@/components/CardContainer";
import TenantContainer from "@/components/TenantContainer";
import CardContainerTenant from "@/components/CardContainerTenant";
import { Box, Typography } from "@mui/material";

const tenant = () => {
  return (
    <div>
      <TenantContainer />
      <Box className="flex flex-wrap flex-col gap-12 justify-center  items-center p-2 m-2">
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#C15400"
          textAlign="center"
          mt={8}
        >
          Find Home Listings In Your Area.
        </Typography>
        <CardContainerTenant />
      </Box>
    </div>
  );
};

export default tenant;
