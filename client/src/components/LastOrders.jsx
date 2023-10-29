import React from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
} from '@nextui-org/react';
import { columns, users } from '../data/ordersData';

const LastOrders = () => {
    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case 'name':
                return (
                    <User
                        avatarProps={{ radius: 'lg', src: user.productImg }}
                        description={user.date}
                        name={cellValue}
                    >
                        {user.date}
                    </User>
                );
            case 'price':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize'>
                            {cellValue}
                        </p>
                    </div>
                );

            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <h2 className='font-bold text-xl mb-4'>Last Orders</h2>

            <Table aria-label='Example table with custom cells'>
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
                <TableBody items={users}>
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

export default LastOrders;
