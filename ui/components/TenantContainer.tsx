"use client";
import React, { useState } from "react";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
  IconButton,
  Pagination,
  CircularProgress,
} from "@mui/material";
import NOLISTING from "/public/assets/NOLISTING.jpg";
import { SearchRounded } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.instance";

import { IPropertyList } from "./CardContainerLandlord";
import PropertyCard from "./PropertyCard";
import Image from "next/image";

import CardContainerTenant from "./CardContainerTenant";

interface ISortValues {
  category: string;
  sortby: string;
  page: number;
  limit: number;
}

const TenantContainer = () => {
  // Added missing states:
  const [category, setCategory] = useState<string>("");
  const [sortby, setSortby] = useState<string>(""); // your `filter` renamed to `sortby` for consistency
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasSearched, setHasSearched] = useState(false);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setSortby(event.target.value);
  };

  // Added missing category handler
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  // Removed unused location and keyword handlers (optional)

  const { mutate, data, isPending } = useMutation({
    mutationKey: ["Sort-products", currentPage],
    mutationFn: async (value: ISortValues) => {
      const response = await axiosInstance.post(
        "/property/tenant/sort-list",
        value
      );
      return response;
    },
  });
  if (isPending) {
    return <CircularProgress color="warning" />;
  }
  // Fixed propertyList key name and fallback:
  const propertyList: IPropertyList[] = data?.data?.propertyList ?? [];
  const totalPages: number = data?.data?.totalPages ?? 1;
  if (hasSearched && (!data || propertyList.length === 0)) {
    return (
      <div className=" flex flex-col justify-center items-center ">
        <Image
          src={NOLISTING}
          alt="Empty Property Basket"
          width={400}
          height={300}
        />

        <button
          className="bg-green-900 text-white px-6 py-3 rounded-full text-lg transition-all"
          onClick={() => setHasSearched(false)}
        >
          Keep Exploring.
        </button>
      </div>
    );
  }
  // Added handler to fetch with current filters and reset page
  const handleSearch = () => {
    setHasSearched(true);
    setCurrentPage(1);
    mutate({ category, sortby, page: 1, limit: 3 });
  };

  // Added handler for pagination change (optional)
  // If you want to add pagination component later, update currentPage and mutate here

  // Color variables consistent with tenant theme
  const colors = {
    primaryOrange: "#D97904",
    primaryOrangeTransparent: "rgba(217, 121, 4, 0.15)",
    brownText: "#5B6B3F", // muted olive-ish brown
    blackText: "#1B1B1B",
  };

  return (
    <>
      <div>
        <div className="p-10  max-w-3xl mx-auto">
          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            color="#5E8C42"
            gutterBottom
            sx={{ userSelect: "none" }}
          >
            LET&apos;S FIND YOUR <br />
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
            {/* Category select added */}
            <Box
              className="max-w-4xl"
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
                Category
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="category-select-label" color="warning">
                  Select Category
                </InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={category}
                  label="Select Category"
                  onChange={handleCategoryChange}
                  color="warning"
                  sx={{
                    "&:hover": {
                      backgroundColor: colors.primaryOrangeTransparent,
                    },
                  }}
                >
                  {/* <MenuItem value="">All</MenuItem> */}
                  <MenuItem value="villa">Villa</MenuItem>
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="commercial">Commercial</MenuItem>
                  <MenuItem value="homestay">Homestay</MenuItem>
                  <MenuItem value="flats">Flats</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Filter/Sort */}
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
                  value={sortby}
                  label="Sort By?"
                  onChange={handleFilterChange}
                  color="warning"
                  sx={{
                    "&:hover": {
                      backgroundColor: colors.primaryOrangeTransparent,
                    },
                  }}
                >
                  {/* <MenuItem value="">Default</MenuItem> */}
                  <MenuItem value="high">Price: High</MenuItem>
                  <MenuItem value="low">Price: Low</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Search Button */}
            <IconButton
              onClick={handleSearch}
              sx={{
                backgroundColor: "#C1440E", // Terracotta
                "&:hover": { backgroundColor: "#9A3107" }, // Darker Terracotta
                color: "white",

                width: 40,
                height: 40,
                alignSelf: "flex-end",
              }}
            >
              <SearchRounded />
            </IconButton>
          </Box>
        </div>
        {hasSearched && data && (
          <Box className="flex flex-col justify-center items-center m-8 gap-4 w-full">
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#C15400"
              textAlign="center"
              mt={8}
            >
              Find {category} Listings In Your Area.
            </Typography>
            <Box className="flex flex-wrap justify-center items-center gap-4">
              {propertyList.map((item) => (
                <PropertyCard key={item._id} {...item} />
              ))}
            </Box>

            {propertyList.length > 0 && (
              <Pagination
                page={currentPage}
                count={totalPages}
                color="secondary"
                onChange={(_, value: number) => {
                  setCurrentPage(value);
                  mutate({ category, sortby, page: value, limit: 5 });
                }}
              />
            )}
          </Box>
        )}
        {!hasSearched && (
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
        )}
      </div>
    </>
  );
};

export default TenantContainer;
