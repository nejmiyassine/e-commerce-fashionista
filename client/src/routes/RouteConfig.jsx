import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/login/Login';
import Logout from '../pages/login/logout';
import Products from '../pages/Products/Products';
import Categories from '../pages/Categories/Categories';
import Subcategories from '../pages/SubCategories/Subcategories';
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import CustomerDetails from '../pages/customers/CustomerDetails';
import DisplayCustomerDetails from '../components/Customers/DisplayCustomerDetails';
import ViewAllCustomers from '../pages/customers/ViewAllCustomers';
import Users from '../pages/admin/users/Users';
import UserDetails from '../pages/admin/users/UserDetails';

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


                <Route path='/customers' element={<ViewAllCustomers />} />
                <Route path='/customer/:id' element={<CustomerDetails />} />
                {/* test */}
                <Route path='/details' element={<DisplayCustomerDetails />} />
                  
                <Route path='/admin/dashboard' element={<AdminDashboard />} />
                <Route path='/admin/users' element={<Users />} />
                <Route path='/admin/users/:userId' element={<UserDetails />} />
            </Routes>
        </Router>
    );
};

export default RouteConfig;
