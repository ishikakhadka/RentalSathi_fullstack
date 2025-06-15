"use client";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const GuestGuard = ({
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
    // if (!isAuthenticated) {
    //   toast((t) => (
    //     <span>
    //       Please login first.
    //       <br />
    //       <Button
    //         onClick={() => toast.dismiss(t.id)}
    //         variant="contained"
    //         style={{
    //           backgroundColor: "#6b3f3f",
    //           display: "flex",
    //           justifyContent: "center",
    //         }}
    //       >
    //         Dismiss
    //       </Button>
    //     </span>
    //   ));
    // }
    if (accessToken && role == "tenant") {
      router.replace("/tenant/home");
    } else if (accessToken && role == "landlord") {
      router.replace("/landlord/home");
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

  return <>{!isAuthenticated && children}</>;
};

export default GuestGuard;
