import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PeopleIcon from "@mui/icons-material/People";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const About = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#DDE4D0",
        py: 8,
        color: "#6b3f3f",
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box display="flex" alignItems="center" gap={1} mb={4}>
          <InfoIcon sx={{ fontSize: 40, color: "#d66f4a" }} />
          <Typography variant="h3" fontWeight="bold">
            About Rentalसाथी
          </Typography>
        </Box>

        {/* Description */}
        <Typography variant="body1" mb={3} fontSize="1.1rem" lineHeight={1.6}>
          Rentalसाथी is your trusted partner in simplifying the rental process.
          Whether you're a tenant looking for your next home or a landlord
          managing multiple properties, our platform offers a smarter,
          user-friendly way to connect, list, and manage rentals seamlessly.
        </Typography>

        <Typography variant="body1" mb={3} fontSize="1.1rem" lineHeight={1.6}>
          We aim to empower both tenants and landlords with tools that reduce
          the hassle and increase transparency. Our dedicated support ensures
          that you always have assistance when you need it.
        </Typography>

        {/* Features */}
        <Box mt={6}>
          <Typography
            variant="h5"
            fontWeight="medium"
            mb={3}
            sx={{ color: "#4e3b30" }}
          >
            What We Offer
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <HomeIcon sx={{ color: "#d66f4a", fontSize: 30 }} />
                <Typography>Find Your Perfect Rental</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <MeetingRoomIcon sx={{ color: "#d66f4a", fontSize: 30 }} />
                <Typography>Easy Property Listing</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <PeopleIcon sx={{ color: "#d66f4a", fontSize: 30 }} />
                <Typography>Tenant & Landlord Profiles</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={1}>
                <SupportAgentIcon sx={{ color: "#d66f4a", fontSize: 30 }} />
                <Typography>Dedicated Customer Support</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
