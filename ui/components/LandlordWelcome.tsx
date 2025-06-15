"use client";
import React from "react";
import Typewriter from "typewriter-effect";

import { Box } from "@mui/material";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import { useRouter } from "next/navigation";
import LandlordNavbar from "./navbarLandlord/page";

const LandlordWelcome = () => {
  const router = useRouter();

  return (
    <>
      <div className="h-[80px]"></div>
      <div className="flex justify-around">
        <div className="w-50vw">
          <h1 className="text-amber-800 font-bold text-3xl text-center p-10">
            <Typewriter
              options={{
                strings: [
                  "Welcome to RentalSathi.<br/>साथी by name, Support by nature.",
                ],
                autoStart: true,
                loop: true,
                delay: 30,
              }}
            />
          </h1>

          <div className="p-10">
            <h1 className="text-amber-900 font-bold text-center text-xl mb-6">
              Do you want to?
            </h1>

            <div className="text-xl font-bold p-10 rounded-xl flex justify-center items-center gap-6 flex-wrap bg-gradient-to-r from-[#A9746E] via-[#C48F65] to-[#8A9A5B] shadow-xl text-white">
              <Box
                onClick={() => router.push("/landlord/add-property")}
                sx={{
                  padding: "20px",
                  borderRadius: "12px",
                  backgroundColor: "#D98859",
                  color: "white",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#B85C2B",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <h4
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: 0,
                  }}
                >
                  <OtherHousesOutlinedIcon sx={{ fontSize: 40, mb: 1 }} />
                  Add Property
                </h4>
              </Box>

              <Box
                onClick={() => router.push("/landlord/view-property")}
                sx={{
                  padding: "20px",
                  borderRadius: "12px",
                  backgroundColor: "#7E9A4D",
                  color: "white",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#5B7533",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <h4
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: 0,
                  }}
                >
                  <VisibilityOutlinedIcon sx={{ fontSize: 40, mb: 1 }} />
                  View Properties
                </h4>
              </Box>

              <Box
                onClick={() => router.push("/landlord/remove-properties")}
                sx={{
                  padding: "20px",
                  borderRadius: "12px",
                  backgroundColor: "#A14B38",
                  color: "white",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#7D3728",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <h4
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: 0,
                  }}
                >
                  <RemoveCircleOutlinedIcon sx={{ fontSize: 40, mb: 1 }} />
                  Remove Properties
                </h4>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandlordWelcome;
