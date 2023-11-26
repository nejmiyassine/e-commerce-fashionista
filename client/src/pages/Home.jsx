import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useLogoutCustomerMutation } from '../app/api/authApi';

const Home = () => {
    const navigate = useNavigate();
    const [logoutCustomer, { isLoading, isSuccess, error, isError }] =
        useLogoutCustomerMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate('/admin/login');
        }

        if (isError) {
            if (Array.isArray(error).data.error) {
                error.data.error.forEach((el) => toast.error(el.message));
            } else {
                toast.error(error.data.message);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    const handleLogout = () => {
        logoutCustomer();
        toast.success('See you soon 👋!', {
            position: 'bottom-right',
        });
    };

    return (
        <div className='flex items-center justify-between px-10'>
            <h2 className='font-bold text-2xl'>Home</h2>
            <div className='flex items-center gap-2'>
                <Link
                    className='text-blue-600 underline underline-offset-4'
                    to='/admin/dashboard'
                >
                    Dashboard
                </Link>
                <Link
                    className='text-blue-600 underline underline-offset-4'
                    to='/admin/login'
                >
                    Admin Login
                </Link>
                <Link
                    className='text-blue-600 underline underline-offset-4'
                    to='/login'
                >
                    Login
                </Link>
                <Link
                    className='text-blue-600 underline underline-offset-4'
                    to='/catalog'
                >
                    Catalog
                </Link>
                <Link
                    to='/admin/login'
                    onClick={handleLogout}
                    className='text-blue-600 underline underline-offset-4'
                >
                    Log out
                </Link>
            </div>
        </div>
    );
};

export default Home;
