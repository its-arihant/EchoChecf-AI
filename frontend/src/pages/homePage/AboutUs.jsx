import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faSearch, faUpload } from '@fortawesome/free-solid-svg-icons';

const AboutWebsite = () => {
  const aboutRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const aboutElement = aboutRef.current;
    const searchElement = searchRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === aboutElement) {
              gsap.fromTo(
                ".about-text",
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
              );
            }
            if (entry.target === searchElement) {
              gsap.fromTo(
                ".search-card",
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.2, duration: 1.5, ease: "power3.out" }
              );
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (aboutElement) observer.observe(aboutElement);
    if (searchElement) observer.observe(searchElement);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-website"
      className="min-h-screen bg-green-50 flex flex-col justify-start items-center py-16"
    >
      {/* About Section */}
      <div ref={aboutRef} className="container mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-8">
          About the Website
        </h2>
        <p className="text-lg md:text-xl text-green-700 leading-relaxed max-w-3xl mx-auto about-text">
          Our website is dedicated to helping you identify plants effortlessly,
          explore creative recipes, and embrace sustainable eating habits.
          Whether you are a nature enthusiast, a curious cook, or someone
          looking for eco-friendly food options, our platform provides an easy
          way to discover the natural world around you.
        </p>
      </div>

      {/* Search Options Section */}
      <div ref={searchRef} className="container mx-auto px-6 text-center">
        <p className="text-xl md:text-xl font-bold text-green-900 mb-12">
          Search for Plants in Three Ways
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition search-card">
            <FontAwesomeIcon icon={faUpload} className="w-12 h-12 mx-auto mb-4 text-green-700" />
            <h3 className="text-xl font-semibold text-green-900 mb-2">Upload an Image</h3>
            <p className="text-green-700">Upload a photo to identify a plant.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition search-card">
            <FontAwesomeIcon icon={faCamera} className="w-12 h-12 mx-auto mb-4 text-green-700" />
            <h3 className="text-xl font-semibold text-green-900 mb-2">Click an Image</h3>
            <p className="text-green-700">Snap a photo to start foraging.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition search-card">
            <FontAwesomeIcon icon={faSearch} className="w-12 h-12 mx-auto mb-4 text-green-700" />
            <h3 className="text-xl font-semibold text-green-900 mb-2">Search by Name</h3>
            <p className="text-green-700">Enter the name of a plant to learn more.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWebsite;