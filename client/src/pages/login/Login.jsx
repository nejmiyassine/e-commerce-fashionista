import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Spacer, Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { IoMdMail } from 'react-icons/io';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import LoadingSpinner from '../../components/LoadingSpinner';
import { useLoginUserMutation } from '../../app/api/authApi';

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
    const navigate = useNavigate();
    const [
        loginUser,
        {
            isLoading: isLoginUserLoading,
            isError,
            error: errorLoginUser,
            isSuccess,
        },
    ] = useLoginUserMutation();

    const { user, isLoading, error } = useSelector((state) => state.users);

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
        formState: { errors },
        reset,
    } = methods;

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    // Function to open the modal with a message
    const openModalWithMessage = (message) => {
        setLoginMessage(message);

        // Automatically close the modal after 4 seconds
        setTimeout(() => {
            setLoginMessage(''); // Clear the message
        }, 4000);
    };

    useEffect(() => {
        if (isSuccess) {
            reset('');
            toast({
                title: 'User Logged In Successfully!',
            });
            navigate('/admin/dashboard');
        }

        if (isError) {
            if (Array.isArray(error).data.error) {
                error.data.error.forEach((el) =>
                    toast({ title: el.message, variant: 'destructive' })
                );
            } else {
                toast({ title: error.data.message, variant: 'destructive' });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    const onSubmit = async (values) => {
        try {
            loginUser({ ...values, account_type: 'user' });
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('An error occurred:', error);
            openModalWithMessage('Invalid Credentials');
        }
    };

    if (isLoading || isLoginUserLoading) {
        return <LoadingSpinner />;
    }

    if (error || errorLoginUser) {
        toast({
            variant: 'destructive',
            description: 'Something went wrong',
        });
        return <LoadingSpinner />;
    }

    return user && user.role ? (
        <Navigate to='/admin/dashboard' />
    ) : (
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

                    {loginMessage && (
                        <div className='text-center text-sm'>
                            <p className='text-red-500 text-xl font-semibold'>
                                {loginMessage}
                            </p>
                        </div>
                    )}

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
