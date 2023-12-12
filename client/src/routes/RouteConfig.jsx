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
import CustomerProfile from '../pages/FrontCustomers/CustomerProfile';
import EditProduct from '../pages/admin/Products/EditProduct';
import AddProduct from '../pages/admin/Products/AddProduct';
import PageNotFound from '../pages/PageNotFound';
import AdminProductDetails from '../pages/admin/Products/AdminProductDetails';
import ProductDetails from '../pages/ProductDetails';
import ProtectedRoutesCustomer from './ProtectedRoutesCustomer';
import Favorites from '../pages/favorites/Favorites';
import Contact from '../components/LandingPage/Contact';
import About from '../components/LandingPage/About';
import Terms from '../components/LandingPage/Terms';
import CustomersOrdersPage from '../pages/CustomersOrders/CustomersOrdersPage';
import Payment from '../pages/Payment/Payment';
import CheckoutSuccess from '../pages/Payment/CheckoutSuccess';
import AdminTransactions from '../pages/admin/transactions/AdminTransactions';
import OrdersDetails from '../pages/admin/Orders/OrdersDetails';

const RouteConfig = () => {
    return (
        <Router>
            <Routes>
                {/* Unauthorized */}
                <Route path='/unauthorized' element={<Unauthorized />} />
                <Route path='*' element={<PageNotFound />} />

                <Route exact path='/' element={<Home />} />

                <Route path='/about' element={<About />} />
                <Route path='/terms' element={<Terms />} />
                <Route path='/contact' element={<Contact />} />

                {/* Authentication */}
                <Route path='/register' element={<AuthRegister />} />
                <Route path='/login' element={<AuthLogin />} />
                <Route path='/admin/login' element={<AdminLogin />} />

                <Route path='/landing-page' element={<LandingP />} />

                {/* Protected Customer */}
                <Route element={<ProtectedRoutesCustomer />}>
                    <Route path='/shop' element={<Catalog />} />
                    <Route
                        path='/shop/product/:productId'
                        element={<ProductDetails />}
                    />
                    <Route path='/payment' element={<Payment />} />
                    <Route
                        path='/payment/success'
                        element={<CheckoutSuccess />}
                    />

                    <Route
                        path='/update-profile/:customerId'
                        element={<UpdateCustomerInfo />}
                    />

                    <Route
                        path='/customer-profile'
                        element={<CustomerProfile />}
                    />

                    <Route
                        path='/customers-orders'
                        element={<CustomersOrdersPage />}
                    />

                    <Route
                        path='/customers-favorites'
                        element={<Favorites />}
                    />
                </Route>

                {/* Admin Protected Routes */}
                <Route
                    element={
                        <ProtectedRoutes allowedRoles={['admin', 'manager']} />
                    }
                >
                    <Route
                        path='/admin/dashboard'
                        element={<AdminDashboard />}
                    />

                    <Route path='/admin/users' element={<Users />} />
                    <Route
                        path='/admin/users/:userId'
                        element={<UserDetails />}
                    />

                    <Route
                        path='/admin/customers'
                        element={<ViewAllCustomers />}
                    />
                    <Route
                        path='/admin/customers/:customerId'
                        element={<CustomerDetails />}
                    />

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

                    <Route
                        path='/admin/subcategories'
                        element={<Subcategories />}
                    />

                    <Route path='/admin/orders' element={<Orders />} />
                    <Route
                        path='/admin/orders/:orderId'
                        element={<OrdersDetails />}
                    />

                    <Route
                        path='/admin/transactions'
                        element={<AdminTransactions />}
                    />
                </Route>

                {/* front-store */}
            </Routes>
        </Router>
    );
};

export default RouteConfig;
