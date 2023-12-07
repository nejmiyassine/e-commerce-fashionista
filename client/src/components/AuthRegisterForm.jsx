import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Spacer } from '@nextui-org/react';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useRegisterCustomerMutation } from '../app/api/authApi';

const userSchema = yup
    .object({
        first_name: yup.string().required('Please enter a first name'),
        last_name: yup.string().required('Please enter a last name'),
        email: yup.string().email().required('Please enter a valid email'),
        password: yup
            .string()
            .required('Please enter a password')
            .min(8, 'Password must have at least 8 characters')
            .max(32, 'Password must have 32 characters maximum'),
        confirmPassword: yup
            .string()
            .min(8, 'Password must have at least 8 characters')
            .max(32, 'Password must have 32 characters maximum')
            .oneOf([yup.ref('password')], 'Passwords does not match'),
    })
    .required();

const AuthRegisterForm = ({ account_type }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [registerCustomer, { isLoading, isError, error, isSuccess }] =
        useRegisterCustomerMutation();

    const navigate = useNavigate();

    const methods = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
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
            toast.success('You successfully logged in');
            navigate(account_type === 'user' ? '/admin/dashboard' : '/');
        }

        if (isError) {
            if (Array.isArray(error.data.error)) {
                error.data.error.forEach((el) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                toast.error(error.data.message, {
                    position: 'top-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmit = async (values) => {
        registerCustomer({ ...values, account_type });
    };

    return (
        <form
            className='w-full h-full overflow-y-hidden flex flex-col flex-1 gap-2'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='flex gap-2'>
                <Input
                    clearable
                    variant='bordered'
                    fullWidth
                    aria-label='first_name'
                    labelPlacement='outside'
                    type='text'
                    name='first_name'
                    label='First Name'
                    placeholder='First Name'
                    {...register('first_name')}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email && errors.email?.message}
                />
                <Input
                    clearable
                    variant='bordered'
                    fullWidth
                    aria-label='last_name'
                    labelPlacement='outside'
                    type='text'
                    name='last_name'
                    label='Last Name'
                    placeholder='Last Name'
                    {...register('last_name')}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email && errors.email?.message}
                />
            </div>
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
            <Spacer y={1} />
            <Input
                clearable
                fullWidth
                variant='bordered'
                aria-label='Password'
                labelPlacement='outside'
                type={isVisible ? 'text' : 'password'}
                name='confirmPassword'
                label='Confirm Password'
                placeholder='Confirm Password'
                {...register('confirmPassword')}
                isInvalid={!!errors.confirmPassword}
                errorMessage={
                    errors.confirmPassword && errors.confirmPassword?.message
                }
                startContent={
                    <RiLockPasswordFill
                        size={28}
                        className='text-2xl text-default-400 pointer-events-none pr-1'
                    />
                }
            />

            <Button
                className='mt-4 bg-primaryColor-deepDark text-primaryColor-dark dark:bg-white dark:text-primaryColor-light'
                type='submit'
            >
                Create account
            </Button>
        </form>
    );
};

export default AuthRegisterForm;

AuthRegisterForm.propTypes = {
    account_type: PropTypes.string,
};
