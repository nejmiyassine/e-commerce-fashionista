import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import UpdateCustomerComponent from '../../components/CustomersFront/UpdateCustomerComponent';
import { useDispatch, useSelector } from 'react-redux';
import { patchCustomerData } from '../../features/customers/frontCustomerSlice';

import NavbarCustomers from '../../components/CustomersFront/NavBarCustomers';

const UpdateCustomerInfo = () => {
    const { customerId } = useParams();
    console.log('customerId' , customerId)
    const dispatch = useDispatch();
    const { isLoading, customerData, err } = useSelector((state) => state.frontCustomers);
    console.log('data from updateCustomerInfo', customerData);



    if (isLoading) {
        return <LoadingSpinner />;
    }
    if (!isLoading && err) {
        return <div>Error: {err}</div>;
    }

    return (
        <div >
        <NavbarCustomers customer={customerData} />
            <UpdateCustomerComponent customer={customerData} />
        </div>

    );
};

export default UpdateCustomerInfo;
