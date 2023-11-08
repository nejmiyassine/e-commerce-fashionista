import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import { useDarkMode } from '../../hooks/useDarkMode';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const lightOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
            color: '#1F2937', // Light mode text color
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
            text: 'Chart.js Line Chart',
            color: '#FBFBFB',
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const lightData = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Dataset 2',
            data: labels.map(() =>
                faker.datatype.number({ min: 200, max: 1000 })
            ),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const darkData = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Dataset 2',
            data: labels.map(() =>
                faker.datatype.number({ min: 200, max: 600 })
            ),
            borderColor: 'rgba(53, 162, 235, 1)',
            backgroundColor: 'rgba(53, 162, 235, .7)',
        },
    ],
};

const AreaChart = () => {
    const { darkMode } = useDarkMode();

    const chartOptions = darkMode ? darkOptions : lightOptions;
    const chartData = darkMode ? darkData : lightData;

    return <Line options={chartOptions} data={chartData} />;
};

export default AreaChart;
