import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'src/app'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@context': path.resolve(__dirname, 'src/context'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@routes': path.resolve(__dirname, 'src/routes'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        },
    },
});
