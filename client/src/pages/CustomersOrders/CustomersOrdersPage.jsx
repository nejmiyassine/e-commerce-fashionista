import CustomersOrders from '../../components/CustomersOrdersFront/CustomersOrders';
import Navbar from '../../layouts/NavBar';

const CustomersOrdersPage = () => {
    return (
        <>
            <Navbar />
            <div className='mt-16 '>
                <CustomersOrders />
            </div>
        </>
    );
};

export default CustomersOrdersPage;
