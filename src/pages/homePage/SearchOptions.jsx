import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faSearch,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';

const SearchOptions = () => {
  return (
    <section className='py-16 bg-green-100'>
      <h2 className='text-3xl md:text-4xl font-bold text-green-900 text-center mb-10'>
        Search for Plants in Three Ways
      </h2>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6'>
        {/* Card 1 */}
        <div className='bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition'>
          <FontAwesomeIcon icon={faUpload} className='w-12 h-12 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-green-900 mb-2'>
            Upload an Image
          </h3>
          <p className='text-green-700'>Upload a photo to identify a plant.</p>
        </div>

        {/* Card 2 */}
        <div className='bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition'>
          <FontAwesomeIcon icon={faSearch} className='w-12 h-12 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-green-900 mb-2'>
            Click an Image
          </h3>
          <p className='text-green-700'>Snap a photo to start foraging.</p>
        </div>

        {/* Card 3 */}
        <div className='bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition'>
          <FontAwesomeIcon icon={faCamera} className='w-12 h-12 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-green-900 mb-2'>
            Search by Name
          </h3>
          <p className='text-green-700'>
            Enter the name of a plant to learn more.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SearchOptions;
