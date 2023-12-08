import React from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from '@nextui-org/react';

import FormatDate from '../FormatDate';

export default function CustomersOrders({ orders }) {
    console.log('ordersCstomers', orders);

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
                    <TableColumn className='font-bold' key='status'>
                        DATE
                    </TableColumn>
                </TableHeader>

                <TableBody>
                    {orders &&
                        orders.map((order) => (
                            <TableRow key={`${order._id}`}>
                                <TableCell>
                                    {order.order_items.map((item) => item)}
                                </TableCell>

                                <TableCell>{order.cart_total_price}</TableCell>
                                <TableCell>{order.status}</TableCell>
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
