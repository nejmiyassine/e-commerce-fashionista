import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import AdminLogin from '../pages/admin/Login/AdminLogin';
import Products from '../pages/admin/Products/Products';
import Categories from '../pages/admin/Categories/Categories';
import Subcategories from '../pages/admin/SubCategories/Subcategories';
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import CustomerDetails from '../pages/admin/customers/CustomerDetails';
import ViewAllCustomers from '../pages/admin/customers/ViewAllCustomers';
import Users from '../pages/admin/users/Users';
import UserDetails from '../pages/admin/users/UserDetails';
import LandingP from '../pages/LandingPage/LandingP';
import Orders from '../pages/admin/Orders/Orders';
import AuthLogin from '../pages/auth/AuthLogin';
import AuthRegister from '../pages/auth/AuthRegister';
import Unauthorized from '../pages/Unauthorized';
import Catalog from '../pages/catalog/Catalog';
import ProtectedRoutes from './ProtectedRoutes';

import UpdateCustomerInfo from '../pages/FrontCustomers/UpdateCustomerInfo';
import CustomerProfile from '../pages/FrontCustomers/customerProfile';
import EditProduct from '../pages/admin/Products/EditProduct';
import AddProduct from '../pages/admin/Products/AddProduct';
import PageNotFound from '../pages/PageNotFound';
import AdminProductDetails from '../pages/admin/Products/AdminProductDetails';
import ProductDetails from '../pages/ProductDetails';

const RouteConfig = () => {
    return (
        <Router>
            <Routes>
                {/* Unauthorized */}
                <Route path='/unauthorized' element={<Unauthorized />} />
                <Route path='*' element={<PageNotFound />} />

                <Route exact path='/' element={<Home />} />
                <Route path='/shop' element={<Catalog />} />
                <Route path='/shop/product/:productId' element={<ProductDetails />} />

                {/* Authentication */}
                <Route path='/register' element={<AuthRegister />} />
                <Route path='/login' element={<AuthLogin />} />
                <Route path='/admin/login' element={<AdminLogin />} />

                {/* Admin Protected Routes */}
                <Route
                    element={
                        <ProtectedRoutes allowedRoles={['admin', 'manager']} />
                    }
                >
                    <Route path='/admin/products' element={<Products />} />
                    <Route
                        path='/admin/edit/product/:productId'
                        element={<EditProduct />}
                    />
                    <Route
                        path='/admin/product/:productId'
                        element={<AdminProductDetails />}
                    />

                    <Route path='/admin/add/product' element={<AddProduct />} />

                    <Route path='/admin/categories' element={<Categories />} />
                    <Route path='/admin/orders' element={<Orders />} />
                    <Route
                        path='/admin/subcategories'
                        element={<Subcategories />}
                    />

                    <Route
                        path='/admin/customers'
                        element={<ViewAllCustomers />}
                    />

                    <Route
                        path='/admin/customers/:customerId'
                        element={<CustomerDetails />}
                    />

                    <Route
                        path='/admin/dashboard'
                        element={<AdminDashboard />}
                    />

                    <Route path='/admin/users' element={<Users />} />
                    <Route
                        path='/admin/users/:userId'
                        element={<UserDetails />}
                    />
                    <Route path='/landingPage' element={<LandingP />} />
                </Route>

                {/* front-store */}
                <Route
                    path='/updateProfile/:customerId'
                    element={<UpdateCustomerInfo />}
                />
                <Route
                    path='/customerProfile/:customerId'
                    element={<CustomerProfile />}
                />
            </Routes>
        </Router>
    );
};

export default RouteConfig;
