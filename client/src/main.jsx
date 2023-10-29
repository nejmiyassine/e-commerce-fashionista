import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { DarkModeProvider } from './context/DarkModeContext';
import store from './app/store';

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
