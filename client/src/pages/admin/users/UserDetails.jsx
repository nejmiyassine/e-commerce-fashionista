import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';
import { BiSolidCalendar } from 'react-icons/bi';
import { BsArrowLeftShort } from 'react-icons/bs';

import UserDetailsSkeleton from '../../../components/UserDetailsSkeleton';
import Layout from '../../../layouts/Layout';

import { useGetUserByIdQuery } from '../../../app/api/usersApi';
import { formatDate } from '../../../utils/formatDate';
import { MailIcon, UserIcon } from '../../../icons/Icons';
import { FaUserCheck } from 'react-icons/fa';
const UserDetails = () => {
    let { userId } = useParams();
    const {
        isLoading,
        isFetching,
        isError,
        error,
        data: user,
    } = useGetUserByIdQuery(userId);

    React.useEffect(() => {
        if (isError) {
            NProgress.done();
            const err = error;
            if (Array.isArray(err.data.error)) {
                err.data.error.forEach((el) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                const resMessage =
                    err.data.message ||
                    err.data.detail ||
                    err.message ||
                    err.toString();
                toast.error(resMessage, {
                    position: 'top-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching]);

    if (isLoading || isFetching) {
        return <UserDetailsSkeleton />;
    }

    return (
        <Layout>
            <div className='rounded-md p-4 shadow-sm bg-white dark:bg-primaryColor-deepDark'>
                <h2 className='text-lg font-semibold'>User Details</h2>
                {isLoading || (isFetching && <UserDetailsSkeleton />)}
                {user ? (
                    <div className='mt-2'>
                        <div className='flex justify-between gap-4'>
                            <div className='flex flex-col flex-1 py-1'>
                                <p className='font-semibold p-1'>First Name</p>
                                <p className='rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                                    {user.first_name}
                                </p>
                            </div>
                            <div className='flex flex-col flex-1 py-1'>
                                <p className='font-semibold p-1'>Last Name</p>
                                <p className='rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                                    {user.last_name}
                                </p>
                            </div>
                        </div>

                        <div className='flex justify-between gap-4'>
                            <div className='flex flex-col flex-1 py-1'>
                                <p className='font-semibold p-1'>Username</p>
                                <p className='flex justify-between items-center rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                                    <span>{user.username}</span>
                                    <span>
                                        <UserIcon />
                                    </span>
                                </p>
                            </div>
                            <div className='flex flex-col flex-1 py-1'>
                                <p className='font-semibold p-1'>Email</p>
                                <p className='flex justify-between items-center rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                                    <span>{user.email}</span>
                                    <span>
                                        <MailIcon />
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className='flex justify-between gap-4'>
                            <div className='flex flex-col flex-1 py-1'>
                                <p className='font-semibold p-1'>Role</p>
                                <p className='flex items-center text-green-500 gap-1 dark:text-green-400 rounded-md border p-2 text-sm'>
                                    <FaUserCheck />
                                    <span className='rounded-md capitalize cursor-pointer w-12 text-center'>
                                        {user.role}
                                    </span>
                                </p>
                            </div>
                            <div className='flex flex-col flex-1 py-1'>
                                <p className='font-semibold p-1'>Status</p>
                                <p className='flex items-center gap-2 rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                                    {user.active ? (
                                        <>
                                            <span className='w-2 h-2 rounded-full bg-green-600 dark:bg-green-500'></span>
                                            <span className='text-green-600 dark:text-green-500'>
                                                Active
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className='w-2 h-2 rounded-full bg-red-600 dark:bg-red-500'></span>
                                            <span className='text-red-600 dark:text-red-500'>
                                                Inactive
                                            </span>
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className='flex flex-col flex-1 py-1'>
                            <p className='font-semibold p-1'>Joining Date</p>
                            <p className='flex items-center gap-2 rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                                <span>
                                    <BiSolidCalendar />
                                </span>
                                <span>{formatDate(user.creation_date)}</span>
                            </p>
                        </div>

                        <div className='flex justify-between gap-4'>
                            <div className='flex flex-col flex-1 py-1'>
                                <p className='font-semibold p-1'>Last Login</p>
                                <p className='flex items-center gap-2 rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                                    <span>
                                        <BiSolidCalendar />
                                    </span>
                                    <span>{formatDate(user.last_login)}</span>
                                </p>
                            </div>

                            <div className='flex flex-col flex-1 py-1'>
                                <p className='font-semibold p-1'>Last Update</p>
                                <p className='flex items-center gap-2 rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                                    <span>
                                        <BiSolidCalendar />
                                    </span>
                                    <span>{formatDate(user.last_update)}</span>
                                </p>
                            </div>
                        </div>

                        <Link to='/admin/users'>
                            <Button
                                className='mt-4 flex items-center hover:bg-[#d4d4db]/75'
                                type='secondaryColor'
                            >
                                <BsArrowLeftShort size={20} />
                                <span>Back to Users</span>
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <p>User not found</p>
                )}
            </div>
        </Layout>
    );
};

export default UserDetails;
