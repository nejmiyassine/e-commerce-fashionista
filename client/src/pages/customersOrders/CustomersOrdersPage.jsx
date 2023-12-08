import React, { useEffect } from 'react';
import CustomersOrders from '../../components/CustomersOrdersFront/CustomersOrders';
import { getCustomersOrders } from '../../features/orders/ordersSlice';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getCustomerProfile } from '../../features/customers/customersSlice';
import NavbarCustomers from '../../components/CustomersFront/NavBarCustomers';

const CustomersOrdersPage = () => {
    const dispatch = useDispatch();

    const { loading, ordersData, error } = useSelector((state) => state.orders);

    const customerOrders = ordersData.orders;

    useEffect(() => {
        dispatch(getCustomersOrders());
    }, [dispatch]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!loading && error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <NavbarCustomers />
            <div className='mt-16 '>
                {ordersData ? (
                    <CustomersOrders orders={customerOrders} />
                ) : (
                    <div>No orders Found</div>
                )}
            </div>
        </>
    );
};

export default CustomersOrdersPage;
