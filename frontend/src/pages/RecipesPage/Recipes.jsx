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
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
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

  const handleRecipeGenerated = (recipe) => {
    setGeneratedRecipe(recipe);
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

      {/* Upload Picture & Filter Recipes Buttons */}
      <div className='flex flex-wrap justify-center items-center gap-4 w-full md:w-4/5 mx-auto mb-12'>
        <button
          onClick={handleOpenDialog}
          className='flex items-center justify-center bg-yellow-300 text-green-800 rounded-lg px-6 py-3 shadow-md hover:bg-yellow-400 transition'
        >
          <FontAwesomeIcon icon={faCameraRetro} className='w-5 h-5 mr-2' />
          Upload a Picture
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

      {/* Generated Recipe */}
      {generatedRecipe && (
        <div className='bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl mx-auto mt-6'>
          <div className='p-6 border-b'>
            <h1 className='text-3xl font-bold text-green-700'>
              {generatedRecipe.name || 'Your Custom Recipe'}
            </h1>
            {generatedRecipe.description && (
              <p className='text-gray-600 mt-2'>
                {generatedRecipe.description}
              </p>
            )}
            <div className='flex flex-wrap gap-2 mt-4'>
              {generatedRecipe.cuisine && (
                <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>
                  {generatedRecipe.cuisine} Cuisine
                </span>
              )}
              {generatedRecipe.mealType && (
                <span className='bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm'>
                  {generatedRecipe.mealType}
                </span>
              )}
              {generatedRecipe.dietType && (
                <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm'>
                  {generatedRecipe.dietType}
                </span>
              )}
              {generatedRecipe.difficulty && (
                <span className='bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm'>
                  {generatedRecipe.difficulty}
                </span>
              )}
            </div>
          </div>

          {/* Nutritional Info */}
          {generatedRecipe.nutritionalContent && (
            <div className='bg-green-50 p-6 rounded-lg'>
              <h2 className='text-2xl font-semibold text-green-600 mb-4'>
                Nutritional Information
              </h2>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {Object.entries(generatedRecipe.nutritionalContent).map(
                  ([key, value]) => (
                    <div key={key} className='bg-white p-3 rounded shadow-sm'>
                      <h3 className='font-medium text-gray-700 capitalize'>
                        {key}
                      </h3>
                      <p className='text-lg font-semibold text-green-700'>
                        {value}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <div className='p-6'>
            {/* Display raw content if JSON parsing failed */}
            {generatedRecipe.rawContent ? (
              <div className='space-y-6'>
                <h2 className='text-2xl font-semibold text-green-600'>
                  Generated Recipe
                </h2>
                <div className='bg-gray-50 p-4 rounded whitespace-pre-wrap'>
                  {generatedRecipe.rawContent}
                </div>
              </div>
            ) : (
              <div className='space-y-8'>
                {/* Ingredients */}
                <div>
                  <h2 className='text-2xl font-semibold text-green-600 mb-4'>
                    Ingredients
                  </h2>
                  <ul className='list-disc list-inside space-y-2 pl-4'>
                    {generatedRecipe.ingredients?.map((item, index) => (
                      <li key={index} className='text-gray-800'>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                {generatedRecipe.instructions && (
                  <div>
                    <h2 className='text-2xl font-semibold text-green-600 mb-4'>
                      Instructions
                    </h2>
                    <div className='space-y-3'>
                      {generatedRecipe.instructions
                        .split(/\d+\./) // Split by number followed by dot
                        .filter((step) => step.trim()) // Remove empty steps
                        .map((step, index) => (
                          <div key={index} className='flex'>
                            <span className='font-bold text-green-700 mr-2'>
                              {index + 1}.
                            </span>
                            <p className='text-gray-800'>{step.trim()}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Time Information */}
                {(generatedRecipe.prepTime ||
                  generatedRecipe.cookTime ||
                  generatedRecipe.totalTime) && (
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded'>
                    {generatedRecipe.prepTime && (
                      <div>
                        <h3 className='font-medium text-gray-700'>Prep Time</h3>
                        <p>{generatedRecipe.prepTime}</p>
                      </div>
                    )}
                    {generatedRecipe.cookTime && (
                      <div>
                        <h3 className='font-medium text-gray-700'>Cook Time</h3>
                        <p>{generatedRecipe.cookTime}</p>
                      </div>
                    )}
                    {generatedRecipe.totalTime && (
                      <div>
                        <h3 className='font-medium text-gray-700'>
                          Total Time
                        </h3>
                        <p>{generatedRecipe.totalTime}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
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
        onRecipeGenerated={handleRecipeGenerated}
      />
    </div>
  );
};

export default Recipes;
