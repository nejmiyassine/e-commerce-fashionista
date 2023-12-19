/* eslint-disable react/prop-types */
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Image,
} from '@nextui-org/react';

import LoadingSpinner from '../LoadingSpinner';
import FormatDate from '../FormatDate';
import FormatPrice from '../FormatPrice';
import OrderStatusChip from '../OrderStatusChip';

import { useGetCustomersOrdersQuery } from '../../app/api/ordersApi';
import LoadingContent from '../LoadingContent';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

const columns = [
    { name: 'ID', uid: '_id' },
    { name: 'NAME', uid: 'order_items' },
    { name: 'PRICE', uid: 'cart_total_price', sortable: true },
    { name: 'STATUS', uid: 'status' },
    { name: 'ORDER DATE', uid: 'order_date', sortable: true },
];

export default function CustomersOrders() {
    const {
        data: customerOrders,
        isLoading,
        isError,
        error,
    } = useGetCustomersOrdersQuery();

    const loadingState =
        isLoading ||
        customerOrders === undefined ||
        customerOrders?.orders?.length === 0
            ? 'loading'
            : 'idle';

    const renderCell = useCallback((order, columnKey) => {
        const cellValue = order[columnKey];
        switch (columnKey) {
            case '_id':
                return (
                    <div>
                        <p className='text-gray-500 dark:text-gray-300'>
                            {(cellValue, 10)}
                            {/* {sliceText(cellValue, 10)} */}
                        </p>
                    </div>
                );

            case 'order_items':
                return (
                    <Link
                        to={`/admin/orders/${order['_id']}`}
                        className='flex items-center gap-2'
                    >
                        <Image
                            className='w-10 h-10'
                            src={cellValue[0].product_images[0]}
                            alt={cellValue[0].product_name}
                        />
                        <p className='font-semibold'>
                            {cellValue[0].product_name}
                            {/* {capitalize(cellValue[0].product_name)} */}
                        </p>
                    </Link>
                );

            case 'cart_total_price':
                return <FormatPrice price={order.cart_total_price} />;

            case 'status':
                return <OrderStatusChip status={order.status} />;

            case 'order_date':
                return <FormatDate cellValue={cellValue} />;

            default:
                return cellValue;
        }
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isLoading && isError) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='container mx-auto'>
            <Table>
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={
                                column.uid === 'actions' ? 'center' : 'start'
                            }
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    emptyContent={'No orders found'}
                    items={customerOrders?.orders ?? []}
                    loadingContent={
                        <LoadingContent loadingState={loadingState} />
                    }
                    loadingState={loadingState}
                >
                    {(item) => (
                        <TableRow key={item?._id}>
                            {(columnKey) => (
                                <TableCell key={columnKey}>
                                    {renderCell(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
