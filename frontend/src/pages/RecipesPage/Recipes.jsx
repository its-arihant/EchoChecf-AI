import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DialogBox from '../../components/dialogBox/DialogBox';
import FilterDialogBox from '../../components/dialogBox/FilterDialogBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faFilter } from '@fortawesome/free-solid-svg-icons';

const Recipes = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleOpenFilterDialog = () => {
    setIsFilterDialogOpen(true);
  };

  const handleCloseFilterDialog = () => {
    setIsFilterDialogOpen(false);
  };

  const handlePredictionResult = (data) => {
    setPredictionData(data);
    setUploadedImage(data.image);
  };

  return (
    <div className='flex flex-col min-h-screen bg-gray-100 py-16 px-4 md:px-12'>
      <div className='container mx-auto text-center mb-16'>
        <h2 className='text-5xl font-bold text-green-900 mb-6'>
          Find Your Next Favorite Dish
        </h2>
        <p className='text-lg text-green-700 max-w-3xl mx-auto leading-relaxed'>
          Have ingredients but don't know what to cook? Let{' '}
          <span className='font-bold text-green-800'>EcoChefAI</span> transform
          what you have into something delicious. Explore, cook, and enjoy!
        </p>
      </div>

      {/* Upload/Take Picture & Filter Recipes Buttons */}
      <div className='flex flex-wrap justify-center items-center gap-4 w-full md:w-4/5 mx-auto mb-12'>
        <button
          onClick={handleOpenDialog}
          className='flex items-center justify-center bg-yellow-300 text-green-800 rounded-lg px-6 py-3 shadow-md hover:bg-yellow-400 transition'
        >
          <FontAwesomeIcon icon={faCameraRetro} className='w-5 h-5 mr-2' />
          Upload/Take a Picture
        </button>

        <span className='text-gray-600 font-semibold text-lg'>or</span>

        <button
          onClick={handleOpenFilterDialog}
          className='flex items-center justify-center bg-blue-500 text-white rounded-lg px-6 py-3 shadow-md hover:bg-blue-600 transition'
        >
          <FontAwesomeIcon icon={faFilter} className='w-5 h-5 mr-2' />
          Filter Recipes
        </button>
      </div>

      {/* Prediction Results */}
      {predictionData && (
        <div className='bg-white shadow-md p-6 rounded-lg mb-6 w-full mx-auto'>
          <h2 className='text-2xl font-bold text-green-700 text-center mb-4'>
            Prediction Results
          </h2>

          {/* Image Preview */}
          {uploadedImage && (
            <div className='flex justify-center mb-4'>
              <img
                src={uploadedImage}
                alt='Uploaded Preview'
                className='w-48 h-48 object-cover rounded-lg shadow-md'
              />
            </div>
          )}

          {/* Predicted Ingredient */}
          <div className='text-center mb-4'>
            <h3 className='text-xl font-semibold text-gray-700'>
              {predictionData.prediction}
            </h3>
            <p className='text-gray-500 italic'>
              {predictionData.scientific_name}
            </p>
          </div>

          {/* Category */}
          <p className='text-lg font-semibold text-green-600 text-center mb-2'>
            Category:{' '}
            <span className='font-normal text-gray-700'>
              {predictionData.category}
            </span>
          </p>

          {/* Nutritional Values */}
          <div className='mb-4'>
            <h3 className='text-lg font-semibold text-green-700 mb-2'>
              Nutritional Values:
            </h3>
            <ul className='grid grid-cols-2 gap-2 text-gray-600'>
              {Object.entries(predictionData.nutritional_values).map(
                ([key, value]) => (
                  <li
                    key={key}
                    className='bg-gray-100 p-2 rounded-md shadow-sm'
                  >
                    <strong className='text-green-800'>{key}:</strong> {value}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Description */}
          <p className='text-gray-700 mt-4 text-justify'>
            <strong className='text-green-700'>Info:</strong>{' '}
            {predictionData.description}
          </p>
        </div>
      )}

      {/* Dialogs */}
      <DialogBox
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onPredictionResult={handlePredictionResult}
      />
      <FilterDialogBox
        isOpen={isFilterDialogOpen}
        onClose={handleCloseFilterDialog}
      />
    </div>
  );
};

export default Recipes;
