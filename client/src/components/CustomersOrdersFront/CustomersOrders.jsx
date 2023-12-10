/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/react';

import { getCustomersOrders } from '../../features/orders/ordersSlice';
import LoadingSpinner from '../LoadingSpinner';
import FormatDate from '../FormatDate';
import FormatPrice from '../FormatPrice';
import OrderStatusChip from '../OrderStatusChip';

export default function CustomersOrders() {
    const dispatch = useDispatch();

    const { loading, ordersData, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(getCustomersOrders());
    }, [dispatch]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!loading && error) {
        return <div>Error: {error}</div>;
    }

    const customerOrders = ordersData.orders;

    return (
        <div className='container mx-auto'>
            <Table>
                <TableHeader>
                    <TableColumn className='font-bold' key='name'>
                        PRODUCT_NAME
                    </TableColumn>
                    <TableColumn className='font-bold' key='role'>
                        PRICE
                    </TableColumn>
                    <TableColumn className='font-bold' key='status'>
                        STATUS
                    </TableColumn>
                    <TableColumn className='font-bold' key='date'>
                        DATE
                    </TableColumn>
                </TableHeader>

                <TableBody>
                    {customerOrders &&
                        customerOrders.map((order) => (
                            <TableRow key={`${order._id}`}>
                                <TableCell>{order.order_items[0]}</TableCell>
                                <TableCell>
                                    <FormatPrice
                                        price={order.cart_total_price}
                                    />
                                </TableCell>
                                <TableCell>
                                    <OrderStatusChip status={order.status} />
                                </TableCell>
                                <TableCell>
                                    <FormatDate date={order.order_date} />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}
