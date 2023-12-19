import {
    Chip,
    Input,
    Spacer,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    User,
} from '@nextui-org/react';
import { useCallback, useMemo, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

import { useGetAllPaymentsQuery } from '../../../app/api/paymentsApi';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Layout from '../../../layouts/Layout';
import FormatDate from '../../../components/FormatDate';
import FormatPrice from '../../../components/FormatPrice';
import { sliceText } from '../../../utils/sliceText';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const columns = [
    { name: 'ID', uid: '_id' },
    { name: 'ORDER ID', uid: 'order_id' },
    { name: 'AMOUNT', uid: 'amount' },
    { name: 'EMAIL', uid: 'billing_details' },
    { name: 'PAYMENT DATE', uid: 'payment_date' },
    { name: 'Status', uid: 'status' },
];

const AdminTransactions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));

    const {
        data,
        isLoading: isLoadingPayment,
        isFetching: isFetchingPayment,
        isError,
        error,
    } = useGetAllPaymentsQuery();

    const payment = useMemo(() => (data ? data.payment : []), [data]);

    const filteredpayment = payment.filter((data) =>
        data?.billing_details?.email
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const topContent = useMemo(() => {
        return (
            <div className='container mx-auto'>
                <div className='flex justify-between items-center flex-col gap-2 md:flex-row mt-4 mb-4'>
                    <div>
                        <Input
                            variant='underlined'
                            type='text'
                            className='w-[250px] md:w-[350px]'
                            labelPlacement='outside'
                            placeholder='Search by email'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            endContent={
                                <CiSearch
                                    size={20}
                                    className='text-default-400'
                                />
                            }
                        />
                    </div>
                </div>
                <Spacer y={4} />
                <hr />
                <Spacer y={2} />
            </div>
        );
    }, [searchTerm]);

    const renderCell = useCallback((payment, columnKey) => {
        const cellValue = payment[columnKey];

        switch (columnKey) {
            case 'status':
                return (
                    <Chip
                        className='capitalize'
                        color='success'
                        size='sm'
                        variant='flat'
                    >
                        <div className='flex items-center gap-1'>
                            <FaCheck className='text-green-500' />
                            <p>{cellValue}</p>
                        </div>
                    </Chip>
                );

            case '_id':
                return (
                    <div>
                        <p className='text-gray-500 dark:text-gray-300'>
                            {sliceText(cellValue, 10)}
                        </p>
                    </div>
                );

            case 'order_id':
                return (
                    <Link
                        to={`/admin/orders/${cellValue}`}
                        className='text-gray-500 dark:text-gray-300'
                    >
                        {sliceText(cellValue, 10)}
                    </Link>
                );

            case 'name':
                return (
                    <div className='w-[250px] md:w-[400px] py-2 flex flex-col'>
                        <p className='font-semibold capitalize'>{cellValue}</p>
                    </div>
                );

            case 'amount':
                return <FormatPrice price={cellValue} />;

            case 'payment_date':
                return <FormatDate cellValue={cellValue} />;

            case 'billing_details':
                return (
                    <User
                        avatarProps={{
                            radius: 'full',
                            size: 'sm',
                            src: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
                        }}
                        classNames={{
                            description: 'text-default-500',
                        }}
                        description={cellValue.phone}
                        name={cellValue.email}
                    >
                        {cellValue.email}
                    </User>
                );

            default:
                return cellValue;
        }
    }, []);

    const classNames = useMemo(
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

    if (isLoadingPayment || isFetchingPayment) return <LoadingSpinner />;

    if (isError) {
        console.error('Something went wrong: ', error);
    }


    return (
        <Layout>
            <div className='rounded-md p-4 shadow-sm bg-white dark:bg-primaryColor-deepDark'>
                <h2 className='font-bold text-xl mb-4'>
                    All Payments Transactions
                </h2>

                <Table
                    isCompact
                    removeWrapper
                    bottomContentPlacement='outside'
                    checkboxesProps={{
                        classNames: {
                            wrapper:
                                'after:bg-foreground after:text-background text-background',
                        },
                    }}
                    classNames={classNames}
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                    selectionMode='multiple'
                    loading={isLoadingPayment || isFetchingPayment}
                    topContent={topContent}
                    aria-label='Example table with custom cells'
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={
                                    column.uid === 'actions'
                                        ? 'center'
                                        : 'start'
                                }
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        emptyContent={"There's payment found"}
                        items={filteredpayment}
                    >
                        {(item) => (
                            <TableRow key={item._id} className='py-2'>
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
        </Layout>
    );
};

export default AdminTransactions;
