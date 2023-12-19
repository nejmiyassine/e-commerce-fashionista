// import Navbar from '../../layouts/Navbar';
import Hero from '../../components/LandingPage/Hero';
import Features from '../../components/LandingPage/Features';
import Product from '../../components/LandingPage/Product';
import Footer from '../../components/LandingPage/Footer';
import LandingCategories from '../../components/LandingPage/LandingCategories';
import Trending from '../../components/LandingPage/Trending';
import CustomerNavbar from '../../layouts/CustomerNavbar';

const LandingP = () => {
    return (
        <div>
            {/* <Navbar /> */}
            <CustomerNavbar />

            <Hero />
            <Features />
            <div className='container mx-auto'>
                <Product />
                <LandingCategories />
                <Trending />
            </div>
            <Footer />
        </div>
    );
};

export default LandingP;
