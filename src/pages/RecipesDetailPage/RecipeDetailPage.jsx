import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import RecipeDetail from './RecipeDetails';

const RecipeDetailPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 py-16 px-4 md:px-12">
        <RecipeDetail />
      </main>
      <Footer />
    </div>
  );
};

export default RecipeDetailPage;