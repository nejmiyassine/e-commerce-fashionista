import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useGetMyProfileDataQuery } from '../../app/api/usersApi';
import LoadingSpinner from '../LoadingSpinner';

const DashboardWelcome = () => {
    const {
        data: user,
        isLoading,
        isError,
        error,
    } = useGetMyProfileDataQuery();

    useEffect(() => {
        if (isError) {
            if (Array.isArray(error).data.error) {
                error.data.error.forEach((el) => toast.error(el.message));
            } else {
                toast.error(error.data.message);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <h2 className='text-xl font-semibold'>
                Welcome Back {user.username} 👋!
            </h2>
            <span className='text-sm text-gray-600 dark:text-gray-200'>
                Home - Dashboard
            </span>
        </div>
    );
};

export default DashboardWelcome;
