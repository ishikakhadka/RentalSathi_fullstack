import React from "react";

const Services = () => {
  return (
    <section
      className="bg-[#F5EBDD] rounded-2xl shadow-lg p-8 my-12 max-w-7xl mx-auto"
      id="services"
    >
      <h3 className="text-3xl text-center font-extrabold text-[#A9746E] mb-12 tracking-wide">
        OUR SERVICES
      </h3>

      <div className="flex flex-wrap justify-center gap-10 mb-12">
        <div className="service-box w-72 p-7 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <div className="flex justify-center mb-5 text-4xl text-[#7E9A4D]">
            <i className="bi bi-house-fill"></i>
          </div>
          <h3 className="text-2xl font-semibold text-center text-[#4A433C]">
            Property Listings
          </h3>
          <p className="text-center text-[#6B6B5A] mt-3 leading-relaxed">
            Efficiently manage your property listings.
          </p>
        </div>

        <div className="service-box w-72 p-7 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <div className="flex justify-center mb-5 text-4xl text-[#7E9A4D]">
            <i className="bi bi-people-fill"></i>
          </div>
          <h3 className="text-2xl font-semibold text-center text-[#4A433C]">
            Tenant Management
          </h3>
          <p className="text-center text-[#6B6B5A] mt-3 leading-relaxed">
            Effortlessly handle tenant details and communications.
          </p>
        </div>

        <div className="service-box w-72 p-7 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <div className="flex justify-center mb-5 text-4xl text-[#7E9A4D]">
            <i className="bi bi-file-earmark-bar-graph-fill"></i>
          </div>
          <h3 className="text-2xl font-semibold text-center text-[#4A433C]">
            Lease Management
          </h3>
          <p className="text-center text-[#6B6B5A] mt-3 leading-relaxed">
            Simplify and track your lease agreements seamlessly.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        <div className="service-box w-72 p-7 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <div className="flex justify-center mb-5 text-4xl text-[#7E9A4D]">
            <i className="bi bi-piggy-bank-fill"></i>
          </div>
          <h3 className="text-2xl font-semibold text-center text-[#4A433C]">
            Rent Collection
          </h3>
          <p className="text-center text-[#6B6B5A] mt-3 leading-relaxed">
            Streamline your rent collection process securely.
          </p>
        </div>

        <div className="service-box w-72 p-7 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <div className="flex justify-center mb-5 text-4xl text-[#7E9A4D]">
            <i className="bi bi-headset"></i>
          </div>
          <h3 className="text-2xl font-semibold text-center text-[#4A433C]">
            24/7 Support
          </h3>
          <p className="text-center text-[#6B6B5A] mt-3 leading-relaxed">
            Our dedicated support team is here anytime you need help.
          </p>
        </div>

        <div className="service-box w-72 p-7 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <div className="flex justify-center mb-5 text-4xl text-[#7E9A4D]">
            <i className="bi bi-cash-coin"></i>
          </div>
          <h3 className="text-2xl font-semibold text-center text-[#4A433C]">
            Secure Transactions
          </h3>
          <p className="text-center text-[#6B6B5A] mt-3 leading-relaxed">
            We ensure your transactions are safe and reliable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
