import React from 'react';
import { AiFillPhone, AiOutlineClockCircle } from 'react-icons/ai';
import { CiLocationArrow1 } from "react-icons/ci";
import { BsChatSquareDots } from 'react-icons/bs';
import { FaShippingFast } from "react-icons/fa";
import {Link} from 'react-router-dom';


const Head = () => {

    return (
        <div className='bg-blue-100 flex justify-between items-center px-4 py-1'>
            <div className='flex items-center'>
                <FaShippingFast size={30} className='text-black mr-2' />
                <p>Free Shipping on Orders above 500 MAD</p>

            </div>
            <div className='flex'>
                <div className='hidden md:flex items-center px-6'>
                    <AiOutlineClockCircle size={20} className='mr-2 text-black' />
                    <p>9AM - 5AM</p>
                </div >
                <div className='hidden md:flex items-center px-6'>
                    <CiLocationArrow1 size={20} className='mr-2 text-black' />
                    <p>Casablanca, Morocco</p>
                </div >
                <div className='hidden md:flex items-center px-6'>
                    <AiFillPhone size={20} className='mr-2 text-black' />
                    <p>+212-654-456-543</p>
                </div>
                <button>
      
      </button>
            </div>
        </div>
    );
};

export default Head;
