import OrdersTable from '../../../components/Orders/OrdersTable';
import Layout from '../../../layouts/Layout';

const Orders = () => {
    return (
        <Layout>
            <div className='rounded-md p-4 shadow-sm bg-white dark:bg-primaryColor-deepDark'>
                <h2 className='font-bold text-xl mb-4'>All Orders</h2>
                <OrdersTable />
            </div>
        </Layout>
    );
};

export default Orders;
