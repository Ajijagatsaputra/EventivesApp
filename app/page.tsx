"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "./components/Hero/page";
import SearchFilter from "./components/SearchFilter/page";
import UpcomingEvent from "./components/UpcomingEvent/page";
import EventDetails from "./components/EventDetails/page";
import BrandSection from "./components/BrandSection/page";
import BlogDetails from "./components/Blog/page";
import Footer from "./components/Footer/page";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "ease-in-out",
      once: true,
      mirror: true,
    });

    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const Skeleton = () => (
    <div className="animate-pulse bg-gray-200 rounded-md h-40 w-full mb-5"></div>
  );

  return (
    <>
      {/* Hero Section with Zoom-In Effect */}
      <div data-aos="zoom-in" data-aos-delay="100">
        {loading ? <Skeleton /> : <Hero />}
      </div>

      {/* Search Filter Section with Slide-Left Effect */}
      <div data-aos="slide-left" data-aos-delay="200" className="mt-5">
        {loading ? <Skeleton /> : <SearchFilter />}
      </div>

      {/* Upcoming Event Section with Fade-Right Effect */}
      <div data-aos="fade-right" data-aos-delay="300">
        {loading ? <Skeleton /> : <UpcomingEvent />}
      </div>

      {/* Event Details Section with Flip-Up Effect */}
      <div data-aos="flip-up" data-aos-delay="400">
        {loading ? <Skeleton /> : <EventDetails />}
      </div>

      {/* Brand Section with Zoom-In-Up Effect */}
      <div data-aos="zoom-in-up" data-aos-delay="500">
        {loading ? <Skeleton /> : <BrandSection />}
      </div>

      {/* Blog Section with Slide-Right Effect */}
      <div data-aos="slide-right" data-aos-delay="600">
        {loading ? <Skeleton /> : <BlogDetails />}
      </div>

      {/* Footer Section with Fade-In Effect */}
      <div data-aos="fade-in" data-aos-delay="700">
        {loading ? <Skeleton /> : <Footer />}
      </div>

      {/* Hover Animation and Transition Effects */}
      <style jsx>{`
        div[data-aos]:hover {
          transform: scale(1.03);
          transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
      `}</style>
    </>
  );
}
