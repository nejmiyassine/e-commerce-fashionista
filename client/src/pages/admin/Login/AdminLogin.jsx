import { Link } from 'react-router-dom';
import AuthLoginForm from '../../../components/AuthLoginForm';

const AdminLogin = () => {
    return (
        <div className='flex items-center min-h-screen bg-white text-primaryColor-light dark:bg-primaryColor-deepDark dark:text-primaryColor-dark'>
            <div className='w-full p-10 lg:p-20'>
                <div className='mb-6 text-center'>
                    <h2 className='text-2xl md:text-3xl font-extrabold text-center mb-4'>
                        <span className='text-primaryColor-gold'>
                            Fashionista Admin{' '}
                        </span>
                        Login
                    </h2>

                    <Link to='/login' className=''>
                        You are a{' '}
                        <span className='text-primaryColor-gold underline'>
                            customer?
                        </span>
                    </Link>
                </div>

                <AuthLoginForm account_type={'user'} />
            </div>
        </div>
    );
};

export default AdminLogin;
