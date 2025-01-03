import React, { useRef } from 'react';
import HeroSection from './HeroSection';
import AboutUs from './AboutUs'; // Renamed from AboutUs for clarity
import MeetTheTeam from './MeetTheTeam';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const HomePage = () => {
  const aboutUsRef = useRef(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Pass the aboutUsRef to HeroSection */}
        <HeroSection aboutUsRef={aboutUsRef} />
        <div ref={aboutUsRef}>
          <AboutUs />
        </div>
        <MeetTheTeam />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;