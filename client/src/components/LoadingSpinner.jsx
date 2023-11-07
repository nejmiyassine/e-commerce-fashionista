import { Spinner } from '@nextui-org/react';

const LoadingSpinner = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <Spinner
                size='lg'
                color='warning'
                label='Loading...'
                labelColor='warning'
            />
        </div>
    );
};

export default LoadingSpinner;
