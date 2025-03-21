import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faLightbulb,
  faTrophy,
  faGlobe,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';
import About1 from '../../assets/aboutImg/about1.jpeg';
import About2 from '../../assets/aboutImg/about2.jpeg';
import About3 from '../../assets/aboutImg/about3.jpeg';

const AboutUs = () => {
  const aboutRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      aboutRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
    );

    sectionRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.3,
          ease: 'power3.out',
        }
      );
    });
  }, []);

  return (
    <section className='min-h-screen bg-green-50 flex flex-col items-center py-16 px-6'>
      {/* Company Overview */}
      <div ref={aboutRef} className='container mx-auto text-center mb-16'>
        <h2 className='text-5xl font-bold text-green-900 mb-6'>About Us</h2>
        <p className='text-lg text-green-700 max-w-3xl mx-auto leading-relaxed'>
          Welcome to{' '}
          <span className='font-bold text-green-800'>EcoChef AI</span>, where
          technology meets culinary excellence. Our platform leverages
          cutting-edge AI and machine learning to revolutionize how you interact
          with food. From ingredient detection to personalized recipe
          suggestions, we make cooking smarter and easier for everyone.
        </p>
      </div>

      {/* Our Mission & Vision */}
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-center'>
        <div
          ref={(el) => (sectionRefs.current[0] = el)}
          className='bg-white p-8 rounded-lg shadow-lg'
        >
          <FontAwesomeIcon
            icon={faLightbulb}
            className='text-green-700 text-4xl mb-4'
          />
          <h3 className='text-2xl font-semibold text-green-900 mb-2'>
            Our Mission
          </h3>
          <p className='text-green-700'>
            To simplify and enhance home cooking through AI-powered technology.
            We aim to reduce food waste, promote healthier eating, and make
            recipe discovery effortless.
          </p>
        </div>

        <div
          ref={(el) => (sectionRefs.current[1] = el)}
          className='bg-white p-8 rounded-lg shadow-lg'
        >
          <FontAwesomeIcon
            icon={faGlobe}
            className='text-green-700 text-4xl mb-4'
          />
          <h3 className='text-2xl font-semibold text-green-900 mb-2'>
            Our Vision
          </h3>
          <p className='text-green-700'>
            To become the leading AI-powered culinary assistant, transforming
            how people cook and interact with food globally.
          </p>
        </div>
      </div>

      {/* Achievements */}
      <div
        ref={(el) => (sectionRefs.current[2] = el)}
        className='mt-16 text-center max-w-4xl'
      >
        <h3 className='text-3xl font-bold text-green-900 mb-4'>
          Our Achievements
        </h3>
        <p className='text-green-700 mb-6'>
          We have empowered thousands of users with AI-driven cooking solutions.
          Here are some of our notable milestones:
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='relative rounded-lg overflow-hidden shadow-lg'>
            <img
              src={About1}
              alt='Users'
              className='w-full h-80 object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end'>
              <h4 className='text-xl font-semibold text-white'>1K+ Users</h4>
              <p className='text-white/80'>
                A growing community of food lovers.
              </p>
            </div>
          </div>

          <div className='relative rounded-lg overflow-hidden shadow-lg'>
            <img
              src={About2}
              alt='Users'
              className='w-full h-80 object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end'>
              <h4 className='text-xl font-semibold text-white'>
                Award-Winning AI
              </h4>
              <p className='text-white/80'>
                Recognized for innovation in AI-driven recipe recommendations.
              </p>
            </div>
          </div>

          <div className='relative rounded-lg overflow-hidden shadow-lg'>
            <img
              src={About3}
              alt='Users'
              className='w-full h-80 object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end'>
              <h4 className='text-xl font-semibold text-white'>99% Accuracy</h4>
              <p className='text-white/80'>
                High-precision ingredient recognition for accurate recipe
                suggestions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
