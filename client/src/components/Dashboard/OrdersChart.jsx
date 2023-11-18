import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';

import { useGetAllOrdersQuery } from '../../app/api/ordersApi';
import OrdersLineChart from './OrdersLineChart';
// import LoadingSpinner from '../LoadingSpinner';
import IncomesLineChart from './IncomesLineChart';
import ChartSkeleton from '../ChartSkeleton';

const OrdersChart = () => {
    const { isLoading, isError, error, data: orders } = useGetAllOrdersQuery();
    const data = React.useMemo(() => (orders ? orders.orders : []), [orders]);

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
    }, [isLoading, isError]);

    const getDayName = (date) => {
        const daysOfWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        return daysOfWeek[new Date(date).getDay()];
    };

    const generateLast7Days = () => {
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - i);
            last7Days.push({
                date: currentDate.toLocaleDateString(),
                dayName: getDayName(currentDate),
            });
        }
        return last7Days;
    };

    // Start of OrdersLineChart
    const selectOrdersLast7Days = (data) => {
        const orders = data;
        const last7Days = generateLast7Days();
        return last7Days.map((day) => {
            const ordersForDay = orders.filter(
                (order) =>
                    new Date(order.order_date).toLocaleDateString() === day.date
            );

            return {
                date: day.date,
                dayName: day.dayName,
                orders: ordersForDay,
            };
        });
    };

    const selectOrdersCountByDay = (orders) => {
        const countByDay = {};
        orders.forEach((day) => {
            const date = day.dayName;
            countByDay[date] = day.orders.length;
        });
        return countByDay;
    };

    const last7DaysOrders = selectOrdersLast7Days(data);
    const ordersCountByDay = selectOrdersCountByDay(last7DaysOrders);
    // End of OrdersLineChart

    // Start of IncomesLineChart
    const selectIncomesLast7Days = (data) => {
        const orders = data;
        const last7Days = generateLast7Days();
        return last7Days.map((day) => {
            const ordersForDay = orders.filter(
                (order) =>
                    new Date(order.order_date).toLocaleDateString() === day.date
            );

            return {
                date: day.date,
                dayName: day.dayName,
                orders: ordersForDay,
            };
        });
    };

    const selectIncomesCountByDay = (orders) => {
        const countByDay = {};
        orders.forEach((day) => {
            const date = day.dayName;
            const totalIncome = day.orders.reduce(
                (sum, order) => sum + order.cart_total_price,
                0
            );
            countByDay[date] = totalIncome;
        });
        return countByDay;
    };

    const last7DaysIncomes = selectIncomesLast7Days(data);
    const incomesCountByDay = selectIncomesCountByDay(last7DaysIncomes);
    // End of IncomesLineChart

    // Calculate the percentage
    const calculatePercentageDifference = (currentWeek, lastWeek) => {
        if (lastWeek === 0) {
            return currentWeek === 0 ? 0 : 100; // Handle division by zero
        }
        const difference = ((currentWeek - lastWeek) / lastWeek) * 100;
        return difference.toFixed(2);
    };

    const currentWeekOrders = selectOrdersLast7Days(data);
    const currentWeekOrdersCountByDay =
        selectOrdersCountByDay(currentWeekOrders);

    const lastWeekStartDate = new Date();
    lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 15); // Adjust the number of days as needed
    const lastWeekEndDate = new Date();
    const lastWeekOrders = data
        ? data.filter(
              (order) =>
                  new Date(order.order_date) >= lastWeekStartDate &&
                  new Date(order.order_date) <= lastWeekEndDate
          )
        : [];
    const lastWeekOrdersCountByDay = selectOrdersCountByDay(
        selectOrdersLast7Days(lastWeekOrders)
    );

    const currentWeekIncomes = selectIncomesLast7Days(data);
    const currentWeekIncomesCountByDay =
        selectIncomesCountByDay(currentWeekIncomes);

    const lastWeekIncomes = data
        ? data.filter(
              (order) =>
                  new Date(order.order_date) >= lastWeekStartDate &&
                  new Date(order.order_date) <= lastWeekEndDate
          )
        : [];

    const lastWeekIncomesCountByDay = selectIncomesCountByDay(
        selectIncomesLast7Days(lastWeekIncomes)
    );

    const ordersPercentageDifference = calculatePercentageDifference(
        Object.values(currentWeekOrdersCountByDay).reduce((a, b) => a + b, 0),
        Object.values(lastWeekOrdersCountByDay).reduce((a, b) => a + b, 0)
    );

    const incomesPercentageDifference = calculatePercentageDifference(
        Object.values(currentWeekIncomesCountByDay).reduce((a, b) => a + b, 0),
        Object.values(lastWeekIncomesCountByDay).reduce((a, b) => a + b, 0)
    );

    return (
        <div className='w-full flex flex-col lg:flex-row items-center justify-between gap-4 pt-4'>
            {isLoading ? (
                <ChartSkeleton />
            ) : (
                <>
                    <div className='w-full lg:w-1/2 rounded-md p-4 shadow-sm bg-white dark:bg-primary-deepDark'>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-md font-bold pb-2'>
                                Total Incomes for the last 7 days
                            </h3>
                            <h3
                                className={`text-md font-bold pb-2 text-default-500 ${
                                    incomesPercentageDifference > 0 &&
                                    'text-green-500'
                                } ${
                                    incomesPercentageDifference < 0 &&
                                    'text-red-500'
                                }`}
                            >
                                {incomesPercentageDifference}%
                            </h3>
                        </div>
                        <IncomesLineChart
                            className='flex-2'
                            data={incomesCountByDay}
                        />
                    </div>
                    <div className='w-full lg:w-1/2 rounded-md p-4 shadow-sm bg-white dark:bg-primary-deepDark'>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-md font-bold pb-2'>
                                Total Orders for the last 7 days
                            </h3>
                            <h3
                                className={`text-md font-bold pb-2 text-default-500 ${
                                    ordersPercentageDifference > 0 &&
                                    'text-green-500'
                                } ${
                                    ordersPercentageDifference < 0 &&
                                    'text-red-500'
                                }`}
                            >
                                {ordersPercentageDifference}%
                            </h3>
                        </div>
                        <OrdersLineChart
                            className='flex-2'
                            data={ordersCountByDay}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default OrdersChart;
