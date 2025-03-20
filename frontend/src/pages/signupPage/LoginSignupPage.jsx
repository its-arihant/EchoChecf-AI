import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import LogInSignUp from './LogInSignUp';

const LoginSignupPage = () => {
  return (
    <header className="bg-green-600 h-[70px]">
      <div className="container font-bold text-white  text-3xl font-bold flex items-center justify-center p-[10px]">
        EcoChef<span className="items-center text-yellow-300">AI</span>
      </div>
      
    <div className='flex flex-col min-h-screen'>
      {/* <Navbar /> */}
      <main className='flex-grow'>
        <LogInSignUp />
      </main>
      <Footer />
    </div>
    </header>
  );
};

export default LoginSignupPage;
