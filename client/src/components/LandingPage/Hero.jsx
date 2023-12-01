import React from 'react';
import HeroImage from '../../assets/hero.png';

const Hero = () => {
    return (
        <div
            className='bg-cover bg-no-repeat bg-center py-28 flex items-center'
            style={{
                backgroundImage: `url(${HeroImage})`,
            }}
        >
            <div className='w-1/2 ml-8'>
                <h2 className='text-6xl text-yellow-400 capitalize'>
                    Enjoy Our <br /> Black Friday Deals
                </h2>
                <p className='text-xl text-white mt-4 italic'>
                    Elevate your style and indulge in the season's hottest trends.
                   
                </p>
                <button className='mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-yellow-600 hover:text-white-300'>
                    Shop Now
                </button>
            </div>
        </div>
    );
};

export default Hero;
