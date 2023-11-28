/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import Layout from '../../layouts/Layout';
import { Button } from '@nextui-org/react';
import { BiSolidCalendar } from 'react-icons/bi';
import { BsArrowLeftShort } from 'react-icons/bs';
import { formatDate } from '../../utils/formatDate';
import { MailIcon } from '../../icons/Icons';
import { AiOutlineDollar } from 'react-icons/ai';
import { AiOutlineShopping } from 'react-icons/ai';
import { MdOutlineTaskAlt } from 'react-icons/md';
import { MdOutlineCancel } from 'react-icons/md';

const DisplayCustomerDetails = ({ customer }) => {
    return (
        <Layout>
            <div className='flex    text-gray-800 py-5  '>
                <div className=' w-full'>
                    <div className='grid grid-cols-12 gap-4'>
                        <div className='col-span-12 sm:col-span-6 md:col-span-3'>
                            <div className='flex flex-row bg-white shadow-sm rounded p-4'>
                                <div className='flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500'>
                                    <AiOutlineDollar className='w-10 h-12' />
                                </div>
                                <div className='flex flex-col flex-grow ml-4'>
                                    <div className='text-sm text-gray-500'>
                                        Total Costs
                                    </div>
                                    <div className='font-bold text-lg'>
                                        12K ${' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-12 sm:col-span-6 md:col-span-3'>
                            <div className='flex flex-row bg-white shadow-sm rounded p-4'>
                                <div className='flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500'>
                                    <AiOutlineShopping className='w-10 h-12' />
                                </div>
                                <div className='flex flex-col flex-grow ml-4'>
                                    <div className='text-sm text-gray-500'>
                                        Total Order
                                    </div>
                                    <div className='font-bold text-lg'>
                                        2307
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-12 sm:col-span-6 md:col-span-3'>
                            <div className='flex flex-row bg-white shadow-sm rounded p-4'>
                                <div className='flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500'>
                                    <MdOutlineTaskAlt className='w-10 h-12' />
                                </div>
                                <div className='flex flex-col flex-grow ml-4'>
                                    <div className='text-sm text-gray-500'>
                                        Completed
                                    </div>
                                    <div className='font-bold text-lg'>
                                        1934
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-12 sm:col-span-6 md:col-span-3'>
                            <div className='flex flex-row bg-white shadow-sm rounded p-4'>
                                <div className='flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500'>
                                    <MdOutlineCancel className='w-10 h-12' />
                                </div>
                                <div className='flex flex-col flex-grow ml-4'>
                                    <div className='text-sm text-gray-500'>
                                        Canceled
                                    </div>
                                    <div className='font-bold text-lg'>235</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                                    className=' bg-blue-300 mt-4 flex items-center hover:bg-blue-500'
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
