import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useToast } from './ui/use-toast';
import DashboardSkeleton from './Dashboard/DashboardSkeleton';
import LoadingSpinner from '../components/LoadingSpinner';

const ProtectedRoutes = ({ allowedRoles }) => {
    const { toast } = useToast();
    // const token = cookies.token;

    const { user, isLoading, error } = useSelector((state) => state.auth);

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        toast({
            variant: 'destructive',
            description: 'Something went wrong',
        });
        return <LoadingSpinner />;
    }

    if (!token) {
        return <Navigate to='/' />;
    }

    return user && allowedRoles.includes(user.role) ? (
        <Outlet />
    ) : (
        <Navigate to='/' />
    );
};
export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
    allowedRoles: PropTypes.oneOf(),
};
