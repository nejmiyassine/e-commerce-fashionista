import { Fragment, useEffect } from 'react';
import { Switch } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';

import { Disclosure, Menu, Transition } from '@headlessui/react';

import { useDarkMode } from '../hooks/useDarkMode';
import { SunIcon, MoonIcon } from '../icons/Icons';
import { toast } from 'react-toastify';
import { useGetMyProfileDataQuery } from '../app/api/usersApi';
import { useLogoutUserMutation } from '../app/api/authApi';

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

const AdminNavbar = () => {
    const navigate = useNavigate();
    const { toggleDarkMode } = useDarkMode();

    const [
        logoutUser,
        {
            isLoading: isLogoutLoading,
            isSuccess,
            error: logoutError,
            isError: isLogoutError,
        },
    ] = useLogoutUserMutation();

    const {
        data: user,
        isLoading,
        isError,
        error,
    } = useGetMyProfileDataQuery();

    const loading = isLogoutLoading || isLoading;
    const isErrorLog = isLogoutError || isError;
    const errorLog = logoutError || error;

    useEffect(() => {
        if (isSuccess) {
            navigate('/admin/login');
        }

        if (isErrorLog) {
            if (Array.isArray(errorLog).data.error) {
                errorLog.data.error.forEach((el) => toast.error(el.message));
            } else {
                toast.error(errorLog.data.message);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    const handleLogout = () => {
        logoutUser();
        toast.success('See you soon 👋!', {
            position: 'bottom-right',
        });
    };

    return (
        <Disclosure as='nav'>
            <>
                <div className='h-14 mx-auto px-2 sm:px-6 lg:px-8 border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-primaryColor-deepDark dark:text-primaryColor-dark'>
                    <div className='relative flex h-full gap-4 items-center items-center justify-end'>
                        <Switch
                            defaultSelected
                            color='secondary'
                            onClick={toggleDarkMode}
                            size='md'
                            startContent={<SunIcon />}
                            endContent={<MoonIcon />}
                        />

                        <Menu as='div' className='relative'>
                            <Menu.Button className='relative flex items-center gap-2 font-medium rounded-full text-sm focus:outline-none'>
                                <div>
                                    <span className='absolute -inset-1.5' />
                                    <span className='sr-only'>
                                        Open user menu
                                    </span>
                                    <img
                                        className='h-8 w-8 rounded-full ring ring-primaryColor ring-2 ring-offset-2'
                                        src='https://cdn-icons-png.flaticon.com/512/847/847969.png'
                                        alt=''
                                    />
                                </div>
                                <p className='text-sm'>{user.username}</p>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    className='w-4 h-4'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter='transition ease-out duration-100'
                                enterFrom='transform opacity-0 scale-95'
                                enterTo='transform opacity-100 scale-100'
                                leave='transition ease-in duration-75'
                                leaveFrom='transform opacity-100 scale-100'
                                leaveTo='transform opacity-0 scale-95'
                            >
                                <Menu.Items className='absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to={`/admin/users/${user._id}`}
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                            >
                                                Your Profile
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to='/admin/login'
                                                onClick={handleLogout}
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                            >
                                                Log out
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                    {/* </div> */}
                </div>
            </>
        </Disclosure>
    );
};

export default AdminNavbar;
