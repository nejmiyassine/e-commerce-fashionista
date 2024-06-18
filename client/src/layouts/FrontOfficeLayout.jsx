import { Outlet } from 'react-router-dom';

import Navbar from '@layouts/Navbar';
import BagProductsSidebar from './BagProductsSidebar';
import Head from '@components/LandingPage/Head';
import { FilterProductProvider } from '../context/FilterProductContext';

const FrontOfficeLayout = () => {
    return (
        <FilterProductProvider>
            <Head />
            <Navbar />
            <BagProductsSidebar />
            <Outlet />
        </FilterProductProvider>
    );
};

export default FrontOfficeLayout;
