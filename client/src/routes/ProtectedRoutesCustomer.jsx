import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';

import { useGetCustomerProfileDataQuery } from '@app/api/customerApi';
import LoadingSpinner from '@components/LoadingSpinner';

const ProtectedRoutesCustomer = () => {
    const [cookies] = useCookies(['logged_in']);
    const isLoggedIn = cookies.logged_in;

    const {
        data: customer,
        isLoading,
        isFetching,
    } = useGetCustomerProfileDataQuery();

    const loading = isLoading || isFetching;

    if (loading) {
        return <LoadingSpinner />;
    }

    return isLoggedIn && customer ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutesCustomer;
