import React from 'react';
import ReactDOM from 'react-dom/client';

import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { DarkModeProvider } from './context/DarkModeContext';

import App from './App.jsx';
import { store } from './app/store';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <NextUIProvider>
                <DarkModeProvider>
                    <App />
                </DarkModeProvider>
            </NextUIProvider>
        </Provider>
    </React.StrictMode>
);
