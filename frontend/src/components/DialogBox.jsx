// components/DialogBox/DialogBox.js
import React from 'react';

const DialogBox = ({ isOpen, onClose, recipe }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 max-w-lg w-full rounded-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-green-800 mb-4">{recipe.name}</h2>
        <p className="text-gray-700 mb-4">{recipe.description}</p>
        <h3 className="text-xl font-semibold text-green-700 mb-2">Ingredients:</h3>
        <ul className="list-disc pl-6 mb-4">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-600">{ingredient}</li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold text-green-700 mb-2">Instructions:</h3>
        <p className="text-gray-600">{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default DialogBox;