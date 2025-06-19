import { Box, Button } from "@mui/material";
import React from "react";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";

const TenantDetailButtons = () => {
  return (
    <Box sx={{ display: "flex", gap: 3 }}>
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
    </Box>
  );
};

export default TenantDetailButtons;
