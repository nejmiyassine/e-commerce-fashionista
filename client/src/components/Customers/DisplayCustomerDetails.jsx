/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import Layout from '../../layouts/Layout';
import { Button } from '@nextui-org/react';
import { BiSolidCalendar } from 'react-icons/bi';
import { BsArrowLeftShort } from 'react-icons/bs';
import { formatDate } from '../../utils/formatDate';
import { MailIcon } from '../../icons/Icons';

const DisplayCustomerDetails = ({ customer }) => {
    return (
        <Layout>
            {/* customers info */}
            <div className='bg-white dark:bg-primaryColor-deepDark'>
                <div className='rounded-md p-4 shadow-sm bg-white dark:bg-primaryColor-deepDark'>
                    <h2 className='text-lg font-semibold'>Customer Details</h2>
                    {customer ? (
                        <div className='mt-2'>
                            <div className='flex justify-between gap-4'>
                                <div className='flex flex-col flex-1 py-1'>
                                    <p className='font-semibold p-1'>
                                        First Name
                                    </p>
                                    <p className='rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                                        {customer.first_name}
                                    </p>
                                </div>
                                <div className='flex flex-col flex-1 py-1'>
                                    <p className='font-semibold p-1'>
                                        Last Name
                                    </p>
                                    <p className='rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                                        {customer.last_name}
                                    </p>
                                </div>
                            </div>

                            <div className='flex justify-between gap-4'>
                                <div className='flex flex-col flex-1 py-1'>
                                    <p className='font-semibold p-1'>Email</p>
                                    <p className='flex justify-between items-center rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                                        <span>{customer.email}</span>
                                        <span>
                                            <MailIcon />
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className='flex justify-between gap-4'>
                                <div className='flex flex-col flex-1 py-1'>
                                    <p className='font-semibold p-1'>Status</p>
                                    <p className='flex items-center gap-2 rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                                        {customer.active ? (
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
                                <p className='font-semibold p-1'>
                                    Creation Date
                                </p>
                                <p className='flex items-center gap-2 rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                                    <span>
                                        <BiSolidCalendar />
                                    </span>
                                    <span>
                                        {formatDate(customer.creation_date)}
                                    </span>
                                </p>
                            </div>

                            <div className='flex justify-between gap-4'>
                                <div className='flex flex-col flex-1 py-1'>
                                    <p className='font-semibold p-1'>
                                        Last Login
                                    </p>
                                    <p className='flex items-center gap-2 rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                                        <span>
                                            <BiSolidCalendar />
                                        </span>
                                        <span>
                                            {formatDate(customer.last_login)}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <Link to='/admin/customers'>
                                <Button
                                    className=' bg-black text-white mt-4 flex items-center hover:bg-black/90'
                                    type='secondaryColor'
                                >
                                    <BsArrowLeftShort size={20} />
                                    <span>Back to Customers</span>
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <p>Customer not found</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default DisplayCustomerDetails;
