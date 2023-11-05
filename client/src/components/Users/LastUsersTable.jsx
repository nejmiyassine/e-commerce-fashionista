import React from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    User,
    Chip,
} from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllUsers } from '../../features/usersSlice';
import { ChevronDownIcon } from '../../icons/ChevronDownIcon';
import { capitalize } from '../../utils/capitalize';
import LoadingSpinner from '../LoadingSpinner';
import ErrorsBoundaries from '../ErrorsBoundaries';
import { sliceText } from '../../utils/sliceText';

const columns = [
    { name: 'ID', uid: '_id' },
    { name: 'USERNAME', uid: 'username' },
    { name: 'ROLE', uid: 'role' },
];

const roleColorMap = {
    admin: 'success',
    manager: 'warning',
};

const INITIAL_VISIBLE_COLUMNS = ['_id', 'username', 'role'];

const LastUsersTable = () => {
    const dispatch = useDispatch();
    const { error, isLoading, users } = useSelector((state) => state.users);
    const data = React.useMemo(() => (users ? users : []), [users]);

    const [visibleColumns, setVisibleColumns] = React.useState(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );

    React.useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    console.log(data);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === 'all') return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case 'username':
                return (
                    <User
                        avatarProps={{
                            radius: 'full',
                            size: 'sm',
                            src: user.avatar
                                ? user.avatar
                                : 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
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
            case '_id':
                return (
                    <div>
                        <p className='text-gray-500'>
                            {sliceText(cellValue, 10)}
                        </p>
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
                        Total {data && data.length} users
                    </span>
                </div>
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
        );
    }, [data, visibleColumns]);

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
        return <ErrorsBoundaries />;
    }

    return (
        <>
            <h2 className='font-bold text-xl mb-4'>Last Users</h2>

            <Table
                isCompact
                removeWrapper
                aria-label='Example table with custom cells'
                checkboxesProps={{
                    classNames: {
                        wrapper:
                            'after:bg-foreground after:text-background text-background',
                    },
                }}
                classNames={classNames}
                selectionMode='multiple'
                topContent={topContent}
                topContentPlacement='outside'
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
                <TableBody
                    emptyContent={'No users found'}
                    items={data.slice(0, 5)}
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
        </>
    );
};

export default LastUsersTable;
