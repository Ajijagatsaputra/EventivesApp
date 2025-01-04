"use client";
import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <header className="relative bg-gradient-to-r from-[#ED4690] to-[#5522CC] overflow-hidden">
      {/* Gambar latar belakang transparan */}
      <div className="absolute inset-0 opacity-30">
        <Image 
          src="/assets/logo/headerbg.png" 
          alt="Hero Background" 
          layout="fill" 
          objectFit="cover" 
          quality={100} 
          className="z-0"
        />
      </div>

      <div className="container relative z-10 px-6 py-16 mx-auto">
        <div className="lg:flex lg:flex-row-reverse items-center">
          {/* Teks dan Tombol */}
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-semibold text-white dark:text-white lg:text-4xl">
                SBS MTV The Kpop Show Ticket Package
              </h1>

              <p className="mt-3 text-white dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
                beatae error laborum ab amet sunt recusandae? Reiciendis natus
                perspiciatis optio.
              </p>

              <div className="mt-10">
                <button className="px-8 py-3 font-semibold text-white bg-pink-500 rounded-full hover:bg-pink-600 focus:outline-none">
                  Get Ticket
                </button>

                <button className="px-8 py-3 ml-4 font-semibold text-white border border-white rounded-full hover:bg-white hover:text-purple-600 focus:outline-none">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Gambar di sebelah kanan */}
          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <Image
              className="w-full h-auto lg:max-w-3xl"
              src="/assets/logo/bgHeader.png"
              alt="Background Hero"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
