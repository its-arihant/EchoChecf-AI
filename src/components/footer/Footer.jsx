import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-8 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-base mb-4">
          © 2024 EcoChefAI. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6">
          <Link
            to="https://instagram.com"
            className="text-white hover:text-yellow-300 transition"
          >
            Instagram
          </Link>
          <Link
            to="https://twitter.com"
            className="text-white hover:text-yellow-300 transition"
          >
            Twitter
          </Link>
          <Link
            to="https://facebook.com"
            className="text-white hover:text-yellow-300 transition"
          >
            Facebook
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;