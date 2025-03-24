// import React from 'react';
// // import {Row} from 'react-bootstrap'
// import Img from "../../assets/download2.jpeg";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const navigate = useNavigate();
//   return (
//     // <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-5">
//     //   <div className="py-4">
//     //     <h2 className="text-xl font-semibold text-gray-800">Card Title</h2>
//     //     <p className="text-gray-600 mt-2">
//     //       This is a simple card component styled with Tailwind CSS.
//     //     </p>
//     //   </div>
//     //   <div className="mt-4">
//     //     <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg">
//     //       Learn More
//     //     </button>
//     //   </div>
//     // </div>
      
//     <div classname = "bg-fill" style={{ backgroundImage: `url(${Img})` }}>
//       <div className="max-w-2xl  bg-white shadow-lg rounded-2xl p-6 mx-auto">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-8">Profile Details</h2>
//         <div className="space-y-5">
//           <div className="flex items-center justify-between border-b pb-2">
//           <span className="text-gray-600">Name:</span>
//           <span className="font-medium text-gray-800">abc</span>
//           </div>
//         <div className="flex items-center justify-between border-b pb-2">
//           <span className="text-gray-600">Email:</span>
//           <span className="font-medium text-gray-800">abc@gmail.com</span>
//         </div>
//         <div className="flex items-center justify-between border-b pb-2">
//           <span className="text-gray-600">Age:</span>
//           <span className="font-medium text-gray-800">21</span>
//         </div>
//         <div className="flex items-center justify-between border-b pb-2">
//           <span className="text-gray-600">Contact:</span>
//           <span className="font-medium text-gray-800">1234567890</span>
//         </div>
//         <div className="flex items-center justify-between border-b pb-2">
//           <span className="text-gray-600">Address:</span>
//           <span className="font-medium text-gray-800">Pune</span>
//         </div>
//         <div className="flex items-center justify-between border-b pb-2">
//           <span className="text-gray-600">Height:</span>
//           <span className="font-medium text-gray-800">160cm</span>
//         </div>
//         <div className="flex items-center justify-between border-b pb-2">
//           <span className="text-gray-600">Weight:</span>
//           <span className="font-medium text-gray-800">65kg</span>
//         </div>
//         <div className="flex items-center justify-between border-b pb-2">
//           <span className="text-gray-600">BMI:</span>
//           <span className="font-medium text-gray-800">23</span>
//         </div>
//         <div className="flex items-center justify-between border-b pb-2">
//           <span className="text-gray-600">Preferred Fruits</span>
//           <span className="font-medium text-gray-800">Banana</span>
//         </div>
//         <div className="flex items-center justify-between border-b pb-2">
//           <span className="text-gray-600">Preferred Vegetables:</span>
//           <span className="font-medium text-gray-800">Brocolli</span>
//         </div>
//         <div className="flex items-center justify-between border-b pb-2">
//           <span className="text-gray-600">Allergies:</span>
//           <span className="font-medium text-gray-800">None</span>
//         </div>

//         <button className="w-[19vw] bg-red-700 hover:bg-red-800 text-white ml-3 font-semibold py-2 rounded-2xl">
//            Logout
//         </button>
//         <button className="w-[19vw] bg-blue-700 hover:bg-blue-800 ml-3 text-white font-semibold py-2 rounded-2xl">
//            Update
//         </button>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Profile;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Img from "../../assets/download2.jpeg";

// const Profile = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/login"); // Redirect to login if no token
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:5001/api/user-form", {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setUserData(data);
//         } else {
//           console.error("Error fetching profile data:", data.message);
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   return (
//     <div className="bg-fill" style={{ backgroundImage: `url(${Img})` }}>
//       <div className="max-w-2xl bg-white shadow-lg rounded-2xl p-6 mx-auto">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-8">Profile Details</h2>
//         {userData ? (
//           <div className="space-y-5">
//             <ProfileField label="Name" value={userData.name} />
//             <ProfileField label="Email" value={userData.email} />
//             <ProfileField label="Age" value={userData.age} />
//             <ProfileField label="Contact" value={userData.contact} />
//             <ProfileField label="Height" value={`${userData.height} cm`} />
//             <ProfileField label="Weight" value={`${userData.weight} kg`} />
//             <ProfileField label="Preferred Fruits" value={userData.fruits} />
//             <ProfileField label="Preferred Vegetables" value={userData.vegetables} />
//             <ProfileField label="Allergies" value={userData.allergies} />
//             <button className="w-[19vw] bg-red-700 hover:bg-red-800 text-white ml-3 font-semibold py-2 rounded-2xl">
//               Logout
//             </button>
//             <button className="w-[19vw] bg-blue-700 hover:bg-blue-800 ml-3 text-white font-semibold py-2 rounded-2xl">
//               Update
//             </button>
//           </div>
//         ) : (
//           <p className="text-gray-600">Loading profile data...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// const ProfileField = ({ label, value }) => (
//   <div className="flex items-center justify-between border-b pb-2">
//     <span className="text-gray-600">{label}:</span>
//     <span className="font-medium text-gray-800">{value || "N/A"}</span>
//   </div>
// );


// export default Profile;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/download2.jpeg";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/api/user-form", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setUserData(data);
          setFormData(data);
        } else {
          console.error("Error fetching profile data:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5001/api/user-form", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setUserData(data);
        setEditMode(false);
      } else {
        console.error("Error updating profile:", data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="bg-fill" style={{ backgroundImage: `url(${Img})` }}>
      <div className="max-w-2xl bg-white shadow-lg rounded-2xl p-6 mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Profile Details</h2>
        {userData ? (
          <div className="space-y-5">
            {editMode ? (
              <>
                <ProfileField label="Name" name="name" value={formData.name} onChange={handleChange} editable />
                <ProfileField label="Email" name="email" value={formData.email} onChange={handleChange} editable />
                <ProfileField label="Age" name="age" value={formData.age} onChange={handleChange} editable />
                <ProfileField label="Contact" name="contact" value={formData.contact} onChange={handleChange} editable />
                <ProfileField label="Height" name="height" value={formData.height} onChange={handleChange} editable />
                <ProfileField label="Weight" name="weight" value={formData.weight} onChange={handleChange} editable />
                <ProfileField label="Preferred Fruits" name="fruits" value={formData.fruits} onChange={handleChange} editable />
                <ProfileField label="Preferred Vegetables" name="vegetables" value={formData.vegetables} onChange={handleChange} editable />
                <ProfileField label="Allergies" name="allergies" value={formData.allergies} onChange={handleChange} editable />
                <button onClick={handleUpdate} className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-2xl">
                  Save
                </button>
                <button onClick={() => setEditMode(false)} className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 rounded-2xl mt-2">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <ProfileField label="Name" value={userData.name} />
                <ProfileField label="Email" value={userData.email} />
                <ProfileField label="Age" value={userData.age} />
                <ProfileField label="Contact" value={userData.contact} />
                <ProfileField label="Height" value={`${userData.height} cm`} />
                <ProfileField label="Weight" value={`${userData.weight} kg`} />
                <ProfileField label="Preferred Fruits" value={userData.fruits} />
                <ProfileField label="Preferred Vegetables" value={userData.vegetables} />
                <ProfileField label="Allergies" value={userData.allergies} />
                <button
                  onClick={() => {
                    localStorage.removeItem("token"); // Clear token
                    navigate("/login"); // Redirect to Signup page
                  }}
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded-2xl mt-3">
                  Logout
                </button>

                <button onClick={() => setEditMode(true)} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-2xl mt-2">
                  Update
                </button>
              </>
            )}
          </div>
        ) : (
          <p className="text-gray-600">Loading profile data...</p>
        )}
      </div>
    </div>
  );
};

const ProfileField = ({ label, value, name, onChange, editable }) => (
  <div className="flex items-center justify-between border-b pb-2">
    <span className="text-gray-600">{label}:</span>
    {editable ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded p-1 text-gray-800"
      />
    ) : (
      <span className="font-medium text-gray-800">{value || "N/A"}</span>
    )}
  </div>
);

export default Profile;


