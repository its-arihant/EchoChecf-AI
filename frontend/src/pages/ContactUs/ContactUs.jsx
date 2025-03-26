import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const ContactUs = () => {
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const cardsRef = useRef([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    gsap.fromTo(contactRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' });
    gsap.fromTo(formRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 });
    gsap.fromTo(cardsRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.3, duration: 1.5, ease: 'power3.out' });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmissionStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmissionStatus('error');
    }
  };

  return (
    <section className='min-h-screen bg-green-50 flex flex-col items-center py-16 px-6'>
      <div ref={contactRef} className='container mx-auto text-center mb-16'>
        <h2 className='text-5xl font-bold text-green-900 mb-6'>Contact Us</h2>
        <p className='text-lg text-green-700 max-w-3xl mx-auto leading-relaxed'>
          We would love to hear from you! Reach out to us through any of the following methods:
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
        {[
          { icon: faEnvelope, title: 'Email', info: 'EcoChefAI@gmail.com' },
          { icon: faPhone, title: 'Phone', info: '+911414141414' },
          { icon: faMapMarkerAlt, title: 'Address', info: 'Bhopal, Madhya Pradesh, India' },
        ].map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className='bg-white p-6 rounded-lg shadow-lg flex flex-col items-center'
          >
            <FontAwesomeIcon icon={item.icon} className='text-3xl text-green-700 mb-3' />
            <p className='font-semibold'>{item.title}</p>
            <p className='text-green-600'>{item.info}</p>
          </div>
        ))}
      </div>

      <div ref={formRef} className='mt-12 bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl'>
        <h3 className='text-2xl font-semibold text-green-900 mb-4'>Send Us a Message</h3>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-green-700 mb-1'>Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full p-2 border border-green-700 rounded'
              placeholder='Name'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-green-700 mb-1'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full p-2 border border-green-700 rounded'
              placeholder='Email'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-green-700 mb-1'>Message</label>
            <textarea
              name='message'
              value={formData.message}
              onChange={handleChange}
              className='w-full p-2 border border-green-700 rounded resize-none'
              placeholder='Message'
              rows='4'
              required
            ></textarea>
          </div>
          <button
            type='submit'
            className='w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition'
            disabled={submissionStatus === 'sending'}
          >
            {submissionStatus === 'sending' ? 'Sending...' : 'Send'}
          </button>
          {submissionStatus === 'success' && <p className='mt-4 text-green-600'>Message sent successfully!</p>}
          {submissionStatus === 'error' && <p className='mt-4 text-red-600'>Failed to send message. Please try again.</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
