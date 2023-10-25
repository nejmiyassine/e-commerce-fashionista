import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';

import { useDarkMode } from '../hooks/useDarkMode';
import { useToggleSidebar } from '../hooks/useToggleSidebar';

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

const AdminNavbar = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const { expanded, toggleSidebar } = useToggleSidebar();

    return (
        <Disclosure as='nav'>
            <>
                <div className='h-14 mx-auto w-full px-2 border-b border-gray-300 dark:border-gray-600 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 dark:text-primary-dark'>
                    <div className='relative flex h-14 items-center justify-between'>
                        <div className='flex items-center'>
                            {/* Mobile menu button*/}
                            <Disclosure.Button
                                onClick={toggleSidebar}
                                className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                            >
                                <span className='absolute -inset-0.5' />
                                <span className='sr-only'>Open main menu</span>
                                {expanded ? (
                                    <XMarkIcon
                                        className='block h-6 w-6'
                                        aria-hidden='true'
                                    />
                                ) : (
                                    <Bars3Icon
                                        className='block h-6 w-6'
                                        aria-hidden='true'
                                    />
                                )}
                            </Disclosure.Button>
                        </div>

                        <div className='flex items-center pr-2 sm:ml-6 sm:pr-0 gap-3'>
                            <button
                                type='button'
                                className={`relative rounded-full p-2 ${
                                    darkMode
                                        ? 'bg-primary-dark text-primary-light'
                                        : 'bg-primary-light text-primary-dark'
                                } focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                            >
                                <span className='absolute -inset-1.5' />
                                <span className='absolute w-2 h-2 bg-red-600 rounded-lg' />
                                <span className='sr-only'>
                                    View notifications
                                </span>
                                <BellIcon
                                    className='h-5 w-5'
                                    aria-hidden='true'
                                />
                            </button>

                            <button
                                type='button'
                                className={`relative rounded-full p-2 ${
                                    darkMode
                                        ? 'bg-primary-dark'
                                        : 'bg-primary-light'
                                } focus:outline-none`}
                                onClick={toggleDarkMode}
                            >
                                {darkMode ? (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='currentColor'
                                        className='w-5 h-5 text-gray-800 hover:text-gray-600'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='currentColor'
                                        className='w-5 h-5 text-yellow-400 hover:text-yellow-600'
                                    >
                                        <path d='M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z' />
                                    </svg>
                                )}
                            </button>

                            <Menu as='div' className='relative ml-2'>
                                <Menu.Button className='relative flex items-center gap-2 font-medium rounded-full text-sm focus:outline-none'>
                                    <div>
                                        <span className='absolute -inset-1.5' />
                                        <span className='sr-only'>
                                            Open user menu
                                        </span>
                                        <img
                                            className='h-8 w-8 rounded-full ring ring-primary ring-2 ring-offset-2'
                                            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                            alt=''
                                        />
                                    </div>
                                    <p className='text-sm'>Nejmi Yassine</p>
                                    <div>
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
                                    </div>
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
                                    <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href='#'
                                                    className={classNames(
                                                        active
                                                            ? 'bg-gray-100'
                                                            : '',
                                                        'block px-4 py-2 text-sm text-gray-700'
                                                    )}
                                                >
                                                    Your Profile
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href='#'
                                                    className={classNames(
                                                        active
                                                            ? 'bg-gray-100'
                                                            : '',
                                                        'block px-4 py-2 text-sm text-gray-700'
                                                    )}
                                                >
                                                    Settings
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href='#'
                                                    className={classNames(
                                                        active
                                                            ? 'bg-gray-100'
                                                            : '',
                                                        'block px-4 py-2 text-sm text-gray-700'
                                                    )}
                                                >
                                                    Sign out
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
            </>
        </Disclosure>
    );
};

export default AdminNavbar;
