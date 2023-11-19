import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

const LoadingContent = ({ loadingState }) => {
    if (loadingState === 'loading' || loadingState === 'idle') {
        return <LoadingSpinner />;
    }

    return null;
};

export default LoadingContent;

LoadingContent.propTypes = {
    loadingState: PropTypes.string,
};
