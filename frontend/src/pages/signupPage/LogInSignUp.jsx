import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/background/loginBg.jpg";


const LogInSignUp = () => {
  const [action, setAction] = useState("Sign Up");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/user-form");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Sign-Up failed", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/home"); 
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div
      className="min-h-screen items-center justify-center bg-auto bg-center mt-[10px] flex"
      style={{ backgroundImage: `url(${Img})` }}
    >  

      <div className="flex flex-col  w-[500px] h-[500px] bg-white  p-8 rounded-lg shadow-lg backdrop-blur-md bg-opacity-90">
        <div className="flex flex-col items-center gap-2">
          <div className="text-4xl font-bold italic text-green-700">{action}</div>
          <div className="w-16 h-1 bg-green-700 rounded-full"></div>
        </div>

        <div className="flex w-full border-b border-gray-300 mt-8 mb-4">
          <button
            className={`w-1/2 text-center py-2 text-lg font-semibold ${
              action === "Sign Up" ? "border-b-4 border-green-700 text-green-700" : "text-gray-600"
            }`}
            onClick={() => setAction("Sign Up")}
          >
            Sign Up
          </button>
          <button
            className={`w-1/2 text-center py-2 text-lg font-semibold ${
              action === "Log In" ? "border-b-4 border-green-700 text-green-700" : "text-gray-600"
            }`}
            onClick={() => setAction("Log In")}
          >
            Log In
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-6">
          {action === "Log In" ? null : (
            <div className="flex items-center mx-auto w-[440px] bg-gray-200 rounded-lg px-4 py-3">
              <FontAwesomeIcon icon={faUser} className="text-gray-600 w-5 h-5 mr-4" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full bg-transparent outline-none border-none text-gray-700 placeholder-gray-500 text-sm"
              />
            </div>
          )}
          <div className="flex items-center mx-auto w-[440px] bg-gray-200 rounded-lg px-4 py-3">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-600 w-5 h-5 mr-4" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email ID"
              className="w-full bg-transparent outline-none border-none text-gray-700 placeholder-gray-500 text-sm"
            />
          </div>
          <div className="flex items-center mx-auto w-[440px] bg-gray-200 rounded-lg px-4 py-3">
            <FontAwesomeIcon icon={faLock} className="text-gray-600 w-5 h-5 mr-4" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-transparent outline-none border-none text-gray-700 placeholder-gray-500 text-sm"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          {action === "Sign Up" && (
            <button
              onClick={handleSignUp}
              className="w-56 h-14 rounded-full font-bold text-lg italic bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Next
            </button>
          )}
          {action === "Log In" && (
            <button
              onClick={handleLogin}
              className="w-56 h-14 rounded-full font-bold text-lg italic bg-green-700 text-white hover:bg-green-800 transition mt-10"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogInSignUp;
