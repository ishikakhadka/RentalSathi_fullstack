"use client";
import React from "react";
import Typewriter from "typewriter-effect";
import { Box } from "@mui/material";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import HolidayVillageOutlinedIcon from "@mui/icons-material/HolidayVillageOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import { useRouter } from "next/navigation";

const TenantWelcome = () => {
  const router = useRouter();

  // 🌿 Earthy tone palette
  const colors = {
    textPrimary: "#4B3E2A", // Deep soil brown
    textSecondary: "#6E5C3C", // Clay brown
    bgBox: "#F5EBDD", // Sandstone beige
    iconColor: "#6A994E", // Vibrant olive green
    hoverBg: "#A45A52", // Earthy terracotta red
    hoverText: "#FAF3E0", // Light cream
    shadow: "rgba(107, 69, 33, 0.2)",
  };

  const iconBoxStyle = {
    width: "100%",
    padding: "15px",
    cursor: "pointer",
    textAlign: "center",
    userSelect: "none",
    transition: "all 0.3s ease",
  };

  const handleNavigate = (type: string) => {
    if (type) {
      router.push(`/search?type=${type}`);
    }
  };

  return (
    <div>
      <div className="h-[80px]" />

      <div className="flex justify-center px-4">
        <div className="w-full max-w-5xl">
          {/* Heading with original message */}
          <h1
            className="font-bold text-xl sm:text-2xl md:text-3xl text-center p-4 md:p-10"
            style={{ color: "#A45A52" }}
          >
            <Typewriter
              options={{
                strings: [
                  "Welcome to RentalSathi. <br/>साथी by name, Support by nature.",
                ],
                autoStart: true,
                loop: true,
                delay: 30,
                // deleteSpeed: 30,
              }}
            />
          </h1>

          {/* Subheading */}
          <div className="px-4 sm:px-10">
            <h2
              className="font-semibold text-center text-lg sm:text-xl mb-6"
              style={{ color: colors.textSecondary }}
            >
              What are you looking for?
            </h2>

            {/* Icon Grid */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4 sm:p-8 rounded-xl backdrop-blur-md"
              style={{
                backgroundColor: colors.bgBox,
                color: colors.textPrimary,
                boxShadow: `0 0 15px ${colors.shadow}`,
              }}
            >
              <Box
                onClick={() => handleNavigate("apartment")}
                sx={{
                  ...iconBoxStyle,
                  "&:hover": {
                    backgroundColor: colors.hoverBg,
                    borderRadius: "12px",
                    color: colors.hoverText,
                    svg: { color: colors.hoverText },
                  },
                }}
              >
                <ApartmentOutlinedIcon
                  sx={{ fontSize: 32, color: colors.iconColor }}
                />
                <br />
                <span className="text-sm sm:text-base">Apartment</span>
              </Box>

              <Box
                onClick={() => handleNavigate("villa")}
                sx={{
                  ...iconBoxStyle,
                  "&:hover": {
                    backgroundColor: colors.hoverBg,
                    borderRadius: "12px",
                    color: colors.hoverText,
                    svg: { color: colors.hoverText },
                  },
                }}
              >
                <HolidayVillageOutlinedIcon
                  sx={{ fontSize: 32, color: colors.iconColor }}
                />
                <br />
                <span className="text-sm sm:text-base">Villa</span>
              </Box>

              <Box
                onClick={() => handleNavigate("flat")}
                sx={{
                  ...iconBoxStyle,
                  "&:hover": {
                    backgroundColor: colors.hoverBg,
                    borderRadius: "12px",
                    color: colors.hoverText,
                    svg: { color: colors.hoverText },
                  },
                }}
              >
                <KingBedOutlinedIcon
                  sx={{ fontSize: 32, color: colors.iconColor }}
                />
                <br />
                <span className="text-sm sm:text-base">Flats</span>
              </Box>

              <Box
                onClick={() => handleNavigate("warehouse")}
                sx={{
                  ...iconBoxStyle,
                  "&:hover": {
                    backgroundColor: colors.hoverBg,
                    borderRadius: "12px",
                    color: colors.hoverText,
                    svg: { color: colors.hoverText },
                  },
                }}
              >
                <WarehouseOutlinedIcon
                  sx={{ fontSize: 32, color: colors.iconColor }}
                />
                <br />
                <span className="text-sm sm:text-base">Warehouse</span>
              </Box>

              <Box
                onClick={() => handleNavigate("commercial")}
                sx={{
                  ...iconBoxStyle,
                  "&:hover": {
                    backgroundColor: colors.hoverBg,
                    borderRadius: "12px",
                    color: colors.hoverText,
                    svg: { color: colors.hoverText },
                  },
                }}
              >
                <LocationCityOutlinedIcon
                  sx={{ fontSize: 32, color: colors.iconColor }}
                />
                <br />
                <span className="text-sm sm:text-base">Commercials</span>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantWelcome;
