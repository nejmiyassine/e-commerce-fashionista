// Styling
import { Line } from 'react-chartjs-2';
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
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export function LineChartGradient() {
    const data = () => {
        return {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'First dataset',
                    data: [33, 53, 85, 41, 44, 65],
                    fill: 'start',
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                        gradient.addColorStop(0, 'rgba(250,174,50,1)');
                        gradient.addColorStop(1, 'rgba(250,174,50,0)');
                        return gradient;
                    },
                    borderColor: 'rgba(75,192,192,1)',
                },
                {
                    label: 'Second dataset',
                    data: [33, 25, 35, 51, 54, 76],
                    fill: 'start',
                    borderColor: '#742774',
                },
            ],
        };
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false,
                },
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

    return (
        <div>
            <Line data={data()} options={options} />
        </div>
    );
}
