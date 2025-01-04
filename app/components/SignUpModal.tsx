import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  openSignIn: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  isOpen,
  onClose,
  openSignIn,
}) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [userName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://eventives-ylkmb1ps.b4a.run/Users",
        {
          email: email,
          userName: userName,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Sign up successful!");
        position: "top-center";
        setTimeout(() => {
          openSignIn();
        }, 2000);
      } else {
        throw new Error("Failed to sign up");
      }
    } catch (error) {
      console.error("API error:", error);
      setApiError("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address");
        return;
      } else {
        setEmailError("");
        handleNext();
      }
    }

    if (step === 2) {
      handleNext();
    }

    if (step === 3) {
      if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters");
      } else {
        setPasswordError("");
        handleSignUp();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>

        <h2 className="text-center font-semibold mb-4 justify-center">
          Sign up for free
        </h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          Already have an account?{" "}
          <button
            onClick={openSignIn}
            className="text-blue-500 hover:underline"
          >
            Log in
          </button>
        </p>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                required
              />
              {emailError && (
                <p className="text-red-500 text-xs mb-4">{emailError}</p>
              )}
              <button
                type="submit"
                className={`w-full py-3 rounded-full text-white transition-colors ${
                  email ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"
                }`}
                disabled={!email}
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter your full name"
                value={userName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                required
              />
              <button
                type="submit"
                className={`w-full py-3 rounded-full text-white transition-colors ${
                  userName ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"
                }`}
                disabled={!userName}
              >
                Continue
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                  required
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-3 text-gray-500 cursor-pointer"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </span>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mb-2">{passwordError}</p>
              )}
              <p className="text-xs text-gray-500 mb-4">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </p>
              <button
                type="submit"
                className={`w-full py-3 rounded-full text-white transition-colors ${
                  password ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"
                }`}
                disabled={!password || loading}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </>
          )}
        </form>

        {apiError && (
          <div className="mt-4 text-red-500 text-center">{apiError}</div>
        )}

        <ToastContainer position="top-center" autoClose={3000} />

        <div className="relative my-6">
          <div className="flex items-center justify-center my-6">
            <span className="h-px w-full bg-gray-300"></span>
            <span className="px-2 text-gray-500">OR</span>
            <span className="h-px w-full bg-gray-300"></span>
          </div>
        </div>

        <button className="w-full border border-gray-300 rounded-full flex items-center justify-center py-3 mb-2 hover:bg-gray-100 transition-colors">
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google Logo"
            className="mr-2"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignUpModal;
