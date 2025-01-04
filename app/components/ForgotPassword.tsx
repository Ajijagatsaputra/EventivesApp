import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

interface ForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleForgotPassword = () => {
    if (email) {
      setIsResetLinkSent(true); // Simulate successful API call
      toast.success("Link reset kata sandi telah dikirim ke email Anda.");
    } else {
      toast.error("Masukkan email yang terdaftar.");
    }
  };

  const handleChangePassword = () => {
    if (newPassword) {
      toast.success("Kata sandi berhasil diubah.");
      onClose();
    } else {
      toast.error("Masukkan kata sandi baru.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>

        {!isResetLinkSent ? (
          <>
            {/* Forgot Password View */}
            <h2 className="text-center text-2xl font-semibold">Forgot Password?</h2>
            <p className="text-center text-gray-500 mt-2">
              Please enter the email you use to sign in, or back to{" "}
              <span className="text-blue-500 cursor-pointer hover:underline" onClick={onClose}>Sign In</span>
            </p>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleForgotPassword}
              className="w-full py-3 mt-4 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none"
            >
              Request reset link
            </button>
          </>
        ) : (
          <>
            {/* Change Password View */}
            <h2 className="text-center text-2xl font-semibold">Change Password</h2>
            <p className="text-center text-gray-500 mt-2">
              Please enter a new password below to change your old password
            </p>
            <div className="mt-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-3 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
              </span>
            </div>
            <button
              onClick={handleChangePassword}
              className="w-full py-3 mt-4 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none"
            >
              Change password
            </button>
          </>
        )}

        {/* OR divider */}
        <div className="flex items-center justify-center my-6">
          <span className="h-px w-full bg-gray-300"></span>
          <span className="px-2 text-gray-500">OR</span>
          <span className="h-px w-full bg-gray-300"></span>
        </div>

        {/* Continue with Google button */}
        <button
          onClick={() => window.location.href = "https://beportal1-c69uolb8.b4a.run/auth/google"}
          className="w-full py-3 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100"
        >
          <img src="/assets/logo/logoGoogle.png" alt="Google Icon" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
