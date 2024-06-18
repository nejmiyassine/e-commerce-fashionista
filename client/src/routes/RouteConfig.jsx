import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '@pages/Home';
import AdminLogin from '@pages/admin/Login/AdminLogin';
import Products from '@pages/admin/Products/Products';
import Categories from '@pages/admin/Categories/Categories';
import Subcategories from '@pages/admin/SubCategories/Subcategories';
import AdminDashboard from '@pages/admin/dashboard/AdminDashboard';
import CustomerDetails from '@pages/admin/customers/CustomerDetails';
import ViewAllCustomers from '@pages/admin/customers/ViewAllCustomers';
import Users from '@pages/admin/users/Users';
import UserDetails from '@pages/admin/users/UserDetails';
import Orders from '@pages/admin/Orders/Orders';
import AuthLogin from '@pages/auth/AuthLogin';
import AuthRegister from '@pages/auth/AuthRegister';
import Unauthorized from '@pages/Unauthorized';
import Catalog from '@pages/catalog/Catalog';
import ProtectedRoutes from './ProtectedRoutes';
import UpdateCustomerInfo from '@pages/FrontCustomers/UpdateCustomerInfo';
import CustomerProfile from '@pages/FrontCustomers/CustomerProfile';
import EditProduct from '@pages/admin/Products/EditProduct';
import AddProduct from '@pages/admin/Products/AddProduct';
import PageNotFound from '@pages/PageNotFound';
import AdminProductDetails from '@pages/admin/Products/AdminProductDetails';
import ProductDetails from '@pages/ProductDetails';
import ProtectedRoutesCustomer from './ProtectedRoutesCustomer';
import Favorites from '@pages/favorites/Favorites';
import Contact from '@components/LandingPage/Contact';
import About from '@components/LandingPage/About';
import Terms from '@components/LandingPage/Terms';
import CustomersOrdersPage from '@pages/CustomersOrders/CustomersOrdersPage';
import Payment from '@pages/Payment/Payment';
import CheckoutSuccess from '@pages/Payment/CheckoutSuccess';
import AdminTransactions from '@pages/admin/transactions/AdminTransactions';
import OrdersDetails from '@pages/admin/Orders/OrdersDetails';
import FrontOfficeLayout from '@layouts/FrontOfficeLayout';

const RouteConfig = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FrontOfficeLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="terms" element={<Terms />} />
                    <Route path="contact" element={<Contact />} />

                    <Route path="unauthorized" element={<Unauthorized />} />
                    <Route path="*" element={<PageNotFound />} />

                    {/* Authentication */}
                    <Route path="/register" element={<AuthRegister />} />
                    <Route path="/login" element={<AuthLogin />} />

                    {/* Protected Customer */}
                    <Route element={<ProtectedRoutesCustomer />}>
                        <Route path="/shop" element={<Catalog />} />
                        <Route
                            path="/shop/product/:productId"
                            element={<ProductDetails />}
                        />
                        <Route path="/payment" element={<Payment />} />
                        <Route
                            path="/payment/success"
                            element={<CheckoutSuccess />}
                        />

                        <Route
                            path="/update-profile/:customerId"
                            element={<UpdateCustomerInfo />}
                        />

                        <Route
                            path="/customer/profile"
                            element={<CustomerProfile />}
                        />

                        <Route
                            path="/customers/orders"
                            element={<CustomersOrdersPage />}
                        />

                        <Route
                            path="/customers/favorites"
                            element={<Favorites />}
                        />
                    </Route>
                </Route>

                {/* Authentication */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Admin Protected Routes */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoutes allowedRoles={['admin', 'manager']} />
                    }
                >
                    <Route path="dashboard" element={<AdminDashboard />} />

                    <Route path="users" element={<Users />} />
                    <Route path="users/:userId" element={<UserDetails />} />

                    <Route path="customers" element={<ViewAllCustomers />} />
                    <Route
                        path="customers/:customerId"
                        element={<CustomerDetails />}
                    />

                    <Route path="products" element={<Products />} />
                    <Route
                        path="edit/product/:productId"
                        element={<EditProduct />}
                    />
                    <Route
                        path="product/:productId"
                        element={<AdminProductDetails />}
                    />
                    <Route path="add/product" element={<AddProduct />} />

                    <Route path="categories" element={<Categories />} />

                    <Route path="subcategories" element={<Subcategories />} />

                    <Route path="orders" element={<Orders />} />
                    <Route path="orders/:orderId" element={<OrdersDetails />} />

                    <Route
                        path="transactions"
                        element={<AdminTransactions />}
                    />
                </Route>
            </Routes>
        </Router>
    );
};

export default RouteConfig;
