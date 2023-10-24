import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import Home from '../pages/Home';

const RouteConfig = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/admin-dashboard' element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
};

export default RouteConfig;
