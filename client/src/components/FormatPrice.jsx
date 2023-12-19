import PropTypes from 'prop-types';

const FormatPrice = ({ price }) => (
    <p className='text-sm font-medium'>${price}</p>
);

export default FormatPrice;

FormatPrice.propTypes = {
    price: PropTypes.number,
};
