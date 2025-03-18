import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Img from "../../assets/background/loginBg.jpg";

const UserForm = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    age: "",
    height: "",
    weight: "",
    fruits: "",
    vegetables: "",
    allergies: "",
  });

  const [submittedData, setSubmittedData] = useState(null); // Store submitted data

  // 🔹 Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 🔹 Function to handle signup
  const signupUser = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Store the token
        console.log("✅ Signup successful! Token saved.");
        navigate("/user-form"); // Redirect to form page
      } else {
        console.error("❌ Signup Error:", data.message);
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error);
    }
  };

  // 🔹 Function to handle user form submission (with token)
  const submitUserForm = async (formData) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("❌ No token found! Redirecting to login.");
      navigate("/login"); // Redirect to login if no token
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("✅ Form submitted successfully!");
        alert("User form saved successfully!");

        // Store submitted data and reset form
        setSubmittedData(formData);
        setFormData({
          name: "",
          email: "",
          contact: "",
          age: "",
          height: "",
          weight: "",
          fruits: "",
          vegetables: "",
          allergies: "",
        });

        navigate("/login"); // Move to login after form submission
      } else {
        console.error("❌ Form Submission Error:", data.message);
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error);
    }
  };

  // 🔹 Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitUserForm(formData);
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center bg-auto bg-center"
        style={{
          backgroundImage: `url(${Img})`,
        }}
      >
        <div className="flex flex-col mx-auto w-[600px] bg-white p-8 rounded-lg shadow-lg backdrop-blur-md bg-opacity-90 mt-8 mb-8">
          {/* Header */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl font-bold italic text-green-700">User Form</div>
            <div className="w-16 h-1 bg-green-700 rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
            {/* Inputs */}
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex items-center mx-auto w-[480px] bg-gray-200 rounded-lg px-4 py-3">
                <input
                  type={
                    key === "email"
                      ? "email"
                      : key === "contact"
                      ? "tel"
                      : key === "age" || key === "height" || key === "weight"
                      ? "number"
                      : "text"
                  }
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required={key !== "allergies"}
                  placeholder={key === "contact" ? "Contact No." : key.charAt(0).toUpperCase() + key.slice(1)}
                  className="w-full bg-transparent outline-none border-none text-gray-700 placeholder-gray-500 text-sm"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-56 h-14 rounded-full font-bold text-lg italic bg-blue-600 text-white hover:bg-blue-700 transition mt-8 ml-auto"
            >
              Submit
            </button>
          </form>

          {/* Display the submitted data below the form */}
          {submittedData && (
            <div className="mt-6 p-4 bg-white rounded shadow-lg w-full max-w-xl">
              <h3 className="text-lg font-bold">Submitted Data:</h3>
              {Object.entries(submittedData).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value || "None"}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserForm;


