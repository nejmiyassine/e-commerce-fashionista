import PropTypes from 'prop-types';

const FormatPrice = ({ price }) => <p className='font-semibold'>$ {price}</p>;

export default FormatPrice;

FormatPrice.propTypes = {
    price: PropTypes.number,
};
