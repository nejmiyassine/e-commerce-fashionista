import React from 'react';
import Pants from '../../assets/pants.jpg';
import Necklace from '../../assets/necklace.jpg';
import Shirt from '../../assets/shirt.jpg';
import Traditional from '../../assets/traditional.jpg';
import Jacket from '../../assets/jacket.jpg';
import Skirt from '../../assets/skirt.jpg';

const categories = [
  { image: Pants, name: 'Pants' },
  { image: Necklace, name: 'Necklace' },
  { image: Shirt, name: 'Shirt' },
  { image: Skirt, name: 'Skirt' },
  { image: Traditional, name: 'Traditional' },
  { image: Jacket, name: 'Jacket' },
];

const SubCat = () => {
  return (
    <div className='container py-16 px-16'>
      <h2 className="text-4xl py-5 font-mono font-bold text-center text-gray-900">
        Shop By Category:
      </h2>
      <div className='grid grid-cols-3 gap-8'>
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative rounded-medium overflow-hidden transition-transform transform hover:scale-105"
          >
            <img src={category.image} alt="" className='w-full h-[20rem]' />
            <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-mono group-hover:bg-opacity-60 transition'>
              {category.name}
              <button className="hidden group-hover:inline-block absolute bottom-4 bg-white text-black px-4 py-2 rounded-full">
                Explore Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCat;
