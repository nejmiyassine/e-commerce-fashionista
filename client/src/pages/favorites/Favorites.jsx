import ViewFavorites from '../../components/favorites/ViewFavorites';
import CustomerNavbar from '../../layouts/CustomerNavbar';

const Favorites = () => {
    return (
        <>
            <CustomerNavbar />
            <div>
                <ViewFavorites />
            </div>
        </>
    );
};

export default Favorites;
