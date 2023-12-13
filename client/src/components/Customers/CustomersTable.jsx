import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    useDisclosure,
} from '@nextui-org/react';

import { SearchIcon } from '../../icons/SearchIcon';
import { ChevronDownIcon } from '../../icons/ChevronDownIcon';

import { capitalize } from '../../utils/capitalize';
import EditCustomer from './EditCustomer';
import { useDispatch } from 'react-redux';
import { deleteCustomer } from '../../features/customers/customersSlice';
import { toast } from 'react-toastify';
import { MdDelete, MdEdit, MdVerified, MdVisibility } from 'react-icons/md';
import { sliceText } from '../../utils/sliceText';
import { PiColumnsBold } from 'react-icons/pi';

const columns = [
    { name: 'ID', uid: '_id', sortable: true },
    { name: 'FIRSTNAME', uid: 'first_name', sortable: true },
    { name: 'LASTNAME', uid: 'last_name', sortable: true },
    { name: 'EMAIL', uid: 'email', sortable: true },
    { name: 'LAST_LOGIN', uid: 'last_login', sortable: true },
    { name: 'CREATION_DATE', uid: 'creation_date', sortable: true },

    { name: 'VALID_ACCOUNT', uid: 'valid_account' },
    { name: 'ACTIVE', uid: 'active' },
    { name: 'ACTIONS', uid: 'actions' },
];

const verificationOptions = [
    { name: 'VERIFIED', uid: 'verified' },
    { name: 'UNVERIFIED', uid: 'unverified' },
];

const INITIAL_VISIBLE_COLUMNS = [
    'email',
    'first_name',
    '_id',
    'active_account',
    'active',
    'actions',
];

const CustomersTable = ({ data, error, loading }) => {
    const { isOpen, onOpenChange } = useDisclosure();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [updatedCustomer, setUpdatedCustomer] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));

    const [visibleColumns, setVisibleColumns] = useState(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );

    const [statusFilter, setStatusFilter] = useState('all');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: 'email',
        direction: 'ascending',
    });

    const [page, setPage] = useState(1);

    const pages = data && Math.ceil(data.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns === 'all') return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredCustomers = data;

        // for searching filter
        if (hasSearchFilter) {
            filteredCustomers = filteredCustomers.filter((customer) =>
                customer.email.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        //for verification email
        if (
            (statusFilter !== 'all') &
            (Array.from(statusFilter).length !== verificationOptions.length)
        ) {
            filteredCustomers = filteredCustomers.filter((customer) =>
                Array.from(statusFilter).includes(
                    customer.valid_account ? 'verified' : 'unverified'
                )
            );
        }

        return filteredCustomers;
    }, [data, filterValue, statusFilter, hasSearchFilter]);

    // rows per page
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        if (filteredItems) return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    //sorting
    const sortedItems = React.useMemo(() => {
        if (items)
            return items.sort((a, b) => {
                const first = a[sortDescriptor.column];
                const second = b[sortDescriptor.column];
                const cmp = first < second ? -1 : first > second ? 1 : 0;

                return sortDescriptor.direction === 'descending' ? -cmp : cmp;
            });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback(
        (customer, columnKey) => {
            const cellValue = customer[columnKey];

            const handleUpdate = () => {
                setUpdatedCustomer(customer);
                onOpenChange(true);
            };

            const handleDelete = () => {
                if (
                    window.confirm(
                        'Are you sure you want to delete this customer?'
                    )
                ) {
                    dispatch(
                        deleteCustomer({
                            customerId: customer._id,
                        })
                    );
                    toast.success('Customer is deleted successfully');
                    navigate('/admin/customers');
                }
            };

            switch (columnKey) {
                case '_id':
                    return (
                        <div>
                            <p className='text-gray-500 dark:text-gray-300'>
                                {sliceText(cellValue, 10)}
                            </p>
                        </div>
                    );
                case 'email':
                    return (
                        <User
                            avatarProps={{
                                radius: 'full',
                                size: 'sm',
                                src: customer.avatar
                                    ? customer.avatar
                                    : 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
                            }}
                            classNames={{
                                description: 'text-default-500',
                            }}
                            description={customer.email}
                            name={cellValue}
                        >
                            {customer.email}
                        </User>
                    );

                case 'valid_account':
                    return (
                        <Chip
                            className='capitalize'
                            color={`${
                                customer.valid_account ? 'success' : 'danger'
                            }`}
                            size='sm'
                            variant='flat'
                        >
                            {cellValue ? 'Verified' : 'Unverified'}
                        </Chip>
                    );

                case 'actions':
                    return (
                        <div className='relative flex justify-start items-center gap-2'>
                            <button onClick={handleUpdate}>
                                <MdEdit size={18} className='text-green-500' />
                            </button>

                            <button>
                                <Link to={`/admin/customers/${customer._id}`}>
                                    <MdVisibility
                                        size={18}
                                        className='text-blue-500'
                                    />
                                </Link>
                            </button>

                            <button onClick={handleDelete}>
                                <MdDelete size={18} className='text-rose-500' />
                            </button>
                        </div>
                    );

                case 'active':
                    return (
                        <Chip
                            className='capitalize'
                            color={`${customer.active ? 'success' : 'danger'}`}
                            size='sm'
                            variant='flat'
                        >
                            {cellValue ? 'Active' : 'Inactive'}
                        </Chip>
                    );

                default:
                    return cellValue;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onOpenChange]
    );

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
                    {/* search input */}
                    <Input
                        isClearable
                        classNames={{
                            base: 'w-full sm:max-w-[44%]',
                            inputWrapper: 'border-1',
                        }}
                        placeholder='Search by email...'
                        labelPlacement='outside'
                        size='sm'
                        startContent={
                            <SearchIcon className='text-default-300' />
                        }
                        value={filterValue}
                        variant='bordered'
                        onClear={() => setFilterValue('')}
                        onValueChange={onSearchChange}
                    />

                    {/* valid Account */}
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
                                    <MdVerified
                                        className='text-[#0095F6]'
                                        size={16}
                                    />
                                    Valid Account
                                </Button>
                            </DropdownTrigger>

                            {/* verified & unverified */}
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label='Table Columns'
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode='multiple'
                                onSelectionChange={setStatusFilter}
                            >
                                {verificationOptions.map((status) => (
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
                                    <PiColumnsBold size={16} />
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

                {/* total customers & rows per page */}
                <div className='flex justify-between items-center'>
                    <span className='text-default-400 text-small'>
                        Total {data && data.length} customers
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

    // pagination selectedItems
    const bottomContent = React.useMemo(() => {
        const itemsLength = items && items.length;
        return (
            <div className='py-2 px-2 flex justify-between items-center'>
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

                {/* selected Items */}
                <span className='text-small text-default-400'>
                    {selectedKeys === 'all'
                        ? 'All items selected'
                        : `${selectedKeys.size} of ${itemsLength} selected`}
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
                'group-data-[first=true]:first:before:rounded-none',
                'group-data-[first=true]:last:before:rounded-none',
                // middle
                'group-data-[middle=true]:before:rounded-none',
                // last
                'group-data-[last=true]:first:before:rounded-none',
                'group-data-[last=true]:last:before:rounded-none',
            ],
        }),
        []
    );

    if (loading) {
        return <div>loading.....</div>;
    }

    if (!loading && error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <EditCustomer
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                updatedCustomer={updatedCustomer}
            />

            <div className='rounded-md p-4 shadow-sm overflow-x-hidden bg-white dark:bg-primaryColor-deepDark'>
                <h2 className='font-bold text-xl mb-4'>Customers</h2>

                <Table
                    isCompact
                    removeWrapper
                    aria-label='Example table with custom cells, pagination and sorting'
                    //bottom content of pagination styling
                    bottomContent={bottomContent}
                    bottomContentPlacement='outside'
                    //checkboxes styling
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
                        emptyContent={'No customers found'}
                        items={sortedItems}
                    >
                        {(item) => (
                            <TableRow key={item._id}>
                                {(columnKey) => (
                                    <TableCell>
                                        {renderCell(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default CustomersTable;

CustomersTable.propTypes = {
    data: PropTypes.any,
    loading: PropTypes.bool,
    error: PropTypes.string,
};
