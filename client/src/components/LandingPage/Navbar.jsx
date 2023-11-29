import React, { useState } from 'react';
import { FaBars, FaFacebookF, FaTwitter, FaGooglePlusG, FaInstagram } from 'react-icons/fa';
import Logo from "../../assets/logo.png";
import { faHeart, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNav = () => {
    setNavOpen(!navOpen);
  };
  const iconStyle = "text-2xl";
  const linkStyle = "text-center text-gray-100 hover:text-primary transition relative";
  const badgeStyle = "absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs";


  const handleClose = () => {
    setNavOpen(false);
  };

  return (
    <div className="w-full bg-black p-2 flex justify-between items-center text-white">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-10" />
      </div>

      <div className="hidden sm:flex items-center">
        <ul className="flex space-x-4">
          <li>
            <a  className=" py-2 px-4 hover:border hover:border-gold-500 hover:rounded hover:bg-white hover:text-yellow-500" href="#">Home</a>
          </li>
          <li>
            <a  className=" py-2 px-4 hover:border hover:border-gold-500 hover:rounded hover:bg-white hover:text-yellow-500" href="#AboutUs">New</a>
          </li>
          <li>
            <a className=" py-2 px-4 hover:border hover:border-gold-500 hover:rounded hover:bg-white hover:text-yellow-500" href="#AboutUs">Top</a>
          </li>
          <li>
            <a  className=" py-2 px-4 hover:border hover:border-gold-500 hover:rounded hover:bg-white hover:text-yellow-500"  href="#AboutUs">Bottom</a>
          </li>
          <li>
            <a  className=" py-2 px-4 hover:border hover:border-gold-500 hover:rounded hover:bg-white hover:text-yellow-500" href="#AboutUs">Accessories</a>
          </li>
          <li>
            <a  className=" py-2 px-4 hover:border hover:border-gold-500 hover:rounded hover:bg-white hover:text-yellow-500" href="#Products">Products</a>
          </li>
         
        </ul>
      </div>
      

      <div className="flex items-center justify-center space-x-2">
                {[
                    { icon: faShoppingBag, label: 'Cart', count: 0 },
                    { icon: farUser, label: 'Account' },
                ].map(({ icon, label, count }, index) => (
                    <a key={index} href="#" className={linkStyle}>
                        <div className={iconStyle}>
                            <FontAwesomeIcon className='hover:text-yellow-500' icon={icon} />
                        </div>
                        <div className="text-xs leading-3">{label}</div>
                        {count !== undefined && (
                            <div className={badgeStyle}>
                                {count}
                            </div>
                        )}
                    </a>
                ))}
            </div>

      <div className="sm:hidden flex items-center">
        <FaBars size={20} onClick={handleNav} className="cursor-pointer mx-4" />
        {navOpen && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/90 p-4 text-center">
            <div className="flex justify-end">
              <div onClick={handleClose} className="cursor-pointer">
                <FaBars size={20} />
              </div>
            </div>
            <ul className="flex flex-col space-y-4">
            <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#AboutUs">New</a>
          </li>
          <li>
            <a href="#AboutUs">Top</a>
          </li>
          <li>
            <a href="#AboutUs">Bottom</a>
          </li>
          <li>
            <a href="#AboutUs">Accessories</a>
          </li>
          <li>
            <a href="#Products">Products</a>
          </li>
          
            </ul>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
              <button className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
