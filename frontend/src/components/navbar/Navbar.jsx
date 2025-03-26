import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/home" className="text-2xl font-bold">
          EcoChef<span className="text-yellow-300">AI</span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/about" className="hover:text-yellow-300 transition">About Us</Link>
          <Link to="/how-it-works" className="hover:text-yellow-300 transition">How It Works</Link>
          <Link to="/recipes" className="hover:text-yellow-300 transition">Recipes</Link>
          <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>
        </nav>

        {/* Profile Icon */}
        <Link to="/profile">
          <FontAwesomeIcon icon={faUserCircle} className="text-white text-3xl hover:text-yellow-300 transition" />
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-white text-3xl" />
        </button>
      </div>

      {/* Mobile Menu */}
      <nav 
        className={`md:hidden bg-green-600 text-white text-center py-5 space-y-4 transition-all duration-300 ${
          menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"
        }`}
      >
        <Link to="/about" className="block hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>About Us</Link>
        <Link to="/how-it-works" className="block hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>How It Works</Link>
        <Link to="/recipes" className="block hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>Recipes</Link>
        <Link to="/contact" className="block hover:text-yellow-300 transition" onClick={() => setMenuOpen(false)}>Contact</Link>
      </nav>
    </header>
  );
};

export default Navbar;