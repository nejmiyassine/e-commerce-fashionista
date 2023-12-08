import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import UpdateCustomerComponent from '../../components/CustomersFront/UpdateCustomerComponent';
import { useSelector } from 'react-redux';

import NavbarCustomers from '../../components/CustomersFront/NavBarCustomers';
import { useGetCustomerProfileDataQuery } from '../../app/api/customerApi';

const UpdateCustomerInfo = () => {
    const {
        data: customer,
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetCustomerProfileDataQuery();

    if (isLoading || isFetching) {
        return <LoadingSpinner />;
    }

    if (!isLoading && isError) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <NavbarCustomers customer={customer} />
            <UpdateCustomerComponent customer={customer} />
        </div>
    );
};

export default UpdateCustomerInfo;
