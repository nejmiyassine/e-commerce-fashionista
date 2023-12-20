import { Suspense, lazy } from 'react';

// import Navbar from '../../layouts/Navbar';
import Hero from '../../components/LandingPage/Hero';
import Features from '../../components/LandingPage/Features';
// import Product from '../../components/LandingPage/Product';
import Footer from '../../components/LandingPage/Footer';
import LandingCategories from '../../components/LandingPage/LandingCategories';
import Trending from '../../components/LandingPage/Trending';
import CustomerNavbar from '../../layouts/CustomerNavbar';
import LoadingSpinner from '../../components/LoadingSpinner';

const Product = lazy(() => import('../../components/LandingPage/Product'));

const LandingP = () => {
    return (
        <div>
            {/* <Navbar /> */}
            <CustomerNavbar />

            <Hero />
            <Features />
            <div className='container mx-auto'>
                <Suspense fallback={<LoadingSpinner />}>
                    <Product />
                </Suspense>
                <LandingCategories />
                <Trending />
            </div>
            <Footer />
        </div>
    );
};

export default LandingP;
