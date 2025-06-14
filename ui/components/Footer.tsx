import { Stack } from "@mui/material";
import React from "react";

const Contact = () => {
  return (
    <footer
      className="mt-10  text-[#6B4C3B] py-6 text-center"
      style={{
        backgroundColor: "#F5EBDD",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 ">
        <div className="flex justify-around">
          <Stack>
            <h3 className="text-lg font-semibold mb-2 text-green-800">
              CONTACT US
            </h3>
            <p className="text-lg text-amber-800">
              📍 Address: Kathmandu, Nepal <br />
              📞 Phone: +977-9876543210 <br />
              📧 Email: info@rentalsathi.com
            </p>
          </Stack>
          <Stack>
            <h3 className="text-lg font-semibold mb-2 text-green-800">LEGAL</h3>
            <p className="text-lg text-amber-800">
              Terms and Conditions <br />
              Privacy Policy
            </p>
          </Stack>
        </div>

        <div className="mt-6 border-t border-gray-300 pt-4 text-xs text-gray-600">
          <p>© 2025 Rentalसाथी. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
