import AdminNavbar from '../../../layouts/AdminNavbar';
import DashboardWelcome from '../../../components/Dashboard/DashboardWelcome';
import DashboardCard from '../../../components/Dashboard/DashboardCard';
import VerticalChart from '../../../components/Dashboard/VerticalChart';
import AreaChart from '../../../components/Dashboard/AreaChart';
import LastUsersTable from '../../../components/Users/LastUsersTable';
import LastOrders from '../../../components/LastOrders';
import Layout from '../../../layouts/Layout';

const AdminDashboard = () => {
    return (
        <Layout>
            <div className='container mx-auto'>
                <DashboardWelcome />
                <DashboardCard />
                <div className='w-full flex flex-col lg:flex-row items-center justify-between gap-4 pt-4'>
                    <div className='w-full lg:w-1/2 rounded-md p-4 shadow-sm bg-white dark:bg-primary-deepDark'>
                        <VerticalChart />
                    </div>
                    <div className='w-full lg:w-1/2 rounded-md p-4 shadow-sm bg-white dark:bg-primary-deepDark'>
                        <AreaChart />
                    </div>
                </div>
                <div className='mt-6 flex gap-4'>
                    <div className='w-3/5 rounded-md p-4 bg-white dark:bg-primary-deepDark'>
                        <LastUsersTable />
                    </div>
                    <div className='w-2/5 rounded-md p-4 bg-white dark:bg-primary-deepDark'>
                        <LastOrders />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
