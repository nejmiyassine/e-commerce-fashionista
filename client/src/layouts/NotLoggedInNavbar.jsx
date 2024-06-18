import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuToggle,
} from '@nextui-org/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { navbarItems } from '../data/navbarItems';

const NotLoggedInNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    {/* <AcmeLogo /> */}
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

            <NavbarMenu className="pt-10 gap-6">
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

export default NotLoggedInNavbar;
