import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../../features/favorites/favoritesSlice';
import ViewFavorites from '../../components/favorites/ViewFavorites';
import LoadingSpinner from '../../components/LoadingSpinner';
import NavbarCustomers from '../../components/CustomersFront/NavBarCustomers';
import {getCustomerProfile} from '../../features/customers/frontCustomerSlice'

const Favorites = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.favorites);
    console.log('data from favorites', data);

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    const { isLoading , customerData , err} = useSelector((state) => state.frontCustomers);
    console.log('customerData', customerData);

    useEffect(() => {
        dispatch(getCustomerProfile());
    }, [dispatch ]);


    if (loading || isLoading) {
        return <LoadingSpinner />;
    }

    if (!loading && error) {
        return <div>Error: {error}</div>;
    }
    
    if (!isLoading && err) {
        return <div>Error: {err}</div>;
    }

    console.log('data', customerData);

    return (
        <>
            <NavbarCustomers customer={customerData} />
            <div>{data && <ViewFavorites favorites={data} />}</div>
        </>
    );
};

export default Favorites;
