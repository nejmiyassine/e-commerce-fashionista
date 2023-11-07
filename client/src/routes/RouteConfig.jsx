import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard'
import AllCustomers from '../pages/customers/AllCustomers';
import CustomerDetails from '../pages/customers/CustomerDetails';

const  RouteConfig = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/admin-dashboard' element={<AdminDashboard />} />
                <Route path='/customers' element={<AllCustomers />} />
                    <Route path='/customer/:id' element={<CustomerDetails />} />
            </Routes>
        </Router>
    );
};

export default RouteConfig;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          