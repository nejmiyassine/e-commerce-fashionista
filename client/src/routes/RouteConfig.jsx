import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
// import AllCustomers from '../pages/customers/AllCustomers';
import CustomerDetails from '../pages/customers/CustomerDetails';
import DisplayCustomerDetails from '../components/Customers/DisplayCustomerDetails';
import ViewAllCustomers from '../pages/customers/ViewAllCustomers';

const RouteConfig = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/admin-dashboard' element={<AdminDashboard />} />
                <Route path='/customers' element={<ViewAllCustomers />} />
                <Route path='/customer/:id' element={<CustomerDetails />} />
                {/* test */}
                <Route path='/details' element={<DisplayCustomerDetails />} />
            </Routes>
        </Router>
    );
};

export default RouteConfig;
