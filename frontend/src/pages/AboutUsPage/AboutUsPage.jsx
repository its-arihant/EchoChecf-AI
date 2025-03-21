import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import AboutUs from './AboutUs'

const AboutUsPage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
    <Navbar />
    <main className='flex-grow'>
      <AboutUs />
    </main>
    <Footer />
  </div>
  )
}

export default AboutUsPage