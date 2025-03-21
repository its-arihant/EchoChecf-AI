import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import HowItWorks from './HowItWorks'

const HowItWorksPage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
    <Navbar />
    <main className='flex-grow'>
      <HowItWorks />
    </main>
    <Footer />
  </div>
  )
}

export default HowItWorksPage