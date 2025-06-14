"use client";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LandlordGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    if (accessToken && role) {
      setIsAuthenticated(true);
    }
    if (!accessToken || role != "landlord") {
      router.replace("/login");
      window.localStorage.clear();
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography variant="h5" className="text-center text-gray-600">
          Checking your authentication...
        </Typography>
      </Box>
    );
  }

  return <>{isAuthenticated && children}</>;
};

export default LandlordGuard;
