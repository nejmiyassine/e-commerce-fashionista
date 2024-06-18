/* eslint-disable react/no-unescaped-entities */
import { Spacer } from '@nextui-org/react';
import { Link } from 'react-router-dom';

import AuthLoginForm from '@components/AuthLoginForm';

const AuthLogin = () => {
    return (
        <>
            <div className="flex items-center min-h-screen bg-white text-primaryColor-light dark:bg-primaryColor-deepDark dark:text-primaryColor-dark">
                <div className="w-full">
                    <div className="px-8 py-6">
                        <h2 className="text-3xl font-extrabold text-center mb-4">
                            <span className="text-primaryColor-gold">
                                Fashionista{' '}
                            </span>
                            Login
                        </h2>
                        <p className="text-gray-600 text-sm mt-4 text-center">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="text-primaryColor-gold"
                            >
                                Sign up here
                            </Link>
                            .
                        </p>
                        <Spacer y={6} />

                        <AuthLoginForm account_type={'customer'} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthLogin;
