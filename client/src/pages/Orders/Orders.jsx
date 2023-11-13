import React from 'react';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';

import { useGetAllOrdersQuery } from '../../app/api/ordersApi';
import Layout from '../../layouts/Layout';
import FormatDate from '../../components/FormatDate';
import { sliceText } from '../../utils/sliceText';
import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import { ChevronDownIcon, SearchIcon } from '../../icons/Icons';
import { capitalize } from '../../utils/capitalize';
import LoadingSpinner from '../../components/LoadingSpinner';
import { BiSolidCircle } from 'react-icons/bi';

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

const orderStatus = [
    { name: 'Pending', uid: 'pending' },
    { name: 'Processing', uid: 'processing' },
    { name: 'Shipped', uid: 'shipped' },
    { name: 'Delivered', uid: 'delivered' },
    { name: 'Refunded', uid: 'refunded' },
    { name: 'Canceled', uid: 'canceled' },
];

const statusColorMap = {
    pending: 'warning',
    processing: 'warning',
    shipped: 'success',
    delivered: 'success',
    refunded: 'danger',
    canceled: 'danger',
};

const Orders = () => {
    const { isLoading, isError, error, data: orders } = useGetAllOrdersQuery();
    const data = React.useMemo(() => (orders ? orders.orders : []), [orders]);
    const [filterValue, setFilterValue] = React.useState('');
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );
    const [statusFilter, setStatusFilter] = React.useState('all');
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: 'order_date',
        direction: 'ascending',
    });
    const [page, setPage] = React.useState(1);

    const pages = React.useMemo(() => {
        return data?.length ? Math.ceil(data.length / rowsPerPage) : 0;
    }, [data?.length, rowsPerPage]);

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
                    <p className='font-semibold'>{capitalize(cellValue[0])}</p>
                );

            case 'cart_total_price':
                return <p className='font-semibold'>$ {cellValue}</p>;

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
                return <FormatDate cellValue={cellValue} />;

            default:
                return cellValue;
        }
    }, []);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue('');
        }
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between gap-3 items-end'>
                    <Input
                        isClearable
                        classNames={{
                            base: 'w-full sm:max-w-[44%]',
                            inputWrapper: 'border-1',
                        }}
                        placeholder='Search by name...'
                        size='sm'
                        startContent={
                            <SearchIcon className='text-default-300' />
                        }
                        value={filterValue}
                        variant='bordered'
                        onClear={() => setFilterValue('')}
                        onValueChange={onSearchChange}
                    />
                    <div className='flex gap-3'>
                        <Dropdown>
                            <DropdownTrigger className='hidden sm:flex'>
                                <Button
                                    endContent={
                                        <ChevronDownIcon className='text-small' />
                                    }
                                    size='sm'
                                    variant='flat'
                                >
                                    Order Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label='Table Columns'
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode='multiple'
                                onSelectionChange={setStatusFilter}
                            >
                                {orderStatus.map((status) => (
                                    <DropdownItem
                                        key={status.uid}
                                        className='capitalize'
                                    >
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className='hidden sm:flex'>
                                <Button
                                    endContent={
                                        <ChevronDownIcon className='text-small' />
                                    }
                                    size='sm'
                                    variant='flat'
                                >
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label='Table Columns'
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode='multiple'
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem
                                        key={column.uid}
                                        className='capitalize'
                                    >
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='text-default-400 text-small'>
                        Total {data ? data.length : 0} orders
                    </span>
                    <label className='flex items-center text-default-400 text-small'>
                        Rows per page:
                        <select
                            className='bg-transparent outline-none text-default-400 text-small'
                            onChange={onRowsPerPageChange}
                        >
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value='15'>15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        data,
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className='py-2 px-2 flex justify-between items-center'>
                {pages > 0 ? (
                    <Pagination
                        showControls
                        classNames={{
                            cursor: 'bg-foreground text-background',
                        }}
                        color='default'
                        isDisabled={hasSearchFilter}
                        page={page}
                        total={pages}
                        variant='light'
                        onChange={setPage}
                    />
                ) : null}
                <span className='text-small text-default-400'>
                    {selectedKeys === 'all'
                        ? 'All items selected'
                        : `${selectedKeys.size} of ${
                              items?.length || 0
                          } selected`}
                </span>
            </div>
        );
    }, [selectedKeys, items, page, pages, hasSearchFilter]);

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
        <Layout>
            <div className='rounded-md p-4 shadow-sm bg-white dark:bg-primary-deepDark'>
                <h2 className='font-bold text-xl mb-4'>All Orders</h2>
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
                                align={
                                    column.uid === 'actions'
                                        ? 'center'
                                        : 'start'
                                }
                                allowsSorting={column.sortable}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        emptyContent={'No orders found'}
                        items={sortedItems ?? []}
                        loadingContent={<LoadingSpinner />}
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
        </Layout>
    );
};

export default Orders;
