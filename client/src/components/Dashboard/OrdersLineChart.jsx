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
    const { darkMode } = useDarkMode();

    const labels = Object.keys(data);
    const ordersData = Object.values(data);

    const chartData = () => {
        return {
            labels,
            datasets: [
                {
                    label: 'Orders Count',
                    data: ordersData,
                    fill: 'start',
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                        gradient.addColorStop(0, 'rgba(75,192,192, 1)');
                        gradient.addColorStop(1, 'rgba(75,192,192,0.2)');
                        return gradient;
                    },
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    const lightOptions = {
        responsive: true,
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
                min: 0,
            },
        },
        elements: {
            line: {
                tension: 0.35,
            },
        },
        plugins: {
            filler: {
                propagate: false,
            },
        },
    };

    const darkOptions = {
        responsive: true,
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
                min: 0,
            },
        },
        elements: {
            line: {
                tension: 0.35,
            },
        },
        plugins: {
            filler: {
                propagate: false,
            },
        },
    };

    const chartOptions = darkMode ? darkOptions : lightOptions;

    return <Line data={chartData()} options={chartOptions} />;
};

export default OrdersLineChart;

OrdersLineChart.propTypes = {
    data: PropTypes.any,
};
