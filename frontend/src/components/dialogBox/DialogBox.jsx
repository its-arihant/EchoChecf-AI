import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";

const DialogBox = ({ isOpen, onClose, onPredictionResult }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);

  if (!isOpen) return null;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handlePredict = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5001/api/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onPredictionResult(response.data);
      onClose();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to get prediction. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-8 w-11/12 md:w-1/3 relative shadow-2xl transform scale-100 transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 transition"
        >
          <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
        </button>

        {/* Dialog Title */}
        <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">
          Identify the Plant 🌿
        </h2>

        {/* Upload Image Button */}
        <label className="flex flex-col items-center justify-center w-44 h-44 mx-auto bg-green-50 border-2 border-dashed border-green-500 text-green-600 text-lg rounded-xl shadow-sm hover:border-green-700 hover:text-green-800 hover:bg-green-100 transition cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          <FontAwesomeIcon icon={faUpload} className="text-3xl mb-2" />
          <span className="text-sm font-medium">Upload Image</span>
        </label>

        {/* Image Preview */}
        {selectedImage && (
          <div className="mt-6 flex justify-center">
            <img
              src={selectedImage}
              alt="Uploaded Preview"
              className="w-44 h-44 object-cover rounded-lg shadow-md border border-gray-200"
            />
          </div>
        )}

        {/* Predict Button */}
        <button
          onClick={handlePredict}
          className="mt-6 w-full bg-green-600 text-white text-lg px-6 py-3 rounded-xl shadow-md hover:bg-green-700"
        >
          Predict
        </button>
      </div>
    </div>
  );
};

export default DialogBox;