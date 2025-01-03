import React, { useState } from "react";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

import Img from "../../assets/background/loginBg.jpg";

const UserForm = () => {
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

  const [submittedData, setSubmittedData] = useState(""); // State to hold the displayed data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get the form data
    const { name, email, contact, age, height, weight, fruits, vegetables, allergies } = formData;

    // Display the submitted data
    const output = `
      <h3>Submitted Data:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Contact No.:</strong> ${contact}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Height (in m):</strong> ${height}</p>
      <p><strong>Weight (in kg):</strong> ${weight}</p>
      <p><strong>Preferred Fruits:</strong> ${fruits}</p>
      <p><strong>Preferred Vegetables:</strong> ${vegetables}</p>
      <p><strong>Allergies:</strong> ${allergies || "None"}</p>
    `;

    setSubmittedData(output); // Store the output to display below the form
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${Img})`,
        }}
      >
        <form
          onSubmit={handleSubmit}
          id="userForm"
          className="space-y-4 p-6 bg-white rounded-lg shadow-lg w-full max-w-xl"
        >
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </label>

          <label>
            Contact No.:
            <input
              type="tel"
              name="contact"
              pattern="[0-9]{10}"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </label>

          <label>
            Age:
            <input
              type="number"
              name="age"
              min="1"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </label>

          <label>
            Height (in m):
            <input
              type="number"
              name="height"
              step="0.01"
              min="0.5"
              value={formData.height}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </label>

          <label>
            Weight (in kg):
            <input
              type="number"
              name="weight"
              step="0.1"
              value={formData.weight}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </label>

          <label>
            Preferred Fruits:
            <input
              type="text"
              name="fruits"
              value={formData.fruits}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </label>

          <label>
            Preferred Vegetables:
            <input
              type="text"
              name="vegetables"
              value={formData.vegetables}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </label>

          <label>
            Allergies (if any):
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>

          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
            Submit
          </button>
        </form>

        {/* Display the submitted data below the form */}
        {submittedData && (
          <div id="output" className="mt-6 p-4 bg-white rounded shadow-lg w-full max-w-xl">
            <div dangerouslySetInnerHTML={{ __html: submittedData }} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserForm;
