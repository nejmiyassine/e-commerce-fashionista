/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaShoppingBag } from 'react-icons/fa';

// import Logo from '../../assets/logo.png';
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import { IoFilter } from 'react-icons/io5';
import { IoMdHeart } from 'react-icons/io';
import { useCookies } from 'react-cookie';

import { logOutCustomer } from '../features/customers/frontCustomerSlice';
import { useGetCustomerProfileDataQuery } from '../app/api/customerApi';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchFavorites } from '../features/favorites/favoritesSlice';
import { useGetAllCartItemsQuery } from '../app/api/cartApi';

const Navbar = ({ toggleSidebar, openBagSidebar }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [cookies] = useCookies(['logged_in']);
    const isLoggedIn = cookies.logged_in;

    const {
        data: customer,
        isLoading: isCustomerProfileLoading,
        isFetching,
    } = useGetCustomerProfileDataQuery();
    const { data: cartItems, isLoading: isCartItemsLoading } =
        useGetAllCartItemsQuery();

    const { data, isLoading } = useSelector((state) => state.favorites);

    const [navOpen, setNavOpen] = useState(false);

    const handleNav = () => {
        setNavOpen(!navOpen);
    };

    const badgeStyle =
        'absolute -top-1 w-4 h-4 rounded-full flex items-center justify-center bg-black text-white text-xs';

    const handleClose = () => {
        setNavOpen(false);
    };

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    const loading = isCustomerProfileLoading || isFetching;

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='w-full py-3 px-10 flex justify-between items-center'>
            <div className='flex items-center'>
                <Link to='/landing-page'>
                    <h2 className='font-bold text-xl'>Logo</h2>
                </Link>
            </div>

            <div className='hidden sm:flex items-center'>
                <ul className='flex gap-8 text-sm'>
                    <li>
                        <Link
                            className='hover:text-primaryColor-blueCyan hover:underline hover:underline-offset-8'
                            to='/landing-page'
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='hover:text-primaryColor-blueCyan hover:underline hover:underline-offset-8'
                            to='/shop'
                        >
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='hover:text-primaryColor-blueCyan  hover:underline hover:underline-offset-8'
                            to='/About'
                        >
                            About us
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='hover:text-primaryColor-blueCyan  hover:underline hover:underline-offset-8'
                            to='/contact'
                        >
                            Contact us
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='flex items-center justify-center gap-5 px-3'>
                <button
                    onClick={toggleSidebar}
                    className='text-center text-gray-700 transition'
                >
                    <IoFilter className='w-5 h-5' />
                </button>

                <button
                    onClick={openBagSidebar}
                    className='text-center text-gray-700 transition relative'
                >
                    <FaShoppingBag className='w-5 h-5' />
                    <span className={`${badgeStyle} -right-2`}>
                        {!isCartItemsLoading || cartItems
                            ? cartItems.cartItems?.length
                            : 0}
                    </span>
                </button>

                <button className='text-center text-gray-700 transition relative'>
                    <Link to='/customers-favorites'>
                        <IoMdHeart className='w-5 h-5 text-rose-500' />
                        <span className={`${badgeStyle} -right-2`}>
                            {!isLoading || data.length ? data.length : 0}
                        </span>
                    </Link>
                </button>

                {isLoggedIn && customer && (
                    <Dropdown placement='bottom-end'>
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as='button'
                                className='transition-transform'
                                color='secondaryColor'
                                name='Customer Name'
                                size='sm'
                                src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                            />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label='Profile Actions'
                            variant='flat'
                        >
                            <DropdownItem key='settings' className='h-8'>
                                <Button
                                    className='bg-color-none '
                                    onClick={() => {
                                        navigate(
                                            `/update-profile/${customer._id}`
                                        );
                                    }}
                                >
                                    Settings
                                </Button>
                            </DropdownItem>

                            <DropdownItem
                                key='logout'
                                color='danger'
                                className='h-8'
                            >
                                <Button
                                    className='bg-color-none'
                                    onClick={() => {
                                        dispatch(logOutCustomer());
                                        navigate('/login');
                                    }}
                                >
                                    Log out
                                </Button>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )}
            </div>

            <div className='sm:hidden flex items-center'>
                <FaBars
                    size={20}
                    onClick={handleNav}
                    className='cursor-pointer mx-4'
                />
                {navOpen && (
                    <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/90 p-4 text-center'>
                        <div className='flex justify-end'>
                            <div
                                onClick={handleClose}
                                className='cursor-pointer'
                            >
                                <FaBars size={20} />
                            </div>
                        </div>
                        <ul className='flex flex-col space-y-4'>
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/shop'>Products</Link>
                            </li>
                            <li>
                                <Link to='/'>About us</Link>
                            </li>
                            <li>
                                <Link to='/'>Contact us</Link>
                            </li>
                        </ul>
                        <div className='mt-4'>
                            <input
                                type='text'
                                placeholder='Search...'
                                className='px-4 py-2 border border-gray-300 rounded-md'
                            />
                            <button className='ml-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700'>
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
