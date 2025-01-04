import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignInSchema } from "@/lib/zod";
import { z } from "zod";
import ForgotPassword from "./ForgotPassword";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  openSignUp: () => void;
  onLoginSuccess: (profile: {
    email: string;
    avatarUrl: string;
    name: string;
    role: string;
  }) => void;
}

const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  openSignUp,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  if (!isOpen) return null;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    try {
      SignInSchema.parse({ email, password });
      setEmailError("");
      setPasswordError("");
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const emailIssue = error.issues.find((issue) => issue.path[0] === "email");
        const passwordIssue = error.issues.find((issue) => issue.path[0] === "password");

        setEmailError(emailIssue ? emailIssue.message : "");
        setPasswordError(passwordIssue ? passwordIssue.message : "");
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "https://eventives-ylkmb1ps.b4a.run/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      localStorage.setItem("userEmail", email);
      localStorage.setItem("userToken", res.data.token);

      const userProfile = {
        email,
        avatarUrl: "/assets/profile/profile.svg",
        name: "",
        role: "Visitor",
      };
      onLoginSuccess(userProfile);
      toast.success("Login successful!");

      setTimeout(() => onClose(), 2000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message;

        toast.error(
          errorMessage.includes("password")
            ? "Kata sandi tidak sesuai"
            : errorMessage.includes("email")
            ? "Email tidak sesuai"
            : "Login gagal. Silakan coba lagi."
        );
      } else {
        toast.error("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "https://beportal1-c69uolb8.b4a.run/auth/google";
  };

  const handleForgotPasswordClick = () => setIsForgotPasswordOpen(true);
  const handleForgotPasswordClose = () => setIsForgotPasswordOpen(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <ToastContainer />
      {isForgotPasswordOpen ? (
        <ForgotPassword isOpen={isForgotPasswordOpen} onClose={handleForgotPasswordClose} />
      ) : (
        <div className="bg-white p-6 rounded-lg w-full max-w-sm relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
          <h2 className="text-center text-2xl font-semibold">Sign in</h2>
          <p className="text-center text-gray-500 mt-2">
            Don’t have an account?{" "}
            <span
              onClick={openSignUp}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  emailError ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            <div className="mt-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  passwordError ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-3 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
              </span>
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <p
              onClick={handleForgotPasswordClick}
              className="text-right text-sm text-blue-500 hover:underline mt-2 cursor-pointer"
            >
              Forgot your password?
            </p>
            <button
              type="submit"
              className={`w-full py-3 mt-4 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign in"}
            </button>
          </form>
          <div className="flex items-center justify-center my-6">
            <span className="h-px w-full bg-gray-300"></span>
            <span className="px-2 text-gray-500">OR</span>
            <span className="h-px w-full bg-gray-300"></span>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100"
          >
            <img
              src="/assets/logo/logoGoogle.png"
              alt="Google Icon"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default SignInModal;
  