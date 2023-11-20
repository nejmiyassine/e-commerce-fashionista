import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/users/usersSlice';
import axios from '../../api/axios';
import { Spacer, Button, Input } from '@nextui-org/react';
import { IoMdMail } from 'react-icons/io';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector((state) => state.users);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/v1/users/login', {
                email,
                password,
            });

            if (res.status === 200) {
                const user = res.data.user;
                dispatch(login(user));
                navigate('/admin/dashboard');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            openModalWithMessage('Invalid Credentials');
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
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
                        onSubmit={handleSubmit}
                    >
                        <Input
                            clearable
                            bordered
                            fullWidth
                            size='lg'
                            type='email'
                            label='Email'
                            name='email'
                            placeholder='you@gmail.com'
                            labelPlacement='outside'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            startContent={
                                <IoMdMail className='text-2xl text-default-400 pointer-events-none pr-1' />
                            }
                        />
                        <Spacer y={1} />
                        <Input
                            clearable
                            bordered
                            fullWidth
                            size='lg'
                            label='Password'
                            labelPlacement='outside'
                            type={isVisible ? 'text' : 'password'}
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='********'
                            startContent={
                                <RiLockPasswordFill className='text-2xl text-default-400 pointer-events-none pr-1' />
                            }
                            endContent={
                                <button
                                    className='focus:outline-none'
                                    type='button'
                                    onClick={toggleVisibility}
                                >
                                    {isVisible ? (
                                        <FaEyeSlash className='text-2xl text-slate-400 pointer-events-none' />
                                    ) : (
                                        <FaEye className='text-2xl text-slate-400 pointer-events-none' />
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
                className={`flex hidden lg:flex lg:w-1/2 min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 bg-[url('https://images.unsplash.com/photo-1485518882345-15568b007407?q=80&w=1484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-center`}
            ></div>
        </div>
    );
};

export default Login;

// {
//     isModalOpen && (
//         <div className='fixed inset-0 flex items-center justify-center z-50'>
//             <div className='bg-white w-1/3 p-4 rounded shadow-lg text-center'>
//                 <p className='text-[#210487dd] text-xl font-semibold'>
//                     {loginMessage}
//                 </p>
//                 <button
//                     className='bg-[#962934] text-white py-2 px-4 mt-4 rounded-full hover:bg-[#001F4E] focus:outline-none'
//                     onClick={() => setModalOpen(false)}
//                 >
//                     Close
//                 </button>
//             </div>
//         </div>
//     );
// }
