import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCamera, faXmark } from '@fortawesome/free-solid-svg-icons';

const DialogBox = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!isOpen) return null;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white rounded-lg p-8 w-11/12 md:w-1/3 relative shadow-xl'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-5 right-5 text-gray-400 hover:text-gray-600'
        >
          <FontAwesomeIcon icon={faXmark} className='w-6 h-6' />
        </button>

        {/* Dialog Content */}
        <h2 className='text-2xl font-bold text-green-900 mb-8 text-center'>
          Identify the Plant
        </h2>
        <div className='flex flex-row gap-6 items-center justify-between mb-6'>
          {/* Upload Image Button */}
          <label className='flex-1 flex items-center justify-center w-40 h-40 bg-white border-2 border-transparent text-green-500 text-lg rounded-lg shadow-md hover:border-green-500 hover:text-green-700 hover:bg-green-50 transition cursor-pointer'>
            <input
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleImageUpload}
            />
            <FontAwesomeIcon icon={faUpload} className='mr-2' />
            Upload
          </label>

          {/* Take a Picture Button */}
          <button
            onClick={() => alert('Take Picture Clicked')}
            className='flex-1 flex items-center justify-center w-40 h-40 bg-white border-2 border-transparent text-green-500 text-lg rounded-lg shadow-md hover:border-green-500 hover:text-green-700 hover:bg-green-50 transition'
          >
            <FontAwesomeIcon icon={faCamera} className='mr-2' />
            Take a Pic
          </button>
        </div>

        {/* Image Preview */}
        {selectedImage && (
          <div className='mb-4 flex justify-center'>
            <img
              src={selectedImage}
              alt='Uploaded Preview'
              className='w-40 h-40 object-cover rounded-lg shadow-md'
            />
          </div>
        )}

        {/* Search Button */}
        <button
          onClick={() => alert('Search Clicked')}
          className='w-full bg-green-500 text-white text-lg px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition'
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default DialogBox;