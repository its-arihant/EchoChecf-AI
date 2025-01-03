import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // For navigation
import Img from "../../assets/background/loginBg.jpg";

const LogInSignUp = () => {
  const [action, setAction] = useState("Sign Up");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = () => {
    // Redirect to the user form page after submission
    navigate("/user-form");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-auto bg-center"
      style={{
        backgroundImage: `url(${Img})`,
      }}
    >
      <div className="flex flex-col mx-auto w-[600px] bg-white p-8 rounded-lg shadow-lg backdrop-blur-md bg-opacity-90">
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-4xl font-bold italic text-green-700">{action}</div>
          <div className="w-16 h-1 bg-green-700 rounded-full"></div>
        </div>

        {/* Inputs */}
        <div className="mt-14 flex flex-col gap-6">
          {action === "Login" ? null : (
            <div className="flex items-center mx-auto w-[480px] bg-gray-200 rounded-lg px-4 py-3">
              <FontAwesomeIcon icon={faUser} className="text-gray-600 w-5 h-5 mr-4" />
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-transparent outline-none border-none text-gray-700 placeholder-gray-500 text-sm"
              />
            </div>
          )}
          <div className="flex items-center mx-auto w-[480px] bg-gray-200 rounded-lg px-4 py-3">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-600 w-5 h-5 mr-4" />
            <input
              type="email"
              placeholder="Email ID"
              className="w-full bg-transparent outline-none border-none text-gray-700 placeholder-gray-500 text-sm"
            />
          </div>
          <div className="flex items-center mx-auto w-[480px] bg-gray-200 rounded-lg px-4 py-3">
            <FontAwesomeIcon icon={faLock} className="text-gray-600 w-5 h-5 mr-4" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent outline-none border-none text-gray-700 placeholder-gray-500 text-sm"
            />
          </div>

          {action === "Sign Up" ? null : (
            <div className="pl-16 mt-4 text-sm text-gray-500">
              Forgot Password?{" "}
              <span className="text-blue-600 cursor-pointer">Click Here!</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-6 mx-auto mt-14">
          <button
            className={`flex items-center justify-center w-56 h-14 rounded-full font-bold text-lg italic ${
              action === "Login"
                ? "bg-gray-300 text-gray-600"
                : "bg-green-700 text-white hover:bg-green-800 transition"
            }`}
            onClick={() => setAction("Sign Up")}
          >
            Sign Up
          </button>
          <button
            className={`flex items-center justify-center w-56 h-14 rounded-full font-bold text-lg italic ${
              action === "Sign Up"
                ? "bg-gray-300 text-gray-600"
                : "bg-green-700 text-white hover:bg-green-800 transition"
            }`}
            onClick={() => setAction("Login")}
          >
            Login
          </button>
        </div>

        {/* Submit Button */}
        {action === "Sign Up" && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleSubmit}
              className="w-56 h-14 rounded-full font-bold text-lg italic bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogInSignUp;
