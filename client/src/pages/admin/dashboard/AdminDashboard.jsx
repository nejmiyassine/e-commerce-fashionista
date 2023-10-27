import { useState } from 'react';

import AdminNavbar from '../../../layouts/AdminNavbar';
import AdminSidebar from '../../../layouts/AdminSidebar';
import DashboardWelcome from '../../../components/Dashboard/DashboardWelcome';
import DashboardCard from '../../../components/Dashboard/DashboardCard';
import VerticalChart from '../../../components/Dashboard/VerticalChart';
import AreaChart from '../../../components/Dashboard/AreaChart';

const AdminDashboard = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    return (
        <div className='flex'>
            <AdminSidebar expanded={expanded} />
            <div className='w-full flex-1'>
                <AdminNavbar
                    expanded={expanded}
                    toggleSidebar={toggleSidebar}
                />

                <div className='w-full p-4 min-h-screen text-primary-light bg-primary-dark dark:text-primary-dark dark:bg-primary-light'>
                    <div className='container mx-auto'>
                        <DashboardWelcome />
                        <DashboardCard />
                        <div className='w-full flex items-center justify-between gap-4 pt-4'>
                            <div className='w-1/2 p-4 shadow-sm bg-white dark:bg-primary-deepDark'>
                                <VerticalChart />
                            </div>
                            <div className='w-1/2 p-4 shadow-sm bg-white dark:bg-primary-deepDark'>
                                <AreaChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
