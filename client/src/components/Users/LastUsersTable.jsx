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
    Chip,
    User,
} from '@nextui-org/react';
import { ChevronDownIcon } from '../../icons/ChevronDownIcon';
import { columns, users } from '../../data/lastUsersTableData';
import { capitalize } from '../../utils/capitalize';

const statusColorMap = {
    active: 'success',
    paused: 'danger',
    vacation: 'warning',
};

const INITIAL_VISIBLE_COLUMNS = ['username', 'role', 'status', 'actions'];

const LastUsersTable = () => {
    const [visibleColumns, setVisibleColumns] = React.useState(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );

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
                    <div className='flex flex-col'>
                        <p className='text-bold text-small capitalize'>
                            {cellValue}
                        </p>
                        <p className='text-bold text-tiny capitalize text-default-500'>
                            {user.team}
                        </p>
                    </div>
                );
            case 'status':
                return (
                    <Chip
                        className='capitalize border-none gap-1 text-default-600'
                        color={statusColorMap[user.status]}
                        size='sm'
                        variant='dot'
                    >
                        {cellValue}
                    </Chip>
                );
            default:
                return cellValue;
        }
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between gap-3 items-end'>
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
                        Total {users.length} users
                    </span>
                </div>
            </div>
        );
    }, [visibleColumns]);

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
                <TableBody emptyContent={'No users found'} items={users}>
                    {(item) => (
                        <TableRow key={item.id}>
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
