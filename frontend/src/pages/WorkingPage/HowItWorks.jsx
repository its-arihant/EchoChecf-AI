import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const stepsRef = useRef([]);
  const mlRef = useRef(null);

  useEffect(() => {
    // Animation for steps
    stepsRef.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.3,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Animation for ML section
    gsap.fromTo(
      mlRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: mlRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center py-12 px-6'>
      <h1 className='text-4xl font-bold text-green-700 mb-8'>How It Works</h1>
      <div className='max-w-4xl text-center text-gray-700 mb-12'>
        <p className='text-lg'>
          Our platform helps you identify ingredients from images and find
          related recipes using smart filters. Just follow these simple steps!
        </p>
      </div>

      {/* ML Prediction Section */}
      <div
        ref={mlRef}
        className='mb-16 bg-green-600 p-8 rounded-lg shadow-xl w-full max-w-4xl text-center'
      >
        <h2 className='text-3xl font-bold text-white'>
          AI-Powered Ingredient Detection
        </h2>
        <p className='text-white/50 mt-4'>
          Our machine learning model can identify ingredients from an image and
          suggest related recipes instantly. Choose between uploading an image
          or using the live camera for real-time predictions.
        </p>
        <div className='mt-6 flex justify-center align-middle gap-6 font-bold text-white'>
          <div className='px-6 py-3 bg-yellow-300 text-white font-semibold rounded-lg shadow-md'>
            Upload Image
          </div>
          OR
          <div className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md'>
            Use Live Camera
          </div>
        </div>
      </div>

      <div className='w-full max-w-4xl grid md:grid-cols-3 gap-8'>
        {['Capture or Upload Image', 'Get Predictions', 'Find Recipes'].map(
          (step, index) => (
            <div
              key={index}
              ref={(el) => (stepsRef.current[index] = el)}
              className='bg-white p-6 rounded-lg shadow-lg flex flex-col items-center'
            >
              <span className='text-3xl font-bold text-green-700'>
                {index + 1}
              </span>
              <h2 className='text-xl font-semibold mt-4'>{step}</h2>
              <p className='text-gray-600 mt-2 text-center'>
                {step === 'Capture or Upload Image' &&
                  'Take a photo or upload an image of an ingredient to start the prediction process.'}
                {step === 'Get Predictions' &&
                  'Our AI model analyzes the image and identifies the ingredient or plant.'}
                {step === 'Find Recipes' &&
                  'Based on the ingredient, explore a variety of recipes with smart filters for diet preferences and cooking time.'}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default HowItWorks;
