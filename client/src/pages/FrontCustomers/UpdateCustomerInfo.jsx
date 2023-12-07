import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import UpdateCustomerComponent from '../../components/CustomersFront/UpdateCustomerComponent';
import {useSelector } from 'react-redux';

import NavbarCustomers from '../../components/CustomersFront/NavBarCustomers';

const UpdateCustomerInfo = () => {
    const { customerId } = useParams();
    console.log('customerId' , customerId)
    const { isLoading, data, err } = useSelector((state) => state.customers);
    console.log('data from updateCustomerInfo', data);



    if (isLoading) {
        return <LoadingSpinner />;
    }
    if (!isLoading && err) {
        return <div>Error: {err}</div>;
    }

    return (
        <div >
        <NavbarCustomers customer={data} />
            <UpdateCustomerComponent customer={data} />
        </div>

    );
};

export default UpdateCustomerInfo;
