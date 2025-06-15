import ContactSection from "@/components/Contact";
import Contact from "@/components/Footer";
import Services from "@/components/Services";
import TenantWelcome from "@/components/TenantWelcome";
import React from "react";

const Home = () => {
  return (
    <div>
      <TenantWelcome />
      <Services />
    </div>
  );
};

export default Home;
