/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Button,
    DropdownItem,
    DropdownMenu,
    Avatar,
    DropdownTrigger,
    Dropdown,
} from '@nextui-org/react';
import { FaFilter, FaShoppingBag } from 'react-icons/fa';

import { fetchFavorites } from '@features/favorites/favoritesSlice';
import { useLogoutCustomerMutation } from '@app/api/authApi';
import { useGetAllCartItemsQuery } from '@app/api/cartApi';
import { useGetCustomerProfileDataQuery } from '@app/api/customerApi';
import { navbarItems } from '../data/navbarItems';
import { toggleCartSidebar } from '@features/cart/cartSlice';
import FilterProductContext from '../context/FilterProductContext';

const LoggedInNavbar = () => {
    const { toggleSidebar } = useContext(FilterProductContext);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { pathname } = location;

    const [cookies] = useCookies(['logged_in']);
    const isLoggedIn = cookies.logged_in;

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { data: customer } = useGetCustomerProfileDataQuery();

    const { data: cartItems, isLoading: isCartItemsLoading } =
        useGetAllCartItemsQuery();

    const openBagSidebar = () => {
        dispatch(toggleCartSidebar(true));
    };

    const [logoutCustomer] = useLogoutCustomerMutation();

    const badgeStyle =
        'absolute -top-1 -right-2 w-4 h-4 rounded-full flex items-center justify-center bg-primaryColor-gold text-xs';

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    const handleLogout = async () => {
        await logoutCustomer();

        navigate('/login');
        toast.success('See you soon 👋!', {
            position: 'bottom-right',
        });
    };

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                />
            </NavbarContent>
            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
                        <path
                            clipRule="evenodd"
                            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                            fill="currentColor"
                            fillRule="evenodd"
                        />
                    </svg>
                    <p className="font-bold text-inherit uppercase">
                        Fashionista
                    </p>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
                        <path
                            clipRule="evenodd"
                            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                            fill="currentColor"
                            fillRule="evenodd"
                        />
                    </svg>
                    <p className="font-bold text-inherit uppercase">
                        Fashionista
                    </p>
                </NavbarBrand>
                {navbarItems.map(({ text, path }, idx) => (
                    <NavbarItem key={idx}>
                        <Link to={path} className="w-full" size="lg">
                            {text}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            {isLoggedIn && customer && (
                <NavbarContent as="div" justify="end">
                    {pathname === '/shop' && (
                        <button
                            onClick={toggleSidebar}
                            className="text-center transition"
                        >
                            <FaFilter className="w-4 h-4" />
                        </button>
                    )}

                    <button
                        onClick={openBagSidebar}
                        className="mx-1 text-center transition relative"
                    >
                        <FaShoppingBag className="w-5 h-5" />
                        <span className={`${badgeStyle}`}>
                            {isCartItemsLoading || !cartItems
                                ? 0
                                : cartItems?.cartItems?.length}
                        </span>
                    </button>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="warning"
                                name="Jason Hughes"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>

                        <DropdownMenu
                            aria-label="Profile Actions"
                            variant="flat"
                        >
                            <DropdownItem
                                key="email"
                                className="h-14 gap-2"
                                textValue="your-email"
                            >
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">
                                    {customer.email}
                                </p>
                            </DropdownItem>

                            <DropdownItem
                                key="profile"
                                onClick={() => {
                                    navigate(`/update-profile/${customer._id}`);
                                }}
                                textValue="your-profile"
                            >
                                My Profile
                            </DropdownItem>
                            <DropdownItem
                                key="customer_orders"
                                onClick={() => {
                                    navigate(`/customers/orders`);
                                }}
                                textValue="your-orders"
                            >
                                Orders
                            </DropdownItem>
                            <DropdownItem
                                key="payment"
                                onClick={() => {
                                    navigate(`/payment`);
                                }}
                                textValue="payment"
                            >
                                Payment
                            </DropdownItem>

                            <DropdownItem
                                key="favorites"
                                onClick={() => {
                                    navigate(`/customers/favorites`);
                                }}
                                textValue="my-favorite-products"
                            >
                                My favorites
                            </DropdownItem>

                            <DropdownItem
                                key="logout"
                                color="danger"
                                onClick={handleLogout}
                                textValue="logout"
                            >
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            )}

            {!isLoggedIn && !customer && (
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link className="text-black cursor-pointer" to="/login">
                            Sign in
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button color="warning" variant="flat">
                            <Link to="/register">Sign Up</Link>
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            )}

            <NavbarMenu>
                {navbarItems.map(({ text, path }, idx) => (
                    <NavbarItem key={idx}>
                        <Link to={path} className="w-full" size="lg">
                            {text}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};

export default LoggedInNavbar;
