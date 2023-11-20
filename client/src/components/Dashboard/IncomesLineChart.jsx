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
    Filler,
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
    Filler,
    TimeScale
);

const IncomesLineChart = ({ data }) => {
    const { darkMode } = useDarkMode();

    const labels = Object.keys(data);
    const incomesData = Object.values(data);

    const chartData = () => {
        return {
            labels,
            datasets: [
                {
                    label: '$ Incomes',
                    data: incomesData,
                    fill: 'start',
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                        gradient.addColorStop(0, 'rgba(144, 238, 144, 1)');
                        gradient.addColorStop(1, 'rgba(144, 238, 144, 0.2)');
                        return gradient;
                    },
                    borderColor: 'rgba(34, 139, 34, .7)',
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

export default IncomesLineChart;

IncomesLineChart.propTypes = {
    data: PropTypes.any,
};
