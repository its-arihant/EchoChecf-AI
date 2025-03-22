import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import Profile from './Profile';

const ProfilePage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
    <Navbar />
    <main className='flex-grow'>
      <Profile />
    </main>
    <Footer />
  </div>
  )
}

export default ProfilePage