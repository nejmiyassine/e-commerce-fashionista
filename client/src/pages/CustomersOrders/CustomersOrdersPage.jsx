import CustomersOrders from '../../components/CustomersOrdersFront/CustomersOrders';
import NavbarCustomers from '../../components/CustomersFront/NavBarCustomers';

const CustomersOrdersPage = () => {
    return (
        <>
            <NavbarCustomers />
            <div className='mt-16 '>
                <CustomersOrders />
            </div>
        </>
    );
};

export default CustomersOrdersPage;
