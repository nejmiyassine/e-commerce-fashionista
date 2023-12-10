/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';

import {
    deleteFavorites,
    getFavoritesById,
} from '../../features/favorites/favoritesSlice';

import LoadingSpinner from '../LoadingSpinner';

const ViewFavorites = () => {
    const dispatch = useDispatch();

    const { data: favorites, isLoading } = useSelector(
        (state) => state.favorites
    );

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-5 m-5 p-5 '>
                {favorites.length &&
                    favorites.map((favorite) => (
                        <div
                            key={favorite._id}
                            className=' ml-[90px] mt-[30px]  sm:w-1/2 md:w-1/3 md:ml-2px xl:w-[55%]'
                        >
                            <h6 className='text-center text-md font-semibold p-1'>
                                {favorite.product.product_name}
                            </h6>
                            <div
                                key={favorite.product._id}
                                className='  w-96 h-auto bg-white-800 border-black border-medium rounded-md shadow-xl hover:-translate-y-1 hover:scale-200 duration-300   '
                            >
                                <img
                                    className='w-[240px] h-[380px] mx-auto'
                                    src={`${favorite.product.product_images[0]}`}
                                    alt='image of the product'
                                />

                                <div className='flex justify-between '>
                                    <button
                                        onClick={() => {
                                            dispatch(
                                                deleteFavorites({
                                                    favoriteId: favorite._id,
                                                })
                                            );
                                        }}
                                        type='submit'
                                        className='border-2 border-black hover:bg-red-300 hover:border-none font-medium rounded-md m-2 p-2'
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
                                        className='border-2 border-black hover:bg-blue-300 hover:border-none font-medium rounded-md m-2 p-2 '
                                        type='submit'
                                    >
                                        More details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ViewFavorites;
