import { Spinner } from '@nextui-org/react';

const LoadingSpinner = () => {
    return (
        <div className='flex justify-center items-center'>
            <Spinner
                size='lg'
                color='success'
                label='Loading...'
                labelColor='success'
            />
        </div>
    );
};

export default LoadingSpinner;
