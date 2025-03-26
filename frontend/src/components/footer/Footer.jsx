import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        
        {/* Left Side - Logo & Navigation */}
        <div className="text-center md:text-left">
          {/* Logo */}
          <div to="/" className="text-3xl font-bold tracking-wide text-white">
            EcoChef<span className="text-yellow-400">AI</span>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 flex flex-col md:flex-row md:space-x-6 text-white text-sm">
            <Link to="/about" className="hover:text-yellow-400 transition">About Us</Link>
            <Link to="/how-it-works" className="hover:text-yellow-400 transition">How It Works</Link>
            <Link to="/recipes" className="hover:text-yellow-400 transition">Recipes</Link>
            <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
          </nav>
        </div>

        {/* Right Side - Social Icons */}
        <div className="flex space-x-6">
          <Link to="https://instagram.com" target='_blank' className="text-white hover:text-yellow-400 transition text-2xl">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link to="https://twitter.com" target='_blank' className="text-white hover:text-yellow-400 transition text-2xl">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link to="https://facebook.com" target='_blank' className="text-white hover:text-yellow-400 transition text-2xl">
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mt-8"></div>

      {/* Copyright */}
      <p className="text-center text-gray-200 text-sm mt-4">
        © {new Date().getFullYear()} EcoChefAI. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;