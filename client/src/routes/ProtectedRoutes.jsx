import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';

const ProtectedRoutes = ({ allowedRoles }) => {
    const { user, isLoading, error } = useSelector((state) => state.users);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        toast({
            description: 'Unauthorized',
        });
        return <LoadingSpinner />;
    }

    if (!user) {
        return <Navigate to='/admin/login' />;
    }

    return user && allowedRoles.includes(user.role) ? (
        <Outlet />
    ) : (
        <Navigate to='/admin/login' />
    );
};
export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
    allowedRoles: PropTypes.any,
};
