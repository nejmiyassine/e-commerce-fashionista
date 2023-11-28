import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// import Layout from '../layouts/Layout';

// <Layout>
const ChartSkeleton = () => {
    return (
        <div className='w-full flex flex-col lg:flex-row items-center justify-between gap-4 pt-4'>
            <div className='w-full lg:w-1/2 rounded-md p-4 shadow-sm bg-white dark:bg-primaryColor-deepDark'>
                <div className='flex justify-between items-center'>
                    <h3 className='text-md font-bold pb-2'>
                        <Skeleton count={1} />
                    </h3>
                </div>
                <Skeleton className='flex-2' height={210} />
            </div>
            <div className='w-full lg:w-1/2 rounded-md p-4 shadow-sm bg-white dark:bg-primaryColor-deepDark'>
                <div className='flex justify-between items-center'>
                    <h3 className='text-md font-bold pb-2'>
                        <Skeleton count={1} />
                    </h3>
                </div>
                <Skeleton className='flex-2' height={210} />
            </div>
        </div>
    );
};
{
    /* </Layout> */
}

export default ChartSkeleton;
