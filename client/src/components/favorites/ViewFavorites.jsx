import { useDispatch } from 'react-redux';
import {
    deleteFavorites,
    getFavoritesById,
} from '../../features/favorites/favoritesSlice';

const ViewFavorites = ({ favorites }) => {
    
    const dispatch = useDispatch();
    return (

        <div>

        <div className='grid grid-cols-4 gap-3 m-5 p-5 '>
            {favorites &&
                favorites.map((favorite) => (
                    <div>
                        <p>{favorite.product.product_name}</p>
                        <div
                            key={favorite.product._id}
                            className=' w-[270px] h-[450px] border-black border-medium justify-center '
                        >
                            <img
                                className='w-[240px] h-[400px]'
                                src={`${favorite.product.product_images[0]}`}
                                alt='image of the product'
                            />
                        </div>

                        <div>
                            <button
                                onClick={() => {
                                    dispatch(
                                        deleteFavorites({
                                            favoriteId: favorite._id,
                                        })
                                    );
                                }}
                                type='submit'
                                className='bg-gray-300 font-medium rounded-md mt-2 p-2'
                            >
                                Remove
                            </button>

                            <button
                                onClick={() => {
                                    dispatch(
                                        getFavoritesById({
                                            favoriteId: favorite._id,
                                        })
                                    );
                                }}
                                className='bg-gray-300 font-medium rounded-md mt-2 p-2 ml-[90px]'
                                type='submit'
                            >
                                More details
                            </button>
                        </div>
                    </div>
                ))}
             </div>
        </div>
    );
};

export default ViewFavorites;
