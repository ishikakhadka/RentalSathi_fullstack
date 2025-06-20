"use client";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
// import ChatBox from "./ChatPopup";

const TenantDetailButtons = () => {
  // const [showChat, setShowChat] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Button
          variant="contained"
          startIcon={<TextsmsOutlinedIcon />}
          // onClick={() => setShowChat(true)}
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

      {/* ChatBox appears when showChat is true */}
      {/* <ChatBox open={showChat} onClose={() => setShowChat(false)} /> */}
    </>
  );
};

export default TenantDetailButtons;
