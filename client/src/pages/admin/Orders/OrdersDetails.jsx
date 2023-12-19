import { useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../../layouts/Layout';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useGetOrderByIdQuery } from '../../../app/api/ordersApi';
import FormatDate from '../../../components/FormatDate';
import OrderStatusChip from '../../../components/OrderStatusChip';
import {
    Image,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import FormatPrice from '../../../components/FormatPrice';
import { BiUser } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { customersById } from '../../../features/customers/customersSlice';
import { MdOutlinePayment, MdOutlineShoppingCart } from 'react-icons/md';
import { useGetPaymentDetailsByIdQuery } from '../../../app/api/paymentsApi';

const columns = [
    { name: 'PRODUCT IMAGE', uid: 'product_images' },
    { name: 'PRODUCT NAME', uid: 'product_name' },
    { name: 'UNIT PRICE', uid: 'price' },
    { name: 'DISCOUNT PRICE', uid: 'discount_price' },
    { name: 'Quantity', uid: 'quantity' },
];

const OrdersDetails = () => {
    const { orderId } = useParams();
    const { data, isLoading, isFetching, isError, error, isSuccess } =
        useGetOrderByIdQuery(orderId);

    const {
        data: payment,
        isLoading: isLoadingPayment,
        isFetching: isFetchingPayment,
    } = useGetPaymentDetailsByIdQuery(orderId);
    const order = useMemo(() => (data?.order ? data.order : []), [data]);

    const dispatch = useDispatch();
    const { loading, data: customer } = useSelector((state) => state.customers);

    const renderCell = useCallback((orderProuct, columnKey) => {
        const cellValue = orderProuct[columnKey];

        switch (columnKey) {
            case 'product_images':
                return (
                    <div className='flex gap-2 items-center'>
                        {cellValue.slice(0, 1).map((imageUrl) => (
                            <Image
                                key={imageUrl}
                                className='w-10 h-10'
                                src={imageUrl}
                                alt={cellValue['product_name']}
                            />
                        ))}
                    </div>
                );
            case 'product_name':
                return (
                    <div className='py-2 flex flex-col'>
                        <p className='font-semibold capitalize'>{cellValue}</p>
                    </div>
                );
            case 'price':
                return <FormatPrice price={cellValue} />;

            case 'discount_price':
                return <FormatPrice price={cellValue} />;

            default:
                return cellValue;
        }
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(customersById(order.customer_id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, isSuccess]);

    if (
        isLoading ||
        isFetching ||
        loading ||
        isLoadingPayment ||
        isFetchingPayment
    )
        return <LoadingSpinner />;

    if (isError) {
        console.error('Something went wrong: ', error);
    }

    return (
        <Layout>
            <h2 className='font-bold text-xl mb-4'>Orders Details</h2>
            <div className='rounded-md p-4 shadow-sm overflow-x-hidden bg-white dark:bg-primaryColor-deepDark'>
                {!isLoading && order && (
                    <div className=''>
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-semibold'>
                                Order ID: #{orderId}
                            </h3>
                            <FormatDate cellValue={order.order_date} />
                            <OrderStatusChip status={order.status} />
                        </div>

                        <div className='grid grid-cols-3 gap-8 justify-between pt-8'>
                            <div className='flex gap-2'>
                                <div className='flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded-full w-12 h-12'>
                                    <BiUser
                                        size={20}
                                        className='text-black dark:text-white'
                                    />
                                </div>

                                <div className='flex flex-col gap-2 ml-2'>
                                    <h3 className='font-bold text-xl'>
                                        Customer
                                    </h3>
                                    <div className='flex items-center gap-1 text-sm'>
                                        <p className='text-gray-400'>Name:</p>{' '}
                                        <p className=''>
                                            {customer.first_name +
                                                ' ' +
                                                customer.last_name}
                                        </p>
                                    </div>
                                    <div className='flex items-center gap-1 text-sm'>
                                        <p className='text-gray-400'>Email:</p>{' '}
                                        <p className=''>{customer.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex gap-2'>
                                <div className='flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded-full w-12 h-12'>
                                    <MdOutlineShoppingCart
                                        size={20}
                                        className='text-black dark:text-white'
                                    />
                                </div>

                                <div className='flex flex-col gap-2 ml-2'>
                                    <h3 className='font-bold text-xl'>
                                        Order Info
                                    </h3>
                                    <div className='flex items-center gap-1 text-sm'>
                                        <p className='text-gray-400'>Method:</p>{' '}
                                        <p className=''>Stripe</p>
                                    </div>
                                    <div className='flex items-center gap-1 text-sm'>
                                        <p className='text-gray-400'>Status:</p>{' '}
                                        <p className='bg-green-300/20 text-green-500 py-1 px-2 rounded-lg'>
                                            {payment.payment[0].status}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex gap-2'>
                                <div className='flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded-full w-12 h-12'>
                                    <MdOutlinePayment
                                        size={20}
                                        className='text-black dark:text-white'
                                    />
                                </div>

                                <div className='flex flex-col gap-2 ml-2'>
                                    <h3 className='font-semibold text-xl'>
                                        Payment Info
                                    </h3>
                                    <div className='flex items-center gap-1 text-sm'>
                                        <p className='text-gray-400'>
                                            Visa Card:
                                        </p>
                                        <p className=''>**** **** 4242</p>
                                    </div>
                                    <div className='flex items-center gap-1 text-sm'>
                                        <p className='text-gray-400'>
                                            Total Price:
                                        </p>
                                        <p className=''>
                                            ${payment.payment[0].amount}
                                        </p>
                                    </div>
                                    <div className='flex items-center gap-1 text-sm'>
                                        <p className='text-gray-400'>
                                            Phone Number:
                                        </p>
                                        <p className=''>
                                            {
                                                payment.payment[0]
                                                    .billing_details.phone
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='pt-8'>
                            <h3 className='font-semibold pb-4'>Products:</h3>

                            <Table aria-label='Example table with custom cells'>
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
                                    emptyContent={'No products found'}
                                    items={order.order_items}
                                >
                                    {(item) => (
                                        <TableRow
                                            key={item._id}
                                            className='py-2'
                                        >
                                            {(columnKey) => (
                                                <TableCell>
                                                    {renderCell(
                                                        item,
                                                        columnKey
                                                    )}
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default OrdersDetails;
