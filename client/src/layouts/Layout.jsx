import PropTypes from 'prop-types';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import { useState } from 'react';

const Layout = ({ children }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    return (
        <div className='flex'>
            <AdminSidebar expanded={expanded} toggleSidebar={toggleSidebar} />
            <main className='transition-all w-full'>
                <AdminNavbar />

                <div className='min-h-screen pl-24 p-4 flex-1 text-primaryColor-light bg-primaryColor-dark dark:text-primaryColor-dark dark:bg-primaryColor-light'>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;

Layout.propTypes = {
    children: PropTypes.any,
};
