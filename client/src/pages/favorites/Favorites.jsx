import ViewFavorites from '../../components/favorites/ViewFavorites';
import Navbar from '../../layouts/Navbar';

const Favorites = () => {
    return (
        <>
            <Navbar />
            <div>
                <ViewFavorites />
            </div>
        </>
    );
};

export default Favorites;
