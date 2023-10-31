import PropTypes from 'prop-types';

const ErrorsBoundaries = ({ error }) => {
    return (
        <p className='rounded-md p-4 text-sm text-white bg-red-500'>{error}</p>
    );
};

export default ErrorsBoundaries;

ErrorsBoundaries.propTypes = {
    error: PropTypes.string,
};
