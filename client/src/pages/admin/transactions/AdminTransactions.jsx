import {
    Input,
    Spacer,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import { useCallback, useMemo, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

import { useGetAllPaymentsQuery } from '../../../app/api/paymentsApi';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Layout from '../../../layouts/Layout';
import FormatDate from '../../../components/FormatDate';
import FormatPrice from '../../../components/FormatPrice';

const columns = [
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
                    <div>
                        <p>{cellValue.email}</p>
                    </div>
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

    if (isLoadingPayment || isFetchingPayment) return <LoadingSpinner />;

    if (isError) {
        console.log('Something went wrong: ', error);
    }

    console.log(payment);

    return (
        <Layout>
            <div className='rounded-md p-4 shadow-sm bg-white dark:bg-primaryColor-deepDark'>
                <h2 className='font-bold text-xl mb-4'>
                    All Payment Transaction
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
