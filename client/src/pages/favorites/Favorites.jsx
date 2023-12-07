import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../../features/favorites/favoritesSlice';
import ViewFavorites from '../../components/favorites/ViewFavorites';
import LoadingSpinner from '../../components/LoadingSpinner';
import NavbarCustomers from '../../components/CustomersFront/NavBarCustomers';
import {getCustomerProfile} from '../../features/customers/customersSlice'

const Favorites = () => {
    const dispatch = useDispatch();
    const { loading, favoritesData, error } = useSelector((state) => state.favorites);
    console.log('data from favorites', favoritesData);

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    const { isLoading , data , err} = useSelector((state) => state.customers);
    console.log('customerData', data);

    useEffect(() => {
        dispatch(getCustomerProfile());
    }, [dispatch ]);


    if (loading || isLoading ) {
        return <LoadingSpinner />;
    }

    if (!loading && error) {
        return <div>Error: {error}</div>;
    }
    if (!isLoading && err) {
        return <div>Error: {err}</div>;
    }

    console.log('data', data);

    return (
        <>
            <NavbarCustomers customer={data} />
            <div>{favoritesData && <ViewFavorites favorites={favoritesData} />}</div>
        </>
    );
};

export default Favorites;
