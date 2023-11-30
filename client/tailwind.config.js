import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primaryColor: {
                    light: '#1a1a1a',
                    deepDark: '#000000',
                    dark: '#F5F5F5',
                    blueCyan: '#4eb2d8',
                    orange: '#f5a524',
                },
                secondaryColor: {
                    light: '#3F4458',
                    dark: '#E4E6EA',
                },
            },
            fontFamily: {
                bebas: ['Bebas Neue', 'sans-serif'],
            },
        },
    },
    plugins: [nextui()],
};
