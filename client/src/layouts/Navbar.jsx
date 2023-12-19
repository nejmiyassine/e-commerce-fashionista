/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaShoppingBag } from 'react-icons/fa';

import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import { IoMdHeart } from 'react-icons/io';
import { useCookies } from 'react-cookie';
import { FaFilter } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { useGetCustomerProfileDataQuery } from '../app/api/customerApi';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchFavorites } from '../features/favorites/favoritesSlice';
import { useGetAllCartItemsQuery } from '../app/api/cartApi';
import { useLogoutCustomerMutation } from '../app/api/authApi';

const NavbarCustomer = ({ toggleSidebar, openBagSidebar }) => {
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

    const [logoutUser, { isSuccess }] = useLogoutCustomerMutation();

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

    const handleLogout = () => {
        logoutUser();

        if (isSuccess) {
            navigate('/login');
            toast.success('See you soon 👋!', {
                position: 'bottom-right',
            });
        }
    };

    const loading = isCustomerProfileLoading || isFetching;

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <div className='container mx-auto w-full py-3 flex justify-between items-center'>
                <div className='flex items-center'>
                    <Link to='/landing-page'>
                        <h2 className='font-bold text-xl'>Logo</h2>
                    </Link>
                </div>

                <div className='hidden sm:flex items-center'>
                    <ul className='flex gap-4 lg:gap-8 text-sm'>
                        <li>
                            <Link
                                className='hover:text-primaryColor-gold hover:underline hover:underline-offset-8'
                                to='/landing-page'
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='hover:text-primaryColor-gold hover:underline hover:underline-offset-8'
                                to='/shop'
                            >
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='hover:text-primaryColor-gold  hover:underline hover:underline-offset-8'
                                to='/About'
                            >
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='hover:text-primaryColor-gold  hover:underline hover:underline-offset-8'
                                to='/contact'
                            >
                                Contact us
                            </Link>
                        </li>
                    </ul>
                </div>

                {!isLoggedIn ||
                    (!customer && (
                        <div className='flex gap-2'>
                            <Link
                                to='/login'
                                className='rounded-md p-2 hover:text-primaryColor-gold'
                            >
                                Login
                            </Link>
                            <Link
                                to='/register'
                                className='bg-black text-white rounded-md p-2'
                            >
                                Sign up
                            </Link>
                        </div>
                    ))}

                <div className='sm:hidden flex items-center'>
                    <FaBars
                        size={20}
                        onClick={handleNav}
                        className='cursor-pointer mx-4'
                    />
                    {navOpen && (
                        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/100 z-50 p-4 text-center text-white h-screen'>
                            <div className='flex justify-end'>
                                <div
                                    onClick={handleClose}
                                    className='cursor-pointer'
                                >
                                    <FaBars size={20} />
                                </div>
                            </div>
                            <ul className='flex flex-col h-full justify-center items-center space-y-4'>
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
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default NavbarCustomer;
