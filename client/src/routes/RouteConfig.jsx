import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import Users from '../pages/admin/users/Users';

const RouteConfig = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/admin-dashboard' element={<AdminDashboard />} />
                <Route path='/users' element={<Users />} />
            </Routes>
        </Router>
    );
};

export default RouteConfig;
