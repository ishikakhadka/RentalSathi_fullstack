"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";

const LandlordNavbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logOut = () => {
    localStorage.clear();
    router.replace("/login");
    toast.success("Logged out successfully.");
  };

  return (
    <nav className="fixed top-0 w-full bg-[#D9C3A5] shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-5">
        {/* Left Brand */}
        <div className="flex items-center gap-3">
          <i className="bi bi-building text-[#2B3A21] text-2xl"></i>
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-semibold text-[#2B3A21]">
              Rentalसाथी Landlord
            </span>
            <span className="text-[18px] italic font-bold text-[#8C4E16]">
              साथी by name, Support by nature.
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-8 text-[20px] font-medium text-[#2B3A21]">
          <li className="hover:text-[#8C4E16]">
            <Link href="/landlord/home">HOME</Link>
          </li>
          <li className="hover:text-[#8C4E16]">
            <Link href="/landlord/view-property">PROPERTIES</Link>
          </li>
          <li className="hover:text-[#8C4E16]">
            <Link href="/landlord/tenants">TENANTS</Link>
          </li>
          <li className="hover:text-[#8C4E16]">
            <Link href="/landlord/payments">PAYMENTS</Link>
          </li>
          <li className="hover:text-[#8C4E16]">
            <Link href="/landlord/support">SUPPORT</Link>
          </li>
        </ul>

        {/* Desktop Logout + Mobile Toggle */}
        <div className="flex items-center gap-6">
          {/* Desktop Logout */}
          <button
            className="hidden md:block px-5 py-3 rounded-md text-[18px] font-semibold bg-[#8C4E16] text-[#F9F6EF] hover:bg-[#2B3A21] transition-colors"
            onClick={logOut}
          >
            Logout
          </button>

          {/* Hamburger */}
          <div
            className="md:hidden text-[#2B3A21] text-2xl cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`bi ${isMenuOpen ? "bi-x-lg" : "bi-list"}`}></i>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col items-center gap-6 p-6 bg-[#D9C3A5] text-[20px] font-medium text-[#2B3A21]">
          <li className="hover:text-[#8C4E16]">
            <Link href="/landlord/home" onClick={() => setIsMenuOpen(false)}>
              HOME
            </Link>
          </li>
          <li className="hover:text-[#8C4E16]">
            <Link
              href="/landlord/view-property"
              onClick={() => setIsMenuOpen(false)}
            >
              PROPERTIES
            </Link>
          </li>
          <li className="hover:text-[#8C4E16]">
            <Link href="/landlord/tenants" onClick={() => setIsMenuOpen(false)}>
              TENANTS
            </Link>
          </li>
          <li className="hover:text-[#8C4E16]">
            <Link
              href="/landlord/payments"
              onClick={() => setIsMenuOpen(false)}
            >
              PAYMENTS
            </Link>
          </li>
          <li className="hover:text-[#8C4E16]">
            <Link href="/landlord/support" onClick={() => setIsMenuOpen(false)}>
              SUPPORT
            </Link>
          </li>
          {/* Mobile Logout Button */}
          <li>
            <button
              className="px-5 py-3 rounded-md text-[18px] font-semibold bg-[#8C4E16] text-[#F9F6EF] hover:bg-[#2B3A21] transition-colors"
              onClick={logOut}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default LandlordNavbar;
