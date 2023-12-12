import CustomersOrders from '../../components/CustomersOrdersFront/CustomersOrders';
import CustomerNavbar from '../../layouts/CustomerNavbar';

const CustomersOrdersPage = () => {
    return (
        <>
            <CustomerNavbar />
            <div className='mt-16 '>
                <h2 className='text-4xl font-extrabold leading-tight text-center mb-8'>
                    Your Orders
                </h2>
                <CustomersOrders />
            </div>
        </>
    );
};

export default CustomersOrdersPage;
