import React from 'react';

import { Bar } from 'react-chartjs-2';

const AreaChartCopy = ({ data }) => {
    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Orders Count',
                data: Object.values(data),
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                },
            },
            y: {
                beginAtZero: true,
                precision: 0,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default AreaChartCopy;
