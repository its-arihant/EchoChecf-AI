import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipesData from '../../components/data/recipesData'; // Import the recipes dataset

const RecipeDetails = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const recipe = recipesData.find((r) => r.id === parseInt(id)); // Find the recipe by ID

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">Recipe Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition mb-6 flex items-center"
      >
        ← Back to Recipes
      </button>

      {/* Recipe Details Card */}
      <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-72 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>
          <div className="absolute bottom-4 left-6 text-white">
            <h1 className="text-4xl font-bold">{recipe.name}</h1>
            <p className="text-lg">{recipe.description}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          {/* Dietary Tags and Prep Time */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-green-600">
              {recipe.dietaryTags && recipe.dietaryTags.map((tag, index) => (
                <span key={index} className="bg-green-200 text-green-800 px-2 py-1 rounded-full mr-2">
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Prep Time: </strong>{recipe.prepTime}
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Ingredients
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-800 text-lg">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Instructions
            </h2>
            <p className="text-gray-800 text-lg leading-7">
              {recipe.instructions}
            </p>
          </div>

          {/* Nutritional Content */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Nutritional Content
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700">Calories</h3>
                <p className="text-2xl font-bold text-green-700">
                  {recipe.nutritionalContent.calories}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700">Protein</h3>
                <p className="text-2xl font-bold text-green-700">
                  {recipe.nutritionalContent.protein}g
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700">Carbs</h3>
                <p className="text-2xl font-bold text-green-700">
                  {recipe.nutritionalContent.carbs}g
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700">Fats</h3>
                <p className="text-2xl font-bold text-green-700">
                  {recipe.nutritionalContent.fats}g
                </p>
              </div>
            </div>
          </div>

          {/* Eco-Friendly Tips */}
          <div className="bg-green-50 p-6 mt-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Eco-Friendly Tips</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.ecoFriendlyTips && recipe.ecoFriendlyTips.map((tip, index) => (
                <li key={index} className="text-gray-800 text-lg">{tip}</li>
              ))}
            </ul>
          </div>

          {/* Sustainability Score */}
          <div className="bg-green-100 p-6 mt-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Sustainability Score</h2>
            <p className="text-lg text-gray-800">
              {recipe.sustainabilityScore}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;