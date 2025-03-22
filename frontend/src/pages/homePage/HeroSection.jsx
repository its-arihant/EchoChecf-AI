import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import GG from '../../assets/gg.png';
import SS from '../../assets/ss.png';

const HeroSection = ({ aboutUsRef }) => {
  const handleLearnMore = () => {
    if (aboutUsRef?.current) {
      aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });

    tl.fromTo(
      '.hero-text',
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, stagger: 0.2 }
    ).fromTo(
      '.hero-buttons',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.3 },
      '-=0.5'
    );

    gsap.to('.floating-svg', {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <main>
      <section className='relative bg-gradient-to-b from-amber-100 to-yellow-50 h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden'>
        {/* Text & Buttons Container */}
        <div className='relative z-10 max-w-3xl mx-auto'>
          {/* Tagline */}
          <h1 className='hero-text text-4xl md:text-6xl font-bold text-green-700 mb-4 leading-tight'>
            From Nature to Plate: <br className='hidden md:block' />
            <span className='text-yellow-500'>
              Forage Safely, Cook Creatively
            </span>
          </h1>

          {/* Subheading */}
          <p className='hero-text text-lg md:text-xl text-green-800 max-w-2xl mx-auto mb-8'>
            Identify plants, discover recipes, and make sustainable eating
            effortless.
          </p>

          {/* Hero Buttons */}
          <div className='hero-buttons flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-sm mx-auto'>
            <Link
              to='/recipes'
              className='w-full md:w-auto bg-green-600 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition'
            >
              Get Started
            </Link>
            <button
              onClick={handleLearnMore}
              className='w-full md:w-auto bg-yellow-300 text-green-800 text-lg font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-400 transition'
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Decorative Vectors */}
        <div className='absolute inset-0 pointer-events-none'>
          <img
            src={GG}
            alt='Leaf Decoration'
            className='floating-svg absolute top-10 left-10 w-60 opacity-75'
          />
          <img
            src={SS}
            alt='Small Leaf Decoration'
            className='floating-svg absolute top-1/2 left-5 w-40 opacity-60'
          />
          <img
            src={SS}
            alt='Flower Decoration'
            className='floating-svg absolute top-20 right-40 w-20 opacity-70'
          />
          <img
            src={GG}
            alt='Fruit Decoration 2'
            className='floating-svg absolute bottom-1/3 right-5 w-80 opacity-70'
          />
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
