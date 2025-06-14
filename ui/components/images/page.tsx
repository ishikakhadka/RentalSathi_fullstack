"use client";
import React from "react";
import Image from "next/image"; // Use Next.js Image component for optimization
import froom1 from "/public/assets/froom1.jpg"; // Correct file path and extension
import froom2 from "/public/assets/froom2.jpg"; // Import other images
import froom3 from "/public/assets/froom3.jpg";

const colors = {
  primary: "#6c2d2d", // dark warm brown (button bg)
  primaryHover: "#C75B39", // terracotta (hover)
  buttonText: "#FAF3E0", // cream (button text)
};

const Images = () => {
  return (
    <>
      <div className="hero2 p-5 pt-10">
        <div className="img rounded-xl">
          <div className="img0 flex gap-8 justify-center w-[250px] m-auto">
            <Image
              src={froom1}
              alt="Room 1"
              width={500}
              height={300}
              className="rounded-xl shadow-lg"
            />
            <Image
              src={froom2}
              alt="Room 2"
              width={500}
              height={300}
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="img1 pt-5 w-75 m-auto flex justify-center">
            <Image
              src={froom3}
              alt="Room 3"
              width={500}
              height={300}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
        <div className="explore flex justify-center gap-5 pt-4">
          <button
            className="bton py-2 px-5 rounded-md shadow-md font-semibold transition-colors duration-300"
            style={{
              backgroundColor: colors.primary,
              color: colors.buttonText,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = colors.primaryHover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = colors.primary)
            }
          >
            <a href="" className="no-underline text-inherit">
              EXPLORE NOW
            </a>
          </button>
          <button
            className="bton py-2 px-5 rounded-md shadow-md font-semibold transition-colors duration-300"
            style={{
              backgroundColor: colors.primary,
              color: colors.buttonText,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = colors.primaryHover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = colors.primary)
            }
          >
            <a href="" className="no-underline text-inherit">
              CONNECT WITH OWNERS
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default Images;
