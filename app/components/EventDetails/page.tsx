"use client";

import React from "react";
import { motion } from "framer-motion";

export default function EventDetails() {
  return (
    <motion.div
      className="flex flex-col md:flex-row w-full h-auto bg-gray-300 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="flex justify-center items-center md:w-1/2 bg-gray-300 md:bg-transparent">
        <motion.img
          src="/assets/events/image3.png"
          alt="Event Illustration"
          className="rounded-xl shadow-lg max-w-[90%] max-md:w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="text-lg font-bold md:w-1/2 px-5"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
      >
        <div className="flex flex-col justify-center items-start text-start h-full">
          <h1 className="mt-9 text-3xl md:text-4xl text-black">
            Make your own Event
          </h1>
          <p className="mt-4 text-neutral-800 text-base md:text-lg max-w-[80%] font-DMSans font-normal">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi laborum tempore incidunt cumque assumenda eaque! Quis dignissimos blanditiis nemo quaerat dolorem optio saepe delectus modi eligendi magnam, vel incidunt rerum.
          </p>
          <motion.button
            className="px-10 py-3 mt-5 text-center text-white bg-pink-600 rounded-full shadow-lg w-full sm:w-auto hover:bg-pink-700 transition-all duration-300"
            onClick={() => {}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Events
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
