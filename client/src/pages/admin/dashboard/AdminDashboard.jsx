// import DashboardWelcome from '../../../components/Dashboard/DashboardWelcome';
import DashboardCard from '../../../components/Dashboard/DashboardCard';
import OrdersChart from '../../../components/Dashboard/OrdersChart';
import LastUsersTable from '../../../components/Users/LastUsersTable';
import LastOrders from '../../../components/Orders/LastOrders';
import Layout from '../../../layouts/Layout';

const AdminDashboard = () => {
    return (
        <Layout>
            <div className='container mx-auto'>
                {/* <DashboardWelcome /> */}
                <DashboardCard />
                <OrdersChart />

                <div className='mt-6 flex flex-col lg:flex-row gap-4'>
                    <div className='w-full lg:w-3/5 rounded-md p-4 bg-white dark:bg-primary-deepDark'>
                        <LastUsersTable />
                    </div>
                    <div className='w-full lg:w-2/5 rounded-md p-4 bg-white dark:bg-primary-deepDark'>
                        <LastOrders />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
