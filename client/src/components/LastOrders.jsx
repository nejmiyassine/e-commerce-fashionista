import React from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';
import { BiSolidCircle } from 'react-icons/bi';

import { useGetAllOrdersQuery } from '../app/api/ordersApi';
import LoadingSpinner from './LoadingSpinner';
import { formatDateFromNow } from '../utils/formatDate';

const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'PRICE', uid: 'price' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ORDER DATE', uid: 'order_date' },
];

const statusColorMap = {
    pending: 'warning',
    processing: 'warning',
    shipped: 'success',
    delivered: 'success',
    refunded: 'danger',
    canceled: 'danger',
};

const LastOrders = () => {
    const { isLoading, isError, error, data: orders } = useGetAllOrdersQuery();
    const data = React.useMemo(() => (orders ? orders.orders : []), [orders]);
    // Status of orders [pending, shipped, fulfilled, canceled, refunded]
    const loadingState = isLoading || data?.length === 0 ? 'loading' : 'idle';

    React.useEffect(() => {
        if (isError) {
            const err = error;
            const resMessage =
                err.data?.message ||
                err.data?.detail ||
                err?.message ||
                err.toString();
            toast.error(resMessage, {
                position: 'top-right',
            });
            NProgress.done();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    const renderCell = React.useCallback((order, columnKey) => {
        const cellValue = order[columnKey];

        switch (columnKey) {
            case 'name':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize'>
                            {order.order_items[0]}
                        </p>
                    </div>
                );

            case 'price':
                return (
                    <div className=''>
                        <p className=''>${order.cart_total_price}</p>
                    </div>
                );

            case 'status':
                return (
                    <Chip
                        className='capitalize'
                        color={statusColorMap[order.status.toLowerCase()]}
                        size='sm'
                        variant='flat'
                    >
                        <div className='flex items-center gap-1'>
                            <BiSolidCircle size={8} />
                            <p>{cellValue}</p>
                        </div>
                    </Chip>
                );

            case 'order_date':
                return (
                    <div className='text-sm italic'>
                        <p>{formatDateFromNow(cellValue)}</p>
                    </div>
                );

            default:
                return cellValue;
        }
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className='flex items-center justify-between gap-4'>
                <div>
                    <span className='text-default-400 text-small'>
                        Total {data && data.length} orders
                    </span>
                </div>
            </div>
        );
    }, [data]);

    const classNames = React.useMemo(
        () => ({
            wrapper: ['max-h-[382px]', 'max-w-3xl'],
            th: [
                'bg-transparent',
                'text-default-500',
                'border-b',
                'border-divider',
            ],
            td: [
                // changing the rows border radius
                // first
                'group-data-[first=true]:first:before:rounded-none py-3',
                'group-data-[first=true]:last:before:rounded-none py-3',
                // middle
                'group-data-[middle=true]:before:rounded-none py-3',
                // last
                'group-data-[last=true]:first:before:rounded-none py-3',
                'group-data-[last=true]:last:before:rounded-none py-3',
            ],
        }),
        []
    );

    return (
        <>
            <h2 className='font-bold text-xl mb-4'>Last Orders</h2>

            <Table
                aria-label='Last orders table'
                className='overflow-y-hidden'
                isCompact
                removeWrapper
                classNames={classNames}
                topContent={topContent}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={
                                column.uid === 'actions' ? 'center' : 'start'
                            }
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    emptyContent={'No order found'}
                    items={data ?? []}
                    loadingContent={<LoadingSpinner />}
                    loadingState={loadingState}
                >
                    {(order) => (
                        <TableRow key={order._id}>
                            {(columnKey) => (
                                <TableCell>
                                    {renderCell(order, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
};

export default LastOrders;
