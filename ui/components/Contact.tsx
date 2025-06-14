import React from "react";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="mt-10 bg-[#E9DCC9] text-[#6B4C3B] py-8 text-center rounded-xl shadow-lg mx-4 max-w-4xl mx-auto"
    >
      <div className="px-6">
        <h3 className="text-2xl font-semibold mb-3 tracking-wide">
          CONTACT US
        </h3>
        <p className="text-base leading-relaxed space-y-3">
          <span>📍 Address: Kathmandu, Nepal</span>
          <br />
          <span>📞 Phone: +977-9876543210</span>
          <br />
          <span>📧 Email: info@rentalsathi.com</span>
        </p>

        <div className="mt-8 border-t border-[#B48A5A] pt-4 text-sm text-[#7A6653] font-light tracking-wide">
          <p>© 2025 Rentalसाथी. All Rights Reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
