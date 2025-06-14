"use client";
import TenantNavbar from "@/components/navbar/page";
import LandlordNavbar from "@/components/navbarLandlord/page";
import TenantGuard from "@/guards/TenantGuards";
import React from "react";

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#DDE4D0",

        minHeight: "100vh",
      }}
    >
      <TenantNavbar />
      <TenantGuard>
        <main className="pt-[80px] px-4">{children}</main>{" "}
      </TenantGuard>
    </div>
  );
}
