import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import LogInSignUp from './LogInSignUp';

const LoginSignupPage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow'>
        <LogInSignUp />
      </main>
      <Footer />
    </div>
  );
};

export default LoginSignupPage;
