import PropTypes from 'prop-types';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import LoadingSpinner from '../components/LoadingSpinner';
import { useGetMyProfileDataQuery } from '../app/api/usersApi';

const ProtectedRoutes = ({ allowedRoles }) => {
    const [cookies] = useCookies(['logged_in']);
    const isLoggedIn = cookies.logged_in;
    const location = useLocation();

    const { data: user, isLoading, isFetching } = useGetMyProfileDataQuery();

    const loading = isLoading || isFetching;

    if (loading) {
        return <LoadingSpinner />;
    }

    return (isLoggedIn || user) && allowedRoles.includes(user.role) ? (
        <Outlet />
    ) : (
        <Navigate to='/admin/login' state={{ from: location }} replace />
    );
};
export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
    allowedRoles: PropTypes.any,
};
