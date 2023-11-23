import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import LoadingSpinner from '../components/LoadingSpinner';
import { useGetMyProfileDataQuery } from '../app/api/usersApi';
import { useGetCustomerProfileDataQuery } from '../app/api/customerApi';

const ProtectedRoutes = ({ allowedRoles }) => {
    const [cookies] = useCookies(['logged_in']);
    const isLoggedIn = cookies.logged_in;

    const { data: user, isLoading, isFetching } = useGetMyProfileDataQuery();
    const {
        data: customer,
        isLoading: isLoadingCustomer,
        isFetching: isFetchingCustomer,
    } = useGetCustomerProfileDataQuery();

    console.log(user);
    console.log(customer);

    const loading =
        isLoading || isFetching || isLoadingCustomer || isFetchingCustomer;

    if (loading) {
        return <LoadingSpinner />;
    }

    return isLoggedIn && user && allowedRoles.includes(user.role) ? (
        <Outlet />
    ) : isLoggedIn && customer ? (
        <Navigate to='/unauthorized' />
    ) : (
        <Navigate to='/admin/login' />
    );
};

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
    allowedRoles: PropTypes.any,
};
