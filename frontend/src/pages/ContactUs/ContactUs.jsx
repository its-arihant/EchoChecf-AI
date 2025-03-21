import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

const ContactUs = () => {
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const contactElement = contactRef.current;
    const formElement = formRef.current;

    gsap.fromTo(
      contactElement,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
    );

    gsap.fromTo(
      formElement,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 }
    );

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.3, duration: 1.5, ease: 'power3.out' }
    );
  }, []);

  return (
    <section className='min-h-screen bg-green-50 flex flex-col items-center py-16 px-6'>
      <h2 className='text-4xl font-bold text-green-900 mb-8'>Contact Us</h2>

      {/* Contact Information */}
      <div
        ref={contactRef}
        className='max-w-3xl text-center text-green-700 mb-12'
      >
        <p className='text-lg'>
          We would love to hear from you! Reach out to us through any of the
          following methods:
        </p>
      </div>

      {/* Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
        {[
          { icon: faEnvelope, title: 'Email', info: 'talk@ecochefai.com' },
          { icon: faPhone, title: 'Phone', info: '+936 643 1236' },
          { icon: faMapMarkerAlt, title: 'Address', info: 'Bhopal, Madhya Pradesh, India' },
        ].map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className='bg-white p-6 rounded-lg shadow-lg flex flex-col items-center'
          >
            <FontAwesomeIcon
              icon={item.icon}
              className='text-3xl text-green-700 mb-3'
            />
            <p className='font-semibold'>{item.title}</p>
            <p className='text-green-600'>{item.info}</p>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div
        ref={formRef}
        className='mt-12 bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl'
      >
        <h3 className='text-2xl font-semibold text-green-900 mb-4'>
          Send Us a Message
        </h3>
        <form>
          <div className='mb-4'>
            <label className='block text-green-700 mb-1'>Name</label>
            <input
              type='text'
              className='w-full p-2 border border-green-700 rounded'
              placeholder='Name'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-green-700 mb-1'>Email</label>
            <input
              type='email'
              className='w-full p-2 border border-green-700 rounded'
              placeholder='Email'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-green-700 mb-1'>Message</label>
            <textarea
              className='w-full p-2 border border-green-700 rounded resize-none'
              placeholder='Message'
              rows='4'
            ></textarea>{' '}
          </div>
          <button className='w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition'>
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;