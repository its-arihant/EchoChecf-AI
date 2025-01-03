import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Recipes from './Recipes';

const RecipesPage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow'>
        <Recipes />
      </main>
      <Footer />
    </div>
  );
};

export default RecipesPage;
