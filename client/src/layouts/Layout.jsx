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
            <main
                className={`transition-all ${expanded ? 'w-10/12' : 'w-full'}`}
            >
                <AdminNavbar />

                <div className='p-4 flex-1 text-primary-light bg-primary-dark dark:text-primary-dark dark:bg-primary-light'>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;

Layout.propTypes = {
    children: PropTypes.element,
};
