import { useEffect, useState } from 'react';
import {
    // Navigate,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spacer, Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { IoMdMail } from 'react-icons/io';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

// import LoadingSpinner from '../../components/LoadingSpinner';
import { useLoginUserMutation } from '../../app/api/authApi';
// import { useGetMyProfileDataQuery } from '../../app/api/usersApi';

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

const Login = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [loginUser, { isLoading, isError, error, isSuccess }] =
        useLoginUserMutation();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from.pathname || '/admin/dashboard';

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
            toast.success('You successfully logged in');
            navigate(from);
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
        loginUser({ ...values, account_type: 'user' });
    };

    return (
        <div className='flex items-center min-h-screen bg-white text-primary-light dark:bg-primary-deepDark dark:text-primary-dark'>
            <div className='w-full lg:w-1/2 p-20'>
                <div className='px-8 py-6 md:px-16'>
                    <div className='mb-6 text-center'>
                        <h2 className='font-bold text-3xl mb-1'>
                            Welcome back!
                        </h2>
                        <p className='text-sm text-slate-400 dark:text-slate-500'>
                            Please enter your details
                        </p>
                    </div>

                    <form
                        className='flex flex-col gap-4'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Input
                            clearable
                            variant='bordered'
                            fullWidth
                            aria-label='Email'
                            labelPlacement='outside'
                            size='lg'
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
                            errorMessage={
                                errors.password && errors.password?.message
                            }
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
                        <Button
                            className='bg-primary-deepDark text-primary-dark dark:bg-white dark:text-primary-light'
                            type='submit'
                        >
                            Sign in
                        </Button>
                    </form>
                </div>
            </div>

            <div
                className={`flex hidden lg:flex lg:w-1/2 h-screen bg-gradient-to-r from-cyan-500 to-blue-500 overflow-hidden bg-no-repeat bg-center`}
            >
                <img
                    className='w-full h-full object-cover'
                    src='https://images.unsplash.com/photo-1485518882345-15568b007407?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='background admin login'
                />
            </div>
        </div>
    );
};

export default Login;
