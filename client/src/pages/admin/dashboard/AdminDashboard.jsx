import { createContext, useState } from 'react';
import AdminNavbar from '../../../layouts/AdminNavbar';
import AdminSidebar from '../../../layouts/AdminSidebar';

export const SidebarContext = createContext();

const AdminDashboard = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleSidebar = () => {
        console.log('admin dashboard: ', expanded);
        setExpanded(!expanded);
    };

    return (
        <SidebarContext.Provider value={{ expanded, toggleSidebar }}>
            <div className='flex'>
                <AdminSidebar />
                <div className='w-full'>
                    <AdminNavbar />

                    <div className='min-h-screen text-primary-light bg-primary-dark dark:text-primary-dark dark:bg-primary-light'>
                        <h2 className='p-4 text-xl font-semibold'>Dashboard</h2>
                    </div>
                </div>
            </div>
        </SidebarContext.Provider>
    );
};

export default AdminDashboard;
