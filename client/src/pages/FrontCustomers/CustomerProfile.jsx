import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';

import NavbarCustomers from '../../components/CustomersFront/NavBarCustomers';
import { useGetCustomerProfileDataQuery } from '../../app/api/customerApi';

const CustomerProfile = () => {
    return (
        <div>
            <NavbarCustomers />
        </div>
    );
};
export default CustomerProfile;
