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

    const [loginUser, { isLoading, isError, error, isSuccess }] =
        useLoginUserMutation();

    const [
        loginCustomer,
        {
            isLoading: isLoadingCustomer,
            isError: isErrorCustomer,
            error: errorCustomer,
            isSuccess: isSuccessCustomer,
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

    const loading = isLoading || isLoadingCustomer;

    useEffect(() => {
        if (isSuccess || isSuccessCustomer) {
            toast.success('You successfully logged in', {
                position: 'bottom-right',
            });
            navigate(account_type === 'user' ? '/admin/dashboard' : '/');
        }

        if (isError || isErrorCustomer) {
            if (Array.isArray(error.data.error)) {
                (error || errorCustomer).data.error.forEach((el) =>
                    toast.error(el.message, {
                        position: 'bottom-right',
                    })
                );
            } else {
                toast.error((error || errorCustomer).data.message, {
                    position: 'bottom-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmit = async (values) => {
        {
            account_type === 'user'
                ? loginUser({ ...values, account_type })
                : loginCustomer({ ...values, account_type });
        }
    };

    return (
        <form
            className='w-full p flex flex-col flex-1 gap-2'
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
                className='mt-4 bg-primary-deepDark text-primary-dark dark:bg-white dark:text-primary-light'
                type='submit'
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
