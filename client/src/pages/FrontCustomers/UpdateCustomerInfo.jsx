import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import UpdateCustomerComponent from '../../components/CustomersFront/UpdateCustomerComponent';
import { useDispatch, useSelector } from 'react-redux';
import { customersById } from '../../features/customers/customersSlice';

import NavbarCustomers from '../../components/CustomersFront/NavBarCustomers';

const UpdateCustomerInfo = () => {
    const { customerId } = useParams();
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.customers);
    console.log('data from updateCustomerInfo', data);

    useEffect(() => {
        dispatch(customersById(customerId));
    }, [dispatch, customerId]);


    if (loading) {
        return <LoadingSpinner />;
    }
    if (!loading && error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div >
        <NavbarCustomers customer={data} />
            <UpdateCustomerComponent customer={data} />
        </div>

    );
};

export default UpdateCustomerInfo;
