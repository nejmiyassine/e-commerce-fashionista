import RouteConfig from './routes/RouteConfig';
import { useDarkMode } from './hooks/useDarkMode';
import { ToastContainer } from 'react-toastify';

const App = () => {
    const { darkMode } = useDarkMode();

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <RouteConfig />
            <ToastContainer />
        </div>
    );
};

export default App;
