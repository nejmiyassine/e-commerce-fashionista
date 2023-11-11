import PropTypes from 'prop-types';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { useDarkMode } from '../../hooks/useDarkMode';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

const OrdersLineChart = ({ data }) => {
    const labels = Object.keys(data);
    const ordersData = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Orders Count',
                data: ordersData,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const lightOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Orders Count',
            },
        },
        scales: {
            x: {
                grid: {
                    color: '#E5E5E5',
                },
            },
            y: {
                grid: {
                    color: '#E5E5E5',
                },
            },
        },
    };

    const darkOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Orders Count',
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(251, 251, 251, .2)',
                },
            },
            y: {
                grid: {
                    color: 'rgba(251, 251, 251, .2)',
                },
            },
        },
    };

    const { darkMode } = useDarkMode();

    const chartOptions = darkMode ? darkOptions : lightOptions;

    return <Line data={chartData} options={chartOptions} />;
};

export default OrdersLineChart;

OrdersLineChart.propTypes = {
    data: PropTypes.any,
};