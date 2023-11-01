import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import Home from '../pages/Home';
import Products from '../pages/Product';
// import Products from './../pages/Product';

const RouteConfig = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/products' element={<Products />} />
                <Route path='/admin-dashboard' element={ <AdminDashboard />} />
            </Routes>
        </Router>
    );
};

export default RouteConfig;
