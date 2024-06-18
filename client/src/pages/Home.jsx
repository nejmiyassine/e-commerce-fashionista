import Hero from '@components/LandingPage/Hero';
import Features from '@components/LandingPage/Features';
import LandingCategories from '@components/LandingPage/LandingCategories';
import Trending from '@components/LandingPage/Trending';

import Product from '@components/LandingPage/Product';

const Home = () => {
    return (
        <div>
            <Hero />
            <Features />
            <div className="container mx-auto">
                <Product />
                <LandingCategories />
                <Trending />
            </div>
        </div>
    );
};

export default Home;
