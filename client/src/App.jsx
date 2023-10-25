import RouteConfig from './routes/RouteConfig';
import { useDarkMode } from './hooks/useDarkMode';

const App = () => {
    const { darkMode } = useDarkMode();

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <RouteConfig />
        </div>
    );
};

export default App;
