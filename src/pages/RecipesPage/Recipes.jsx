import React, { useState } from 'react';
import DialogBox from '../../components/dialogBox/DialogBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faSearch } from '@fortawesome/free-solid-svg-icons';
import recipes from '../../components/data/recipesData';

const Recipes = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  // Handle opening and closing of the dialog box
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Handle search functionality
  const handleSearch = () => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 py-16 px-4 md:px-12">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-12">
        Explore Our Recipes
      </h1>

      {/* Search and Upload Section in One Row */}
      <div className="flex flex-col items-center justify-center gap-6 w-full md:w-4/5 mx-auto mb-12">
        {/* Flexbox for Search Section and Upload Button */}
        <div className="flex items-center justify-between gap-6 w-full md:w-full mx-auto">
          {/* Upload or Take a Picture Button */}
          <button
            onClick={handleOpenDialog}
            className="flex items-center justify-center bg-yellow-300 text-green-800 rounded-lg px-8 py-4 shadow-md hover:bg-yellow-400 transition w-full sm:w-2/5"
          >
            <FontAwesomeIcon icon={faCameraRetro} className="w-6 h-6 mr-3" />
            <span className="hidden sm:block">Upload/Take a Picture</span>
          </button>

          <div className="text-lg text-gray-600 font-semibold hidden sm:block">OR</div>

          {/* Search Section */}
          <div className="flex items-center w-full sm:w-2/5 bg-white border border-green-600 rounded-lg shadow-md px-4 py-3">
            <div className="flex items-center w-full">
              <FontAwesomeIcon
                icon={faSearch}
                className="w-4 h-4 text-gray-400 mr-3"
              />
              <input
                type="text"
                placeholder="Search by Recipe Name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-grow outline-none rounded-l-md py-1 text-gray-700" //px-1 py-1
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-8 py-4 rounded-md shadow-md hover:bg-green-700 transition w-auto sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 flex-grow">
        {filteredRecipes.length === 0 ? (
          <p className="text-center text-lg text-gray-700 col-span-full">
            No recipes found, try a different search.
          </p>
        ) : (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-transform transform hover:-translate-y-2"
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                {recipe.name}
              </h2>
              <p className="text-gray-700 mb-4">{recipe.description}</p>
              <button className=" bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                View Recipe
              </button>
            </div>
          ))
        )}
      </div>

      {/* Dialog Box */}
      <DialogBox isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </div>
  );
};

export default Recipes;