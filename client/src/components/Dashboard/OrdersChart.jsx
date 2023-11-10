import React from 'react';
import { useGetAllOrdersQuery } from '../../app/api/ordersApi';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';
import AreaChartCopy from './AreaChartCopy';

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

    const selectOrdersLast7Days = () => {
        const orders = data;
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);

        return orders.filter(
            (order) => new Date(order.order_date) >= last7Days
        );
    };

    const selectOrdersLastMonth = () => {
        const orders = data;
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        return orders.filter(
            (order) => new Date(order.order_date) >= lastMonth
        );
    };

    const selectOrdersCountByDay = (orders) => {
        const countByDay = {};
        orders.forEach((order) => {
            const date = new Date(order.order_date).toLocaleDateString();
            countByDay[date] = (countByDay[date] || 0) + 1;
        });
        return countByDay;
    };

    const last7DaysOrders = selectOrdersLast7Days;
    const ordersCountByDay = selectOrdersCountByDay(last7DaysOrders);

    return <AreaChartCopy data={ordersCountByDay} />;
};

export default OrdersChart;
