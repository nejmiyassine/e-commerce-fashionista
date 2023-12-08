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
import { deleteCustomersorders } from '../../features/orders/ordersSlice';
import { useDispatch } from 'react-redux';

export default function CustomersOrders({ orders }) {
    console.log('ordersCstomers', orders);
    const dispatch = useDispatch();

    return (
        <>
            <Table>
                <TableHeader>
                    <TableColumn className='font-bold' key='name'>PRODUCT_NAME</TableColumn>
                    <TableColumn className='font-bold'key='role'>PRICE</TableColumn>
                    <TableColumn className='font-bold' key='status'>STATUS</TableColumn>
                    <TableColumn className='font-bold' key='sta'>ACTIONS</TableColumn>
                </TableHeader>

                <TableBody>
                    {orders &&
                        orders.map((order) => (
                            <TableRow key = {order._id}>
                                <TableCell  >{order.order_items[0]}</TableCell>

                                <TableCell >{order.cart_total_price}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                    <Button className='mr-2 bg-primary text-white font-semibold '>
                                        Complete
                                    </Button>
                                    <Button
                                        onCLick={() => {
                                            dispatch(
                                                deleteCustomersorders({
                                                    ordersId: order._id,
                                                })
                                            );
                                        }}
                                        type='submit'
                                        className='bg-danger text-white font-semibold'
                                    >
                                        Cancel
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    );
}
