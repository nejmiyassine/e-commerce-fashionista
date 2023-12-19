import React from 'react';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';

import {
    Image,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import { useGetAllOrdersQuery } from '../../app/api/ordersApi';
import FormatDate from '../FormatDate';
import { capitalize } from '../../utils/capitalize';
import { sliceText } from '../../utils/sliceText';

import FormatPrice from '../FormatPrice';
import OrderStatusChip from '../OrderStatusChip';
import { orderStatus } from '../../Constants/ordersConstant';
import LoadingContent from '../LoadingContent';

const INITIAL_VISIBLE_COLUMNS = [
    '_id',
    'order_items',
    'cart_total_price',
    'status',
    'order_date',
];

const columns = [
    { name: 'ID', uid: '_id' },
    { name: 'NAME', uid: 'order_items' },
    { name: 'PRICE', uid: 'cart_total_price', sortable: true },
    { name: 'STATUS', uid: 'status' },
    { name: 'ORDER DATE', uid: 'order_date', sortable: true },
];

import useTableFeatures from '../../hooks/useTableFeatures';
import TableTopContent from '../TableTopContent';
import TableBottomContent from '../TableBottomContent';
import { Link } from 'react-router-dom';

const OrdersTable = () => {
    const { isLoading, isError, error, data: orders } = useGetAllOrdersQuery();

    const data = React.useMemo(() => (orders ? orders.orders : []), [orders]);

    const {
        filterValue,
        setFilterValue,
        selectedKeys,
        setSelectedKeys,
        visibleColumns,
        setVisibleColumns,
        statusFilter,
        setStatusFilter,
        rowsPerPage,
        sortDescriptor,
        setSortDescriptor,
        page,
        setPage,
        pages,
        onRowsPerPageChange,
        onSearchChange,
    } = useTableFeatures(INITIAL_VISIBLE_COLUMNS, columns, data);

    const loadingState = isLoading || data?.length === 0 ? 'loading' : 'idle';

    React.useEffect(() => {
        if (isError) {
            NProgress.done();
            const err = error;
            if (Array.isArray(err.data.error)) {
                err.data.error.forEach((el) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                const resMessage =
                    err.data.message ||
                    err.data.detail ||
                    err.message ||
                    err.toString();
                toast.error(resMessage, {
                    position: 'top-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === 'all') return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredOrders = data;

        if (hasSearchFilter && Array.isArray(filteredOrders)) {
            filteredOrders = filteredOrders.filter((order) =>
                order.order_items[0]
                    .toLowerCase()
                    .includes(filterValue.toLowerCase())
            );
        }

        if (
            statusFilter !== 'all' &&
            Array.from(statusFilter).length !== orderStatus.length &&
            Array.isArray(filteredOrders)
        ) {
            filteredOrders = filteredOrders.filter((order) =>
                Array.from(statusFilter).includes(order.status)
            );
        }

        return filteredOrders;
    }, [data, filterValue, statusFilter, hasSearchFilter]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        if (Array.isArray(filteredItems))
            return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        if (items)
            return items.sort((a, b) => {
                const first = a[sortDescriptor.column];
                const second = b[sortDescriptor.column];
                const cmp = first < second ? -1 : first > second ? 1 : 0;

                return sortDescriptor.direction === 'descending' ? -cmp : cmp;
            });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((order, columnKey) => {
        const cellValue = order[columnKey];
        switch (columnKey) {
            case '_id':
                return (
                    <div>
                        <p className='text-gray-500 dark:text-gray-300'>
                            {sliceText(cellValue, 10)}
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
                            {capitalize(cellValue[0].product_name)}
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

    const topContent = React.useMemo(() => {
        return (
            <TableTopContent
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                visibleColumns={visibleColumns}
                setVisibleColumns={setVisibleColumns}
                onSearchChange={onSearchChange}
                onRowsPerPageChange={onRowsPerPageChange}
                statusOptions={orderStatus}
                columns={columns}
                loading={isLoading}
                data={data}
                isUser={false}
            />
        );
    }, [
        filterValue,
        setFilterValue,
        statusFilter,
        setStatusFilter,
        visibleColumns,
        setVisibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        isLoading,
        data,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <TableBottomContent
                pages={pages}
                hasSearchFilter={hasSearchFilter}
                selectedKeys={selectedKeys}
                items={items}
                page={page}
                setPage={setPage}
            />
        );
    }, [pages, hasSearchFilter, selectedKeys, items, page, setPage]);

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
                'group-data-[first=true]:first:before:rounded-none py-2',
                'group-data-[first=true]:last:before:rounded-none py-2',
                // middle
                'group-data-[middle=true]:before:rounded-none py-2',
                // last
                'group-data-[last=true]:first:before:rounded-none py-2',
                'group-data-[last=true]:last:before:rounded-none py-2',
            ],
        }),
        []
    );

    return (
        <Table
            isCompact
            removeWrapper
            aria-label='Example table with custom cells, pagination and sorting'
            bottomContent={bottomContent}
            bottomContentPlacement='outside'
            className='overflow-hidden'
            checkboxesProps={{
                classNames: {
                    wrapper:
                        'after:bg-foreground after:text-background text-background',
                },
            }}
            classNames={classNames}
            selectedKeys={selectedKeys}
            selectionMode='multiple'
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement='outside'
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === 'actions' ? 'center' : 'start'}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent={'No orders found'}
                items={sortedItems ?? []}
                loadingContent={<LoadingContent loadingState={loadingState} />}
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
    );
};

export default OrdersTable;
