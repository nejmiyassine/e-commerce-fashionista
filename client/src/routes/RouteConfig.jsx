import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import Users from '../pages/admin/users/Users';
import UserDetails from '../pages/admin/users/UserDetails';

const RouteConfig = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/admin/dashboard' element={<AdminDashboard />} />
                <Route path='/admin/users' element={<Users />} />
                <Route path='/admin/users/:userId' element={<UserDetails />} />
            </Routes>
        </Router>
    );
};

export default RouteConfig;
