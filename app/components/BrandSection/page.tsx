import React, { useEffect, useState } from "react";

interface Sponsor {
  sponsorLogo: string;
}

export default function BrandSection() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    // Fetch data from API
    async function fetchSponsors() {
      try {
        const response = await fetch("https://eventives-ylkmb1ps.b4a.run/sponsors");
        const data = await response.json();
        setSponsors(data);
      } catch (error) {
        console.error("Error fetching sponsor data:", error);
      }
    }

    fetchSponsors();
  }, []);

  return (
    <section className="mt-[130px] flex flex-col items-center gap-10 sm:gap-8 px-4 py-12 bg-white rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="text-center max-w-xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#202E57] mb-4 sm:mb-6 font-proximanova2">
          Join these brands
        </h2>
        <p className="mt-2 text-gray-600">
          We&apos;ve had the pleasure of working with industry-defining brands.
          These are just some of them.
        </p>
      </div>

      {/* Brand Logo Section */}
      <div className="w-full sm:w-[80%]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-8 gap-y-10 justify-items-center items-center">
          {sponsors.length > 0 ? (
            sponsors.map((sponsor, index) => (
              <img
                key={index}
                src={sponsor.sponsorLogo}
                alt={`Sponsor ${index + 1}`}
                className="w-[100px] h-auto sm:w-[130px] object-contain transition-transform duration-300 hover:scale-110 hover:shadow-md rounded-lg"
              />
            ))
          ) : (
            <p className="col-span-full text-gray-500">No sponsors available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
