import React from 'react';
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
} from '@nextui-org/react';

import { useGetUsersQuery } from '../../app/services/usersApi';

import { PlusIcon } from '../../icons/PlusIcon';
import { VerticalDotsIcon } from '../../icons/VerticalDotsIcon';
import { SearchIcon } from '../../icons/SearchIcon';
import { ChevronDownIcon } from '../../icons/ChevronDownIcon';

import { capitalize } from '../../utils/capitalize';
import LoadingSpinner from '../LoadingSpinner';
import ErrorsBoundaries from '../ErrorsBoundaries';

const columns = [
    { name: 'ID', uid: '_id', sortable: true },
    { name: 'FIRSTNAME', uid: 'first_name', sortable: true },
    { name: 'LASTNAME', uid: 'last_name', sortable: true },
    { name: 'USERNAME', uid: 'username', sortable: true },
    { name: 'EMAIL', uid: 'email', sortable: true },
    { name: 'ROLE', uid: 'role', sortable: true },
    { name: 'LAST_LOGIN', uid: 'last_login', sortable: true },
    { name: 'LAST_UPDATE', uid: 'last_update', sortable: true },
    { name: 'ACTIONS', uid: 'actions' },
];

const roleColorMap = {
    admin: 'success',
    manager: 'warning',
};

const statusOptions = [
    { name: 'Admin', uid: 'admin' },
    { name: 'Manager', uid: 'manager' },
];

const INITIAL_VISIBLE_COLUMNS = ['username', 'role', '_id', 'actions'];

const UsersTableCopy = () => {
    const { error, isLoading, data } = useGetUsersQuery();

    console.log(data);

    const [filterValue, setFilterValue] = React.useState('');
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );
    const [statusFilter, setStatusFilter] = React.useState('all');
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: 'username',
        direction: 'ascending',
    });
    const [page, setPage] = React.useState(1);

    const pages = data && Math.ceil(data.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === 'all') return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = data;

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.username.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        if (
            statusFilter !== 'all' &&
            Array.from(statusFilter).length !== statusOptions.length
        ) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.role)
            );
        }

        return filteredUsers;
    }, [data, filterValue, statusFilter, hasSearchFilter]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        if (filteredItems) return filteredItems.slice(start, end);
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

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case 'username':
                return (
                    <User
                        avatarProps={{
                            radius: 'full',
                            size: 'sm',
                            src: user.avatar,
                        }}
                        classNames={{
                            description: 'text-default-500',
                        }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case 'role':
                return (
                    <Chip
                        className='capitalize'
                        color={roleColorMap[user.role.toLowerCase()]}
                        size='sm'
                        variant='flat'
                    >
                        {cellValue}
                    </Chip>
                );
            case 'status':
                return (
                    <Chip
                        className='capitalize border-none gap-1 text-default-600'
                        color={roleColorMap[user.role]}
                        size='sm'
                        variant='dot'
                    >
                        {cellValue}
                    </Chip>
                );
            case 'actions':
                return (
                    <div className='relative flex justify-end items-center gap-2'>
                        <Dropdown className='bg-background border-1 border-default-200'>
                            <DropdownTrigger>
                                <Button
                                    isIconOnly
                                    radius='full'
                                    size='sm'
                                    variant='light'
                                >
                                    <VerticalDotsIcon className='text-default-400' />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem>View</DropdownItem>
                                <DropdownItem>Edit</DropdownItem>
                                <DropdownItem>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
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
                                    Role
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
                                {statusOptions.map((status) => (
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
                        <Button
                            className='bg-foreground text-background'
                            endContent={<PlusIcon />}
                            size='sm'
                        >
                            Add New
                        </Button>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='text-default-400 text-small'>
                        Total {data && data.length} users
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

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorsBoundaries error={error} />;
    }

    return (
        <div className='rounded-md p-4 shadow-sm overflow-y-scroll bg-white dark:bg-primary-deepDark'>
            <h2 className='font-bold text-xl mb-4'>Last Users</h2>
            <Table
                isCompact
                removeWrapper
                aria-label='Example table with custom cells, pagination and sorting'
                bottomContent={bottomContent}
                bottomContentPlacement='outside'
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
                                column.uid === 'actions' ? 'center' : 'start'
                            }
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={'No users found'} items={sortedItems}>
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
    );
};

export default UsersTableCopy;
