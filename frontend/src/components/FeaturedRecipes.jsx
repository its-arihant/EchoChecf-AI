import React from 'react';

const FeaturedRecipes = () => {
  const recipes = [
    { title: 'Nettle Soup', image: '/assets/images/nettle-soup.jpg' },
    { title: 'Dandelion Salad', image: '/assets/images/dandelion-salad.jpg' },
    { title: 'Wild Berry Jam', image: '/assets/images/wild-berry-jam.jpg' },
  ];

  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-green-900 text-center mb-10">
        Foraged Ingredients. Endless Possibilities.
      </h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="bg-green-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                {recipe.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipes;