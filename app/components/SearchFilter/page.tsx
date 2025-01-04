"use client";

import { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export default function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [place, setPlace] = useState("Surabaya");
  const [time, setTime] = useState("Any date");

  return (
    <div className="bg-transparent sm:bg-transparent lg:bg-indigo-900 rounded-2xl py-6 px-4 sm:px-6 lg:px-8 shadow-xl max-w-6xl mx-auto relative z-10 lg:-mt-20 sm:mt-5 lg:py-8 mt-10 mb-5">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8 text-white">
        {/* Search Event Input */}
        <div className="flex items-center border border-indigo-700 rounded-lg overflow-hidden transition hover:border-indigo-500 focus-within:border-indigo-500 gap-2">
          <FaSearch className="text-indigo-400 ml-4" />
          <input
            id="searchEvent"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events..."
            className="w-full p-3 bg-transparent sm:bg-transparent lg:bg-indigo-800 text-black lg:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-lg transition-all duration-200 ease-in-out"
          />
        </div>

        {/* Place Dropdown */}
        <div className="flex items-center border border-indigo-700 rounded-lg overflow-hidden transition hover:border-indigo-500 focus-within:border-indigo-500 gap-2">
          <FaMapMarkerAlt className="text-indigo-400 ml-4" />
          <select
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="w-full p-3 bg-transparent sm:bg-transparent lg:bg-indigo-800 text-black lg:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-lg transition-all duration-200 ease-in-out"
          >
            <option>Indonesia</option>
            <option>Arab Saudi</option>
            <option>Belanda</option>
          </select>
        </div>

        {/* Time Dropdown */}
        <div className="flex items-center border border-indigo-700 rounded-lg overflow-hidden transition hover:border-indigo-500 focus-within:border-indigo-500 gap-2">
          <FaCalendarAlt className="text-indigo-400 ml-4" />
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 bg-transparent sm:bg-transparent lg:bg-indigo-800 text-black lg:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-lg transition-all duration-200 ease-in-out"
          >
            <option>Any date</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>Next Month</option>
          </select>
        </div>
      </div>
    </div>
  );
}
