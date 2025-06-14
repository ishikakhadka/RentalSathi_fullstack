import React from "react";
import LoginForm from "@/components/LoginForm";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonIcon from "@mui/icons-material/Person";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const Login = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fdf6f0, #f8e4d3)",
        display: "flex",
        alignItems: "center",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left Section: Welcome + Icons */}
          <Grid item xs={12} md={6} component="div">
            <Box>
              <Typography
                variant="h2"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#6b3f3f" }}
              >
                Welcome to Rentalसाथी
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                mb={4}
                sx={{ color: "#4e3b30" }}
              >
                A simpler, smarter way to rent or manage your property.
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6} component="div">
                  <Box display="flex" alignItems="center" gap={1}>
                    <HomeIcon sx={{ color: "#d66f4a" }} />
                    <Typography>Find Rentals</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} component="div">
                  <Box display="flex" alignItems="center" gap={1}>
                    <MeetingRoomIcon sx={{ color: "#d66f4a" }} />
                    <Typography>List Property</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} component="div">
                  <Box display="flex" alignItems="center" gap={1}>
                    <PersonIcon sx={{ color: "#d66f4a" }} />
                    <Typography>Tenant or Landlord</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} component="div">
                  <Box display="flex" alignItems="center" gap={1}>
                    <SupportAgentIcon sx={{ color: "#d66f4a" }} />
                    <Typography>Get Support</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Right Section: Login Form only, no extra box or typography */}
          <Grid item xs={12} md={6} component="div">
            <LoginForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
