import React from 'react';
import Men from '../../assets/men.jpg';
import Women from '../../assets/women.jpg';
import Unisex from '../../assets/unisex.jpg';

const Category = ({ title, imageSrc }) => {
  const handleMouseEnter = () => {
  };

  const handleMouseLeave = () => {
  };

  return (
    <div className="relative group">
      <div
        className="relative grid h-[25rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700 transition-opacity duration-300 ease-in-out"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="cursor-pointer absolute inset-0 m-0 h-full w-full bg-no-repeat overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none transition-opacity duration-300 ease-in-out"
          style={{ backgroundImage: `url(${imageSrc})` }}
        >
          <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
        </div>
        <div className="relative p-6 px-6 py-14 md:px-12">
          <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
            {title}
          </h2>
          <div className="p-0 mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
              type="button"
            >
              Explore Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Categories = () => {
  return (
    <div className="mx-20 pb-20 max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-2 sm:py-24 lg:max-w-none lg:py-5">
        <h1 className="text-4xl font-mono font-bold text-center text-gray-900">Explore Your Universe:</h1>

        <div className="mt-4 space-y-1 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          <Category title="Women" imageSrc={Women} />
          <Category title="Men" imageSrc={Men} />
          <Category title="Unisex" imageSrc={Unisex} />

                  </div>
      </div>
    </div>
  );
};

export default Categories;
