import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Img from '../../assets/download2.jpeg';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5001/api/user-form', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setUserData(data);
          setFormData(data);
        } else {
          console.error('Error fetching profile data:', data.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5001/api/user-form', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setUserData(data);
        setEditMode(false);
      } else {
        console.error('Error updating profile:', data.message);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const calculateBMI = () => {
    const heightInMeters = formData.height / 100;
    if (formData.height && formData.weight) {
      return (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return 'N/A';
  };

  const getBodyType = (bmi) => {
    if (bmi < 18.5) return { type: 'Underweight', color: 'text-blue-600' };
    if (bmi >= 18.5 && bmi < 25)
      return { type: 'Normal', color: 'text-green-600' };
    if (bmi >= 25 && bmi < 30)
      return { type: 'Overweight', color: 'text-yellow-600' };
    return { type: 'Obese', color: 'text-red-600' };
  };

  const bmiValue = calculateBMI();
  const { type, color } = getBodyType(bmiValue);

  return (
    <div
      className='bg-fill min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10'
      style={{ backgroundImage: `url(${Img})` }}
    >
      <div className='max-w-3xl bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full'>
        {/* Profile Icon */}
        <div className='flex justify-center mb-4'>
          <FontAwesomeIcon
            icon={faUserCircle}
            className='text-gray-700 text-6xl'
          />
        </div>

        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6'>
          Profile Details
        </h2>

        {userData ? (
          <div className='space-y-4'>
            {editMode ? (
              <>
                {profileFields.map((field) => (
                  <ProfileField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    editable
                  />
                ))}

                {/* BMI Display */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-3'>
                  <span className='text-gray-600 font-medium'>BMI:</span>
                  <span className={`font-bold ${color}`}>
                    {bmiValue} ({type})
                  </span>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 mt-6'>
                  <button
                    onClick={handleUpdate}
                    className='w-full sm:w-1/2 bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-2xl'
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className='w-full sm:w-1/2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 rounded-2xl'
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {profileFields.map((field) => (
                  <ProfileField
                    key={field.name}
                    label={field.label}
                    value={userData[field.name]}
                  />
                ))}

                {/* BMI Display */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-3'>
                  <span className='text-gray-600 font-medium'>BMI:</span>
                  <span className={`font-bold ${color}`}>
                    {bmiValue} ({type})
                  </span>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 mt-6'>
                  <button
                    onClick={() => setEditMode(true)}
                    className='w-full sm:w-1/2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-2xl'
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem('token');
                      navigate('/');
                    }}
                    className='w-full sm:w-1/2 bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded-2xl'
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className='text-gray-600 text-center'>Loading profile data...</p>
        )}
      </div>
    </div>
  );
};

const ProfileField = ({ label, value, name, onChange, editable }) => (
  <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-3'>
    <span className='text-gray-600 font-medium'>{label}:</span>
    {editable ? (
      <input
        type='text'
        name={name}
        value={value}
        onChange={onChange}
        className='border rounded-lg px-3 py-2 w-full sm:w-2/3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
      />
    ) : (
      <span className='font-medium text-gray-800'>{value || 'N/A'}</span>
    )}
  </div>
);

const profileFields = [
  { name: 'name', label: 'Name' },
  { name: 'email', label: 'Email' },
  { name: 'age', label: 'Age' },
  { name: 'contact', label: 'Contact' },
  { name: 'height', label: 'Height (cm)' },
  { name: 'weight', label: 'Weight (kg)' },
  { name: 'fruits', label: 'Preferred Fruits' },
  { name: 'vegetables', label: 'Preferred Vegetables' },
  { name: 'allergies', label: 'Allergies' },
];

export default Profile;
