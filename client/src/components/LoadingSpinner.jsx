import PropTypes from 'prop-types';
import { Spinner } from '@nextui-org/react';

const LoadingSpinner = ({ size = 'lg' }) => {
    return (
        <div className='flex justify-center items-center'>
            <Spinner size={size} />
        </div>
    );
};

export default LoadingSpinner;

LoadingSpinner.propTypes = {
    size: PropTypes.string,
};
