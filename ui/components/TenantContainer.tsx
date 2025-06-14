"use client";
import React, { useState } from "react";
import Navbar from "./navbar/page";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

const TenantContainer = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setKeyword(event.target.value);
  };

  // Color variables consistent with tenant theme
  const colors = {
    primaryOrange: "#D97904",
    primaryOrangeTransparent: "rgba(217, 121, 4, 0.15)",
    brownText: "#5B6B3F", // muted olive-ish brown
    blackText: "#1B1B1B",
  };

  return (
    <>
      <div className="h-[80px]" />
      <div className="p-10 max-w-5xl mx-auto">
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          color="#5E8C42"
          gutterBottom
          sx={{ userSelect: "none" }}
        >
          LET'S FIND YOUR <br />
          DREAM HOME.
        </Typography>

        <Box
          sx={{
            backgroundColor: colors.primaryOrangeTransparent,
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            padding: 4,
            boxShadow: `0 0 15px ${colors.primaryOrangeTransparent}`,
            display: "flex",
            gap: 3,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Keyword */}
          <Box
            sx={{
              minWidth: 200,
              maxWidth: 240,
              borderRight: { xs: "none", md: "2px solid #A45403" },
              paddingRight: { md: 3 },
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color={colors.brownText}
              gutterBottom
            >
              Keyword
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="keyword-select-label" color="warning">
                Looking for?
              </InputLabel>
              <Select
                labelId="keyword-select-label"
                id="keyword-select"
                value={keyword}
                label="Looking for?"
                onChange={handleChange}
                color="warning"
                sx={{
                  "&:hover": {
                    backgroundColor: colors.primaryOrangeTransparent,
                  },
                }}
              >
                <MenuItem value="villa">Villa</MenuItem>
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="commercial">Commercial</MenuItem>
                <MenuItem value="homestay">Homestay</MenuItem>
                <MenuItem value="flats">Flats</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Location */}
          <Box
            sx={{
              minWidth: 200,
              maxWidth: 240,
              borderRight: { xs: "none", md: "2px solid #A45403" },
              paddingRight: { md: 3 },
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color={colors.brownText}
              gutterBottom
            >
              Location
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="location-select-label" color="warning">
                Address?
              </InputLabel>
              <Select
                labelId="location-select-label"
                id="location-select"
                value={location}
                label="Address?"
                onChange={handleLocationChange}
                color="warning"
                sx={{
                  "&:hover": {
                    backgroundColor: colors.primaryOrangeTransparent,
                  },
                }}
              >
                <MenuItem value="bhaktapur">Bhaktapur</MenuItem>
                <MenuItem value="lalitpur">Lalitpur</MenuItem>
                <MenuItem value="kathmandu">Kathmandu</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Filter */}
          <Box sx={{ minWidth: 200, maxWidth: 240 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              color={colors.brownText}
              gutterBottom
            >
              Filter
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="filter-select-label" color="warning">
                Sort By?
              </InputLabel>
              <Select
                labelId="filter-select-label"
                id="filter-select"
                value={filter}
                label="Sort By?"
                onChange={handleFilterChange}
                color="warning"
                sx={{
                  "&:hover": {
                    backgroundColor: colors.primaryOrangeTransparent,
                  },
                }}
              >
                <MenuItem value="high">Price: High</MenuItem>
                <MenuItem value="low">Price: Low</MenuItem>
                <MenuItem value="average">Price: Average</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default TenantContainer;
