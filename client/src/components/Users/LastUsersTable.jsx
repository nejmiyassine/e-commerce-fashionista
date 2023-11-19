import React from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';

import LoadingSpinner from '../LoadingSpinner';
import { sliceText } from '../../utils/sliceText';
import { useGetAllUsersQuery } from '../../app/api/usersApi';
import { roleColorMap } from '../../Constants/userTableConstants';

const columns = [
    { name: 'ID', uid: '_id' },
    { name: 'USERNAME', uid: 'username' },
    { name: 'ROLE', uid: 'role' },
];

const INITIAL_VISIBLE_COLUMNS = ['_id', 'username', 'role'];

const LastUsersTable = () => {
    const {
        isLoading,
        isFetching,
        isError,
        error,
        data: users,
    } = useGetAllUsersQuery();
    const data = React.useMemo(() => (users ? users : []), [users]);

    const loadingState =
        isLoading || isFetching || users?.length === 0 ? 'loading' : 'idle';

    const [visibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));

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
            <div className='flex items-center justify-between px-2 gap-4'>
                <h2 className='font-bold text-xl mb-4'>Last Users</h2>
                <span className='text-default-400 text-small'>
                    Total {data && data.length} users
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
        <Table
            isCompact
            removeWrapper
            aria-label='Last users table'
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
                        align={column.uid === 'actions' ? 'center' : 'start'}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent={'No users found'}
                items={data.slice(0, 5) ?? []}
                loadingContent={<LoadingSpinner />}
                loadingState={loadingState}
            >
                {(item) => (
                    <TableRow key={item._id}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default LastUsersTable;
