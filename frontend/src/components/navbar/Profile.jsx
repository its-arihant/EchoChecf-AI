import React from 'react';
// import {Row} from 'react-bootstrap'
import Img from "../../assets/download2.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    // <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-5">
    //   <div className="py-4">
    //     <h2 className="text-xl font-semibold text-gray-800">Card Title</h2>
    //     <p className="text-gray-600 mt-2">
    //       This is a simple card component styled with Tailwind CSS.
    //     </p>
    //   </div>
    //   <div className="mt-4">
    //     <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg">
    //       Learn More
    //     </button>
    //   </div>
    // </div>
      
    <div classname = "bg-fill" style={{ backgroundImage: `url(${Img})` }}>
      <div className="max-w-2xl  bg-white shadow-lg rounded-2xl p-6 mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Profile Details</h2>
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b pb-2">
          <span className="text-gray-600">Name:</span>
          <span className="font-medium text-gray-800">abc</span>
          </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-gray-600">Email:</span>
          <span className="font-medium text-gray-800">abc@gmail.com</span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-gray-600">Age:</span>
          <span className="font-medium text-gray-800">21</span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-gray-600">Contact:</span>
          <span className="font-medium text-gray-800">1234567890</span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-gray-600">Address:</span>
          <span className="font-medium text-gray-800">Pune</span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-gray-600">Height:</span>
          <span className="font-medium text-gray-800">160cm</span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-gray-600">Weight:</span>
          <span className="font-medium text-gray-800">65kg</span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-gray-600">BMI:</span>
          <span className="font-medium text-gray-800">23</span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-gray-600">Preferred Fruits</span>
          <span className="font-medium text-gray-800">Banana</span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-gray-600">Preferred Vegetables:</span>
          <span className="font-medium text-gray-800">Brocolli</span>
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-gray-600">Allergies:</span>
          <span className="font-medium text-gray-800">None</span>
        </div>

        <button className="w-[19vw] bg-red-700 hover:bg-red-800 text-white ml-3 font-semibold py-2 rounded-2xl">
           Logout
        </button>
        <button className="w-[19vw] bg-blue-700 hover:bg-blue-800 ml-3 text-white font-semibold py-2 rounded-2xl">
           Update
        </button>
      </div>
    </div>
    </div>
  );
};

export default Profile;
