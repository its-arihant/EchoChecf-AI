import React from 'react';
import LogInSignUp from './LogInSignUp';

const LoginSignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-green-600">
      {/* Header */}
      <header className="h-[70px] flex items-center justify-center text-white text-5xl font-bold">
        EcoChef<span className="text-yellow-300">AI</span>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <LogInSignUp />
      </main>
    </div>
  );
};

export default LoginSignupPage;