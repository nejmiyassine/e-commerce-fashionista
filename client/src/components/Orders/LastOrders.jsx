import React from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';

import { useGetAllOrdersQuery } from '../../app/api/ordersApi';
import { formatDateFromNow } from '../../utils/formatDate';

import OrderStatusChip from '../OrderStatusChip';
import FormatPrice from '../FormatPrice';
import LoadingContent from '../LoadingContent';

import { sliceText } from '../../utils/sliceText';

const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'PRICE', uid: 'price' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ORDER DATE', uid: 'order_date' },
];

const LastOrders = () => {
    const { isLoading, isError, error, data: orders } = useGetAllOrdersQuery();

    const data = React.useMemo(() => (orders ? orders.orders : []), [orders]);

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
                            {sliceText(order.order_items[0], 10)}
                        </p>
                    </div>
                );

            case 'price':
                return <FormatPrice price={order.cart_total_price} />;

            case 'status':
                return <OrderStatusChip status={order.status} />;

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
            <div className='flex items-center justify-between px-2 gap-4 mb-2'>
                <h2 className='font-bold text-xl'>Last orders</h2>
                <span className='text-default-400 text-small'>
                    Total {data && data.length} orders
                </span>
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
        <Table
            aria-label='Last orders table'
            className='overflow-x-hidden'
            isCompact
            removeWrapper
            classNames={classNames}
            topContent={topContent}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === 'actions' ? 'center' : 'start'}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent={'No order found'}
                items={data.slice(0, 5) ?? []}
                loadingContent={<LoadingContent loadingState={loadingState} />}
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
    );
};

export default LastOrders;
