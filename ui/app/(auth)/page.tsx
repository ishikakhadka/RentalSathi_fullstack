import React from "react";
import LoginForm from "@/components/LoginForm";
import { Container, Box, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonIcon from "@mui/icons-material/Person";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fdf6f0, #f8e4d3)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Flex container for 2 columns */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // column on small, row on md+
            gap: 6,
            alignItems: "center",
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#6b3f3f" }}
            >
              Welcome to Rentalसाथी
            </Typography>
            <Typography variant="h6" mb={4} sx={{ color: "#4e3b30" }}>
              A simpler, smarter way to rent or manage your property.
            </Typography>

            {/* Icons list in 2-column flexbox */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {[
                {
                  icon: <HomeIcon sx={{ color: "#d66f4a" }} />,
                  label: "Find Rentals",
                },
                {
                  icon: <MeetingRoomIcon sx={{ color: "#d66f4a" }} />,
                  label: "List Property",
                },
                {
                  icon: <PersonIcon sx={{ color: "#d66f4a" }} />,
                  label: "Tenant or Landlord",
                },
                {
                  icon: <SupportAgentIcon sx={{ color: "#d66f4a" }} />,
                  label: "Get Support",
                },
              ].map(({ icon, label }) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    width: { xs: "100%", sm: "calc(50% - 8px)" }, // 2 columns on sm+, full width on xs
                  }}
                >
                  {icon}
                  <Typography>{label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right Section */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <LoginForm />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
