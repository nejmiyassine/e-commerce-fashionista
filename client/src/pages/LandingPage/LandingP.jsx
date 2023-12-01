import React from 'react';
import Head from '../../components/LandingPage/Head';
import Navbar from '../../components/LandingPage/Navbar';
import Hero from '../../components/LandingPage/Hero';
import Features from '../../components/LandingPage/Features';
import Categories from '../../components/LandingPage/Categories';
import Product from '../../components/LandingPage/Product';
import Contact from '../../components/LandingPage/Contact';
import Footer from '../../components/LandingPage/Footer';
import SubCat from '../../components/LandingPage/SubCat';
const LandingP = () => {
  return (
    <div>
        <Head/>
        <Navbar/>
        <Hero/>
        <Features/>
        <Product/>

        <Categories/>
        <SubCat/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default LandingP
