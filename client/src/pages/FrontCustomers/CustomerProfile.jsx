import { toast } from 'react-toastify';
import NProgress from 'nprogress';

import React, { useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerProfile } from '../../features/customers/customersSlice';

import NavbarCustomers from '../../components/CustomersFront/NavBarCustomers';

const CustomerProfile = () => {
    const dispatch = useDispatch();
    const { isLoading, data, error } = useSelector((state) => state.customers);
    console.log('customerData from customerProfile', data);

    useEffect(() => {
        dispatch(getCustomerProfile());
        console.log('dispatch' , dispatch(getCustomerProfile()))
        
    }, [dispatch, ]);


    if (isLoading) {
        return <LoadingSpinner />;
    }
    if (!isLoading && error) {
        return <div>Error: {error}</div>;
    }

  console.log('customerData' , data)
   console.log('customerDataID' , data)
    
    return (
        <div>
            
            {data ? (
                <NavbarCustomers customer={data} />
            ) : (
                <div>no customer found</div>
            )}
        </div>
    );
};
export default CustomerProfile;
