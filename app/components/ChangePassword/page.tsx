"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Mengimpor ikon untuk toggle visibility

const ChangePassword = () => {
  const router = useRouter(); 
  const [passwordVisible, setPasswordVisible] = useState(false); 

  // Fungsi untuk menangani form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault(); 
    router.push("/components/SignIn"); 
  };

  // Fungsi untuk toggle visibilitas password
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex justify-end">
          <button
            aria-label="Close"
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Change Password
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
        Please enter a new password below to change your old password{" "}
          <a href="/components/SignIn" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
        {/* Tambahkan event onSubmit ke form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"} // Ubah tipe input berdasarkan state passwordVisible
              id="password"
              placeholder="Create your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {/* Tombol untuk toggle visibilitas password */}
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="text-sm text-center text-gray-600 mb-6">Use 8 or more characters with a mix of letters, numbers & symbols</p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Change password
          </button>
        </form>
        <div className="my-4 flex items-center justify-center">
          <span className="border-t border-gray-300 w-1/4"></span>
          <span className="text-sm text-gray-500 mx-4">OR</span>
          <span className="border-t border-gray-300 w-1/4"></span>
        </div>
        <button
          type="button"
          className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition duration-300"
        >
          <img
            src="/assets/logo/logoGoogle.png"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
