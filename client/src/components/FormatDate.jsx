import { formatDate } from '../utils/formatDate';
import PropTypes from 'prop-types';

const FormatDate = ({ cellValue }) => {
    return (
        <div>
            <p className=''>{formatDate(cellValue)}</p>
        </div>
    );
};

export default FormatDate;

FormatDate.propTypes = {
    cellValue: PropTypes.string,
};
