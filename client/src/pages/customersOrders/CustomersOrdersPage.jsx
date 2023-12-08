import React, { useEffect } from 'react';
import CustomersOrders from '../../components/CustomersOrdersFront/CustomersOrders';
import { getCustomersOrders } from '../../features/orders/ordersSlice';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner';

const CustomersOrdersPage = () => {
    const dispatch = useDispatch();
    const { loading, ordersData, error } = useSelector((state) => state.orders);
    console.log('orderss', ordersData.orders);
  const testOrders = ordersData.orders 
    useEffect(() => {
        dispatch(getCustomersOrders());
        console.log('dispatch',dispatch(getCustomersOrders()))
    }, [dispatch]);

    
    if (loading) {
        return <LoadingSpinner />;
    }

    if (!loading && error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div>
             {ordersData ? (
                <CustomersOrders orders={testOrders} />
                
            ) : (
                <div>No orders Found</div>
            )} 
        </div>
    );
};

export default CustomersOrdersPage;
