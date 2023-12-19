import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Input, Button, Spacer } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
    useLoginCustomerMutation,
    useLoginUserMutation,
} from '../app/api/authApi';
import { IoMdMail } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';

const userSchema = yup
    .object({
        email: yup.string().email().required('Please enter a valid email'),
        password: yup
            .string()
            .required('Please enter a password')
            .min(8, 'Password must have at least 8 characters')
            .max(32, 'Password must have 32 characters maximum'),
    })
    .required();

const AuthLoginForm = ({ account_type }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [loginUser, { isLoading, isSuccess, isError }] =
        useLoginUserMutation();

    const [
        loginCustomer,
        {
            isLoading: isLoadingCustomer,
            isSuccess: isSuccessCustomer,
            isError: isErrorCustomer,
        },
    ] = useLoginCustomerMutation();

    const navigate = useNavigate();

    const methods = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
    } = methods;

    useEffect(() => {
        if (isSuccess) {
            toast.success('You successfully logged in', {
                position: 'bottom-right',
            });
            navigate('/admin/dashboard');
        }

        if (isError) {
            toast.error('Invalid Credentials!', {
                position: 'bottom-right',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isError]);

    useEffect(() => {
        if (isSuccessCustomer) {
            toast.success('You successfully logged in', {
                position: 'bottom-right',
            });
            navigate('/landing-page');
        }

        if (isErrorCustomer) {
            toast.error('Invalid Credentials!', {
                position: 'bottom-right',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingCustomer, isErrorCustomer]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmit = async (values) => {
        try {
            if (account_type === 'user') {
                await loginUser({ ...values, account_type });
            } else {
                await loginCustomer({ ...values, account_type });
            }
        } catch (error) {
            // If login is not successful, show the error message
            if (error instanceof Error && error.response) {
                // Access the error message from the API response
                const errorMessage = error.response.data.message;
                toast.error(errorMessage, {
                    position: 'bottom-right',
                });
            } else {
                // Handle other types of errors (network issues, etc.)
                toast.error('An error occurred. Please try again.', {
                    position: 'bottom-right',
                });
            }
        }
    };

    return (
        <form
            className='flex flex-col flex-1 gap-2 md:w-96 mx-auto'
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                clearable
                variant='bordered'
                fullWidth
                aria-label='Email'
                labelPlacement='outside'
                type='email'
                name='email'
                label='Email'
                placeholder='you@gmail.com'
                {...register('email')}
                isInvalid={!!errors.email}
                errorMessage={errors.email && errors.email?.message}
                startContent={
                    <IoMdMail
                        size={20}
                        className='text-2xl text-default-400 pointer-events-none flex-shrink-0'
                    />
                }
            />
            <Spacer y={1} />
            <Input
                clearable
                fullWidth
                variant='bordered'
                aria-label='Password'
                labelPlacement='outside'
                type={isVisible ? 'text' : 'password'}
                name='password'
                label='Password'
                placeholder='Password'
                {...register('password')}
                isInvalid={!!errors.password}
                errorMessage={errors.password && errors.password?.message}
                startContent={
                    <RiLockPasswordFill
                        size={28}
                        className='text-2xl text-default-400 pointer-events-none pr-1'
                    />
                }
                endContent={
                    <button
                        className='focus:outline-none'
                        type='button'
                        onClick={toggleVisibility}
                    >
                        {isVisible ? (
                            <FaEyeSlash className='text-2xl text-default-400 pointer-events-none' />
                        ) : (
                            <FaEye className='text-2xl text-default-400 pointer-events-none' />
                        )}
                    </button>
                }
            />

            {account_type === 'customer' && (
                <div className='flex justify-end py-1'>
                    <Link
                        to='/forgot-password'
                        className='text-sm hover:underline'
                    >
                        Forget Password?
                    </Link>
                </div>
            )}

            <Button
                className='mt-4 bg-primaryColor-deepDark text-primaryColor-dark dark:bg-white dark:text-primaryColor-light'
                type='submit'
                isLoading={isLoading || isLoadingCustomer}
            >
                Sign in
            </Button>
        </form>
    );
};

export default AuthLoginForm;

AuthLoginForm.propTypes = {
    account_type: PropTypes.string,
};
