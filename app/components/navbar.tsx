"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";


interface UserProfile {
  avatarUrl: string;
  name: string;
  role: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    avatarUrl: "",
    name: "",
    role: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    // Simulate data fetching delay
    setTimeout(() => setIsLoading(false), 2000);

    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserProfile = localStorage.getItem("userProfile");

    if (storedIsLoggedIn && storedUserProfile) {
      setIsLoggedIn(true);
      setUserProfile(JSON.parse(storedUserProfile));
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openSignInModal = () => {
    setShowSignInModal(true);
    setShowSignUpModal(false);
    setIsOpen(false);
  };

  const openSignUpModal = () => {
    setShowSignUpModal(true);
    setShowSignInModal(false);
    setIsOpen(false);
  };

  const closeModal = () => {
    setShowSignInModal(false);
    setShowSignUpModal(false);
  };

  const handleLoginSuccess = (profile: UserProfile) => {
    setIsLoggedIn(true);
    setUserProfile(profile);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userProfile", JSON.stringify(profile));
    closeModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile({ avatarUrl: "", name: "", role: "" });
    setIsDropdownOpen(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userProfile");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const skeletonClass = "bg-gray-300 animate-pulse rounded-md";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-[#0E0B43] shadow-lg backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="relative w-full h-20">
          <div className="container px-6 py-4 mx-auto relative z-10">
            <div className="lg:flex lg:items-center lg:justify-between">
              {/* Logo */}
              <div className="flex items-center justify-between">
                {isLoading ? (
                  <div className={`w-24 h-8 ${skeletonClass}`} />
                ) : (
                  <a href="/" className="flex items-center">
                    <Image
                      className="w-auto h-6 sm:h-7"
                      src="/assets/logo/logoEventives.png"
                      alt="Logo"
                      width={100}
                      height={40}
                    />
                  </a>
                )}
                <div className="flex lg:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="text-white hover:text-gray-400 focus:outline-none"
                    aria-label="toggle menu"
                  >
                    {isOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 8h16M4 16h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Menu */}
              <div
                className={`${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-indigo-900 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:translate-x-0 lg:flex lg:items-center`}
              >
                <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                  {isLoading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className={`w-20 h-6 mx-3 mt-2 ${skeletonClass}`} />
                      ))
                    : ["Schedule", "Speakers", "Ticket", "Sponsors"].map(
                        (item) => (
                          <a
                            key={item}
                            href="/"
                            className="px-3 py-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-300"
                          >
                            {item}
                          </a>
                        )
                      )}
                </div>

                {/* Sign In Button or Profile */}
                <div className="flex items-center justify-between">
                  {isLoading ? (
                    <div className={`w-24 h-8 mx-4 ${skeletonClass}`} />
                  ) : isLoggedIn ? (
                    <div ref={dropdownRef} className="relative flex items-center space-x-2">
                      <img
                        src={userProfile.avatarUrl}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                        onClick={toggleDropdown}
                      />
                      <span className="ml-2 text-white">
                        {userProfile.name} ({userProfile.role})
                      </span>
                      {isDropdownOpen && (
                        <div className="absolute top-full mt-2 w-48 bg-[#1B2430] text-white shadow-lg rounded-md overflow-hidden">
                          <ul className="py-2">
                            <li className="px-4 py-2 hover:bg-[#313E4E] cursor-pointer">
                              View Profile
                            </li>
                            <li className="px-4 py-2 hover:bg-[#313E4E] cursor-pointer">
                              Settings
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-[#313E4E] cursor-pointer rounded-b-md"
                              onClick={handleLogout}
                            >
                              Sign Out
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={openSignInModal}
                      className="mx-4 py-2 px-6 text-white bg-transparent border border-white rounded-full transition-colors duration-300 transform hover:bg-gray-300 hover:text-white focus:outline-none"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      {showSignInModal && (
        <SignInModal
          isOpen={showSignInModal}
          onClose={closeModal}
          openSignUp={openSignUpModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {showSignUpModal && (
        <SignUpModal
          isOpen={showSignUpModal}
          onClose={closeModal}
          openSignIn={openSignInModal}
        />
      )}
    </>
  );
};

export default Navbar;
