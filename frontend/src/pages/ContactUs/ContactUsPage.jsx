import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import ContactUs from './ContactUs'

const ContactUsPage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
    <Navbar />
    <main className='flex-grow'>
      <ContactUs />
    </main>
    <Footer />
  </div>
  )
}

export default ContactUsPage