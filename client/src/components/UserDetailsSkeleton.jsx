import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Layout from '../layouts/Layout';

const UserDetailsSkeleton = () => {
    return (
        <Layout>
            <div className='mt-2 rounded-md p-4 shadow-sm bg-white dark:bg-primaryColor-deepDark'>
                <div className='flex justify-between gap-4'>
                    <div className='flex flex-col flex-1 py-1'>
                        <p className='font-semibold p-1'>
                            <Skeleton width={`20%`} />
                        </p>
                        <p className='rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                            <Skeleton />
                        </p>
                    </div>
                    <div className='flex flex-col flex-1 py-1'>
                        <p className='font-semibold p-1'>
                            <Skeleton width={`20%`} />
                        </p>
                        <p className='rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                            <Skeleton />
                        </p>
                    </div>
                </div>

                <div className='flex justify-between gap-4'>
                    <div className='flex flex-col flex-1 py-1'>
                        <p className='font-semibold p-1'>
                            <Skeleton width={`20%`} />
                        </p>
                        <p className='flex justify-between items-center rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                            <span>
                                <Skeleton />
                            </span>
                            <span>
                                <Skeleton />
                            </span>
                        </p>
                    </div>
                    <div className='flex flex-col flex-1 py-1'>
                        <p className='font-semibold p-1'>
                            <Skeleton width={`20%`} />
                        </p>
                        <p className='flex justify-between items-center rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                            <Skeleton />
                        </p>
                    </div>
                </div>

                <div className='flex justify-between gap-4'>
                    <div className='flex flex-col flex-1 py-1'>
                        <p className='font-semibold p-1'>
                            <Skeleton width={`20%`} />
                        </p>
                        <p className='flex items-center rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                            <Skeleton />
                        </p>
                    </div>
                    <div className='flex flex-col flex-1 py-1'>
                        <p className='font-semibold p-1'>
                            <Skeleton width={`20%`} />
                        </p>
                        <p className='flex items-center gap-2 rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                            <Skeleton />
                        </p>
                    </div>
                </div>

                <div className='flex flex-col flex-1 py-1'>
                    <p className='font-semibold p-1'>
                        <Skeleton width={`20%`} />
                    </p>
                    <p className='flex items-center gap-2 rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                        <Skeleton />
                    </p>
                </div>

                <div className='flex justify-between gap-4'>
                    <div className='flex flex-col flex-1 py-1'>
                        <p className='font-semibold p-1'>
                            <Skeleton width={`20%`} />
                        </p>
                        <p className='flex items-center gap-2 rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                            <Skeleton />
                        </p>
                    </div>

                    <div className='flex flex-col flex-1 py-1'>
                        <p className='font-semibold p-1'>
                            <Skeleton width={`20%`} />
                        </p>
                        <p className='flex items-center gap-2 rounded-md border p-2 text-sm text-gray-500 dark:text-gray-100'>
                            <Skeleton />
                        </p>
                    </div>
                </div>

                <div>
                    <Skeleton />
                </div>
            </div>
        </Layout>
    );
};

export default UserDetailsSkeleton;
