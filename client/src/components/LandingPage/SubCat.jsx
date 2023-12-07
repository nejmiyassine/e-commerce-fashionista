import React from 'react';
import Pants from '../../assets/pants.jpg';
import Necklace from '../../assets/necklace.jpg';
import Shirt from '../../assets/shirt.jpg';
import Traditional from '../../assets/traditional.jpg';
import Jacket from '../../assets/jacket.jpg';
import Skirt from '../../assets/skirt.jpg';
import {Link} from 'react-router-dom';


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
    <div className='container py-8 px-4 md:py-16 md:px-16 lg:px-24 xl:px-32'>
      <h2 className="text-3xl md:text-4xl lg:text-5xl py-3 md:py-5 font-mono font-bold text-center text-gray-900">
        Shop By Category:
      </h2>
      <div className='grid grid-rows-2  md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group"
          >
            <div
              className="relative grid h-[18rem] md:h-[13rem] w-full flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700 transition-opacity duration-300 ease-in-out"
            >
              <div
                className="cursor-pointer absolute inset-0 m-0 h-full w-full bg-no-repeat overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none transition-opacity duration-300 ease-in-out"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
              </div>
              <div className="relative p-4 md:p-6 lg:p-8">
                <h2 className="mb-4 md:mb-6 block font-sans text-xl md:text-2xl lg:text-3xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                  {category.name}
                </h2>
                <div className="p-0 md:mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs md:text-sm lg:text-base py-2 md:py-3.5 px-4 md:px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                    type="button"
                  >
                    <Link to="/catalog">
                    Explore Now
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCat;
