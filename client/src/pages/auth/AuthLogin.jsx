// import React from 'react';

import { Spacer } from '@nextui-org/react';
import SignInWithGoogle from '../../components/SignInWithGoogle';
import AuthLoginForm from '../../components/authLoginForm';
import { Link } from 'react-router-dom';
import AuthImage from '../../components/AuthImage';

const AuthLogin = () => {
    return (
        <div className='flex items-center min-h-screen bg-white text-primary-light dark:bg-primary-deepDark dark:text-primary-dark'>
            <div className='w-full lg:w-1/2 p-20'>
                <div className='px-8 py-6 md:px-16'>
                    <div className='mb-6 text-center'>
                        <h2 className='font-bold text-3xl mb-1'>
                            Welcome back!
                        </h2>

                        <p className='flex justify-center gap-1'>
                            <span className='text-gray-400'>{`Don't have an account?`}</span>
                            <Link
                                to='/register'
                                className='text-blue-600 underline'
                            >
                                Register
                            </Link>
                        </p>
                    </div>

                    <SignInWithGoogle />

                    <Spacer y={6} />
                    <div className='flex items-center gap-4'>
                        <div className='h-[1px] w-full bg-gray-200'></div>
                        <p className='font-bold text-center'>Or</p>
                        <div className='h-[1px] w-full bg-gray-200'></div>
                    </div>
                    <Spacer y={6} />

                    <AuthLoginForm account_type={'customer'} />
                </div>
            </div>

            <AuthImage />
        </div>
    );
};

export default AuthLogin;
