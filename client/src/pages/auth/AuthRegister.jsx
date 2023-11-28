import { Link } from 'react-router-dom';
import AuthImage from '../../components/AuthImage';
import AuthRegisterForm from '../../components/AuthRegisterForm';

const AuthRegister = () => {
    return (
        <div className='flex items-center h-screen overflow-y-hidden bg-white text-primaryColor-light dark:bg-primaryColor-deepDark dark:text-primaryColor-dark'>
            <div className='w-full lg:w-1/2 p-20'>
                <div className='px-8 py-6 md:px-16'>
                    <div className='mb-6 text-center'>
                        <h2 className='font-bold text-3xl mb-1'>
                            Create an account!
                        </h2>

                        <p className='flex justify-center gap-1'>
                            <span className='text-gray-400'>
                                Already have an account?
                            </span>
                            <Link
                                to='/login'
                                className='text-blue-600 underline'
                            >
                                Login
                            </Link>
                        </p>
                    </div>

                    <AuthRegisterForm account_type={'customer'} />
                </div>
            </div>

            <AuthImage />
        </div>
    );
};

export default AuthRegister;
