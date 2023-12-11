/* eslint-disable react/prop-types */
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/react';
import { Link } from 'react-router-dom';

import LoadingSpinner from '../LoadingSpinner';
import FormatDate from '../FormatDate';
import FormatPrice from '../FormatPrice';
import OrderStatusChip from '../OrderStatusChip';

import { useGetCustomersOrdersQuery } from '../../app/api/ordersApi';

export default function CustomersOrders() {
    const {
        data: customerOrders,
        isLoading,
        isError,
        error,
    } = useGetCustomersOrdersQuery();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isLoading && isError) {
        return <div>Error: {error}</div>;
    }

    console.log(customerOrders.orders);

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
                    {!isLoading || customerOrders ? (
                        customerOrders.orders.map((order) => (
                            <TableRow key={`${order._id}`}>
                                <TableCell>
                                    {order.order_items.map((item) => (
                                        <div key={item.product_name}>
                                            <p>{item.product_name}</p>
                                        </div>
                                    ))}
                                </TableCell>
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
                        ))
                    ) : (
                        <div>
                            <p>There are no orders yet!</p>
                            <Link to='/shop'>Start Shopping.</Link>
                        </div>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
