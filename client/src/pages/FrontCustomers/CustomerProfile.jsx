import { useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerProfile } from '../../features/customers/frontCustomerSlice';

import NavbarCustomers from '../../components/CustomersFront/NavBarCustomers';

const CustomerProfile = () => {
    const dispatch = useDispatch();
    const { loading, customerData, error } = useSelector(
        (state) => state.frontCustomers
    );
    console.log('customerData from customerProfile', customerData);

    useEffect(() => {
        dispatch(getCustomerProfile());
        console.log('dispatch', dispatch(getCustomerProfile()));
    }, [dispatch]);

    if (loading) {
        return <LoadingSpinner />;
    }
    if (!loading && error) {
        return <div>Error: {error}</div>;
    }

    console.log('customerData', customerData);
    console.log('customerDataID', customerData);

    return (
        <div>
            {customerData ? (
                <NavbarCustomers customer={customerData} />
            ) : (
                <div>no customer found</div>
            )}
        </div>
    );
};
export default CustomerProfile;
