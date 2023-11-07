import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { useDarkMode } from '../../hooks/useDarkMode';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
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
            text: 'Chart.js Bar Chart',
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
            text: 'Chart.js Bar Chart',
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
            label: 'Dataset 1',
            data: labels.map(() =>
                faker.datatype.number({ min: 200, max: 1000 })
            ),
            backgroundColor: '#4eb2d8',
            borderColor: '#1F2937',
        },
    ],
};

const darkData = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() =>
                faker.datatype.number({ min: 200, max: 1000 })
            ),
            backgroundColor: 'rgb(53, 162, 235)',
            borderColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const VerticalChart = () => {
    const { darkMode } = useDarkMode();

    const chartOptions = darkMode ? darkOptions : lightOptions;
    const chartData = darkMode ? darkData : lightData;

    return <Bar options={chartOptions} data={chartData} />;
};

export default VerticalChart;
