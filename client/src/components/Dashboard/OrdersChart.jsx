import React from 'react';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';

import { useGetAllOrdersQuery } from '../../app/api/ordersApi';
import OrdersLineChart from './OrdersLineChart';
import LoadingSpinner from '../LoadingSpinner';

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
    }, [isLoading]);

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
        // console.log('last7Days: ', last7Days);
        return last7Days;
    };

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

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return <OrdersLineChart className='flex-2' data={ordersCountByDay} />;
};

export default OrdersChart;
