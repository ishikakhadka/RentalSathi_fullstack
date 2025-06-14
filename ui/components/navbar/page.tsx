"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HouseIcon from "@mui/icons-material/House";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

const TenantNavbar = () => {
  const router = useRouter();

  const colors = {
    textPrimary: "#4B3E2A", // Rich Soil Brown
    textSecondary: "#A97142", // Warm Clay Brown
    bgColor: "#F2E9DC", // Soft Sandstone Beige
    hoverColor: "#9B4A2C", // Terracotta Red
    logoutBg: "#8E3B30", // Deep Earth Red
    logoutText: "#FAF3E0", // Cream White
  };
  const logOut = () => {
    localStorage.clear();
    router.replace("/login");
    toast.success("Logged out successfully.");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 w-full shadow-lg z-50"
      style={{ backgroundColor: colors.bgColor }}
    >
      <div className="container mx-auto flex justify-between items-center p-5">
        {/* Brand */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleNavigate("/tenant/home")}
        >
          <i
            className="bi bi-house-heart"
            style={{ color: colors.textPrimary, fontSize: "28px" }}
          ></i>
          <div className="flex flex-col leading-tight">
            <span
              className="font-semibold"
              style={{ color: colors.textPrimary, fontSize: "28px" }}
            >
              Rentalसाथी
            </span>
            <span
              className="italic font-bold"
              style={{ color: colors.textSecondary, fontSize: "18px" }}
            >
              साथी by name, Support by nature.
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          {["home", "about", "rooms", "services", "contact"].map((item) => (
            <li key={item}>
              <button
                onClick={() => handleNavigate(`/tenant/${item}`)}
                style={{
                  color: colors.textPrimary,
                  fontSize: "20px",
                  fontWeight: "bold",
                  transition: "color 0.3s ease",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = colors.hoverColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = colors.textPrimary)
                }
              >
                {item.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop-only Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <button>
            <HouseIcon sx={{ color: "#A45A52", fontSize: "2rem" }} />
            <h6 style={{ color: "#A45A52", fontSize: "15px" }}>
              Property Basket
            </h6>
          </button>

          <Button
            className="px-5 py-3 rounded-md font-semibold"
            style={{
              backgroundColor: colors.textPrimary,
              color: colors.logoutText,
              fontSize: "18px",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.logoutBg;
              e.currentTarget.style.color = colors.bgColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.textPrimary;
              e.currentTarget.style.color = colors.logoutText;
            }}
            onClick={logOut}
          >
            Logout
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div
          className="md:hidden cursor-pointer"
          style={{ color: colors.textPrimary, fontSize: "28px" }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={isMenuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isMenuOpen && (
        <ul
          className="flex flex-col items-center gap-6 p-6 md:hidden"
          style={{ backgroundColor: colors.bgColor }}
        >
          {["home", "about", "rooms", "services", "contact"].map((item) => (
            <li key={item}>
              <Button
                onClick={() => handleNavigate(`/tenant/${item}`)}
                style={{
                  color: colors.textPrimary,
                  fontSize: "20px",
                  fontWeight: "bold",
                  transition: "color 0.3s ease",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = colors.hoverColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = colors.textPrimary)
                }
              >
                {item.toUpperCase()}
              </Button>
            </li>
          ))}

          {/* Mobile-only Property Basket */}
          <li>
            <button>
              <HouseIcon sx={{ color: "#A45A52", fontSize: "2rem" }} />
              <h6 style={{ color: "#A45A52", fontSize: "15px" }}>
                Property Basket
              </h6>
            </button>
          </li>

          {/* Mobile-only Logout */}
          <li>
            <Button
              className="px-5 py-3 rounded-md font-semibold"
              style={{
                backgroundColor: colors.textPrimary,
                color: colors.logoutText,
                fontSize: "18px",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.logoutBg;
                e.currentTarget.style.color = colors.bgColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.textPrimary;
                e.currentTarget.style.color = colors.logoutText;
              }}
              onClick={logOut}
            >
              Logout
            </Button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default TenantNavbar;
