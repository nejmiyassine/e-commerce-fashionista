import { Spinner } from '@nextui-org/react';
// import DashboardSkeleton from './DashboardSkeleton';

const LoadingSpinner = () => {
    return (
        <div className='flex justify-center items-center'>
            <Spinner size='lg' />
            {/* <DashboardSkeleton /> */}
        </div>
    );
};

export default LoadingSpinner;
