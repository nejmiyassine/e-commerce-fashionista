import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../../features/favorites/favoritesSlice';
import ViewFavorites from '../../components/favorites/ViewFavorites';
import LoadingSpinner from '../../components/LoadingSpinner';
import NavbarCustomers from '../../components/CustomersFront/NavBarCustomers';
import { getCustomerProfile } from '../../features/customers/customersSlice';

const Favorites = () => {
    const dispatch = useDispatch();
    const { isLoading, favoritesData, error } = useSelector(
        (state) => state.favorites
    );

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isLoading && error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <NavbarCustomers />
            <div>
                {favoritesData && <ViewFavorites favorites={favoritesData} />}
            </div>
        </>
    );
};

export default Favorites;
