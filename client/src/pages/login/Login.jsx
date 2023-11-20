import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/users/usersSlice';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);

    // Function to open the modal with a message
    const openModalWithMessage = (message) => {
        setLoginMessage(message);
        setModalOpen(true);

        // Automatically close the modal after 5 seconds
        setTimeout(() => {
            setModalOpen(false);
            setLoginMessage(''); // Clear the message
        }, 5000);
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
                openModalWithMessage('Login successful');
                // Redirect to the '/admin/dashboard' route
                navigate('/admin/dashboard');
            } else {
                openModalWithMessage('Login unsuccessful: email or password incorrect');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            openModalWithMessage('An error occurred while logging in');
        }
    };
    
    return (
        <section className='bg-gray-50 min-h-screen flex items-center justify-center'>
            <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center'>
                <div className='md:w-1/2 px-8 md:px-16'>
                    <h2 className='font-bold text-2xl'>Welcome Back!</h2>
                    <p className='text-sm mt-4'>Log in to your account</p>
                    <form
                        className='flex flex-col gap-4'
                        onSubmit={handleSubmit}
                    >
                        <input
                            className='p-2 mt-4 rounded-xl border'
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className='relative'>
                            <input
                                className='p-2 rounded-xl border w-full'
                                type='password'
                                name='password'
                                value={password}
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type='button' className='eye-icon'></button>
                        </div>
                        <button className='bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300'>
                            Login
                        </button>
                    </form>
                </div>
                <div className='md:block hidden w-1/2'>
                    <img
                        className='rounded-2xl'
                        src='https://images.pexels.com/photos/1858488/pexels-photo-1858488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                        alt='Login'
                    />
                </div>
            </div>

            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div className='bg-white w-1/3 p-4 rounded shadow-lg text-center'>
                        <p className='text-[#210487dd] text-xl font-semibold'>
                            {loginMessage}
                        </p>
                        <button
                            className='bg-[#962934] text-white py-2 px-4 mt-4 rounded-full hover:bg-[#001F4E] focus:outline-none'
                            onClick={() => setModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Login;
