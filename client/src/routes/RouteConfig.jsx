import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import Home from '../pages/Home';
import Login from '../pages/login/Login';
import Logout from '../pages/login/logout';
import Products from '../pages/Products/Products';
import Categories from '../pages/Categories/Categories';
import Subcategories from '../pages/SubCategories/Subcategories';

const RouteConfig = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/admin-dashboard' element={<AdminDashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='logout' element={<Logout />} />
                <Route path='/products' element={<Products />} />
                <Route path='/categories' element={<Categories />} />
                <Route path='/Subcategories' element={<Subcategories/>}/>




            </Routes>
        </Router>
    );
};

export default RouteConfig;
