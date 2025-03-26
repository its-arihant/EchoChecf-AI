import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FilterDialogBox = ({ isOpen, onClose, onRecipeGenerated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ingredients: '',
    mealType: '',
    mealCategory: '',
    cuisine: '',
    dietType: '',
    chefMode: 'Beginner',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure ingredients are always sent as an array
    const requestData = {
      ingredients: formData.ingredients.split(',').map((ing) => ing.trim()),
      mealType: formData.mealType,
      mealCategory: formData.mealCategory,
      cuisine: formData.cuisine,
      dietType: formData.dietType,
      chefMode: formData.chefMode,
    };

    console.log("Sending request:", JSON.stringify(requestData));

    try {
      const response = await axios.post("http://localhost:5001/api/generate-recipe", requestData, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("Received response:", response.data);
      const recipe = response.data.recipe;
      
      // Use the onRecipeGenerated callback if provided, otherwise navigate
      if (onRecipeGenerated) {
        onRecipeGenerated(recipe);
      } else {
        navigate('/recipes', { state: { recipe } });
      }
    } catch (error) {
      console.error("Error generating recipe:", error.response ? error.response.data : error.message);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-[500px] relative'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'
        >
          <FontAwesomeIcon icon={faTimes} className='w-5 h-5' />
        </button>

        <h2 className='text-2xl font-bold text-green-700 text-center mb-4'>Filter Recipes</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Ingredients Input */}
          <div>
            <label className='block text-gray-700 font-medium'>What ingredients do you have?</label>
            <input
              type='text'
              name='ingredients'
              value={formData.ingredients}
              onChange={handleChange}
              placeholder='Type ingredients separated by commas'
              className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            />
          </div>

          {/* Meal Type */}
          <div>
            <label className='block text-gray-700 font-medium'>Select Meal Type:</label>
            <select
              name='mealType'
              value={formData.mealType}
              onChange={handleChange}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            >
              <option value=''>Select</option>
              <option value='Breakfast'>Breakfast</option>
              <option value='Lunch'>Lunch</option>
              <option value='Dinner'>Dinner</option>
            </select>
          </div>

          {/* Meal Category */}
          <div>
            <label className='block text-gray-700 font-medium'>Select Meal Category:</label>
            <select
              name='mealCategory'
              value={formData.mealCategory}
              onChange={handleChange}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            >
              <option value=''>Select</option>
              <option value='Appetizer'>Appetizer</option>
              <option value='Main Course'>Main Course</option>
              <option value='Dessert'>Dessert</option>
            </select>
          </div>

          {/* Cuisine Preference */}
          <div>
            <label className='block text-gray-700 font-medium'>Select Cuisine Preference:</label>
            <select
              name='cuisine'
              value={formData.cuisine}
              onChange={handleChange}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            >
              <option value=''>Select</option>
              <option value='Indian'>Indian</option>
              <option value='Italian'>Italian</option>
              <option value='Mexican'>Mexican</option>
              <option value='Chinese'>Chinese</option>
              <option value='American'>American</option>
            </select>
          </div>

          {/* Diet Type */}
          <div>
            <label className='block text-gray-700 font-medium'>Is it Vegetarian or Non-Vegetarian?</label>
            <select
              name='dietType'
              value={formData.dietType}
              onChange={handleChange}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            >
              <option value=''>Select</option>
              <option value='Vegetarian'>Vegetarian</option>
              <option value='Non-Vegetarian'>Non-Vegetarian</option>
            </select>
          </div>

          {/* Chef Mode */}
          <div>
            <label className='block text-gray-700 font-medium'>Select Your Chef Mode:</label>
            <select
              name='chefMode'
              value={formData.chefMode}
              onChange={handleChange}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            >
              <option value='Beginner'>Beginner</option>
              <option value='Intermediate'>Intermediate</option>
              <option value='Expert'>Expert</option>
            </select>
          </div>

          <div>
            <label className='block text-gray-700 font-medium'>Select Your Diet Type:</label>
            <select
              name='chefMode'
              value={formData.chefMode}
              onChange={handleChange}
              className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            >
              <option value=''>Select</option>
              <option value='diabetic'>Diabetic Diet (Least Sugar)</option>
              <option value='lowfat'>Low Fat</option>
              <option value='highcal'>High Calorie</option>
              <option value='highprotein'>High Protein</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700'
          >
            Generate Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default FilterDialogBox;