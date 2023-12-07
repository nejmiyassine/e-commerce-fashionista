import React, { useState } from 'react';
import { FaBars, FaFacebookF, FaTwitter, FaGooglePlusG, FaInstagram } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import Logo from "../../assets/logo.png";
import { faHeart, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { toggleBag } from '../../features/bag/bagSlice';

const Navbar = () => {
  const dispatch = useDispatch();

    const openBagSidebar = () => {
        dispatch(toggleBag(true));
    };
  const [navOpen, setNavOpen] = useState(false);

  const handleNav = () => {
    setNavOpen(!navOpen);
  };
  const iconStyle = "text-2xl";
  const linkStyle = "text-center text-gray-100 hover:text-primaryColor-orange transition relative";
  const badgeStyle = "absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs";


  const handleClose = () => {
    setNavOpen(false);
  };

  return (
    <div className="w-full bg-black py-1 flex justify-between items-center text-white">
      <div className="flex items-center">
        <a href="/landingpage">
        <img src={Logo} alt="Logo" className="h-12" /></a>
      </div>

      <div className="hidden sm:flex items-center">
        <ul className="flex space-x-4">
          <li>
            <a  className=" py-2 px-4 hover:border hover:border-gold-500 hover:rounded hover:bg-white hover:text-yellow-500" href="/landingpage">Home</a>
          </li>
          <li>
            <Link className=" py-2 px-4 hover:border hover:border-gold-500 hover:rounded hover:bg-white hover:text-yellow-500"  to="/catalog">Products</Link>
          </li>
          <li>
          <Link className=" py-2 px-4 hover:border hover:border-gold-500 hover:rounded hover:bg-white hover:text-yellow-500"  to="/About">About Us</Link>
          </li>
          <li>
            <Link className=" py-2 px-4 hover:border hover:border-gold-500 hover:rounded hover:bg-white hover:text-yellow-500"  to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
      

      <div className="flex items-center justify-center space-x-2 px-3">
                {[
                    { icon: faShoppingBag, label: 'Cart', count: 0 },
                    { icon: farUser, label: 'Account' },
                ].map(({ icon, label, count }, index) => (
                    <button key={index} onClick={label === 'Cart' && openBagSidebar} className={linkStyle}>
                        <div className={iconStyle}>
                            <FontAwesomeIcon className='' icon={icon} />
                        </div>
                        <div className="text-xs leading-3">{label}</div>
                        {count !== undefined && (
                            <div className={badgeStyle}>
                                {count}
                            </div>
                        )}
                    </button>
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
            <a href="#AboutUs">Categories</a>
          </li>
          <li>
            <a href="#AboutUs">Accessories</a>
          </li>
          <li>
            <Link to="/catalog">Products</Link>
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
