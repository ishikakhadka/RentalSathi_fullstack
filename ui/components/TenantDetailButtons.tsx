import { Box, Button } from "@mui/material";
import React from "react";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import HouseIcon from "@mui/icons-material/House";
const TenantDetailButtons = () => {
  return (
    <Box sx={{ display: "flex", mt: 2, gap: 3 }}>
      <Button
        variant="contained"
        startIcon={<TextsmsOutlinedIcon />}
        sx={{
          backgroundColor: "#6c2d2d",
          "&:hover": {
            backgroundColor: "#7a3b3b",
          },
          textTransform: "none",
          fontWeight: 500,
          py: 1.5,
        }}
      >
        Connect with Landlord
      </Button>
      <Button
        variant="contained"
        startIcon={<HouseIcon />}
        sx={{
          backgroundColor: "#6c2d2d",
          "&:hover": {
            backgroundColor: "#7a3b3b",
          },
          textTransform: "none",
          fontWeight: 500,
          py: 1.5,
        }}
      >
        Add to Property Basket
      </Button>
    </Box>
  );
};

export default TenantDetailButtons;
