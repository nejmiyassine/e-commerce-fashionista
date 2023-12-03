import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../../features/favorites/favoritesSlice';
import ViewFavorites from '../../components/favorites/ViewFavorites';
import LoadingSpinner from '../../components/LoadingSpinner';

const Favorites = () => {
    console.log('favorites page');
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.favorites);
    console.log('data from favorites', data);
    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);
    if (loading) {
        return <LoadingSpinner />;
    }
    if (!loading && error) {
        return <div>Error: {error}</div>;
    }
    console.log(data);
    return <>{data && <ViewFavorites favorites={data} />}</>;
};

export default Favorites;
