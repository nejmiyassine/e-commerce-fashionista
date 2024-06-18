import { useCookies } from 'react-cookie';

import NotLoggedInNavbar from './NotLoggedInNavbar';
import LoggedInNavbar from './LoggedInNavbar';

const Navbar = ({ toggleSidebar, openBagSidebar }) => {
    const [cookies] = useCookies(['logged_in']);
    const isLoggedIn = cookies.logged_in;

    return (
        <>
            {isLoggedIn ? (
                <LoggedInNavbar
                    toggleSidebar={toggleSidebar}
                    openBagSidebar={openBagSidebar}
                />
            ) : (
                <NotLoggedInNavbar
                    toggleSidebar={toggleSidebar}
                    openBagSidebar={openBagSidebar}
                />
            )}
        </>
    );
};

export default Navbar;
