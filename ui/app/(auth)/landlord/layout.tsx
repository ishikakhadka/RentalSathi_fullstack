"use client";
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
        {" "}
        <main className="pt-[80px] px-4">{children}</main>
      </LandlordGuard>
    </div>
  );
}
