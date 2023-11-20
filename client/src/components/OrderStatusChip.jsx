import PropTypes from 'prop-types';
import { Chip } from '@nextui-org/react';
import { orderStatus, statusColorMap } from '../Constants/ordersConstant';

const OrderStatusChip = ({ status }) => {
    const statusInfo = orderStatus.find(
        (o) => o.uid.toLowerCase() === status.toLowerCase()
    );

    return (
        <div>
            <Chip
                className='capitalize'
                color={statusColorMap[status.toLowerCase()]}
                size='sm'
                variant='flat'
            >
                <div className='flex items-center gap-1'>
                    {statusInfo.icon}
                    <p>{status}</p>
                </div>
            </Chip>
        </div>
    );
};

export default OrderStatusChip;

OrderStatusChip.propTypes = {
    status: PropTypes.string,
};
