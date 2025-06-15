"use client";
import Footer from "@/components/Footer";
import LandlordNavbar from "@/components/navbarLandlord/page";
import LandlordGuard from "@/guards/LandlordGuards";
import React from "react";

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ backgroundColor: "#EFD6C0", minHeight: "100vh" }}>
      <LandlordNavbar />
      <LandlordGuard>
        <main className="pt-[80px]">
          <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
            {children}
          </div>
        </main>
        <Footer />
      </LandlordGuard>
    </div>
  );
}
