/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';

import { deleteFavorites } from '../../features/favorites/favoritesSlice';

import LoadingSpinner from '../LoadingSpinner';
import { MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';

const ViewFavorites = () => {
    const dispatch = useDispatch();

    const { data: favorites, isLoading } = useSelector(
        (state) => state.favorites
    );

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='container mx-auto'>
            <h2 className='font-bold text-xl text-center my-5'>
                Favorites Products
            </h2>

            {favorites.length === 0 && (
                <div className='text-center'>
                    <p className='text-gray-400'>There are no products!</p>
                    <Link
                        to='/'
                        className='underline flex justify-center items-center'
                    >
                        Go to shopping!
                        <IoIosArrowDown className='transform -rotate-90' />
                    </Link>
                </div>
            )}

            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                {favorites.length ? (
                    favorites.map((favorite) => (
                        <div key={favorite._id} className=''>
                            <div className='relative group'>
                                <img
                                    src={
                                        favorite.product.product_images
                                            .length &&
                                        favorite.product.product_images[0]
                                    }
                                    alt={`Product: ${favorite.product.product_name}`}
                                    className='object-contain w-full h-72 fade-out'
                                />

                                <div className='z-30 transition-opacity duration-200'>
                                    <button
                                        onClick={() => {
                                            dispatch(
                                                deleteFavorites({
                                                    favoriteId: favorite._id,
                                                })
                                            );
                                        }}
                                        className='absolute top-10 right-6 transform -translate-y-1/2 rounded-full bg-white p-2 shadow-md'
                                    >
                                        <MdFavorite className='transition-all text-red-500 w-5 h-5' />
                                    </button>
                                </div>
                            </div>

                            <div className='mt-2'>
                                <Link
                                    to={`/shop/product/${favorite.product._id}`}
                                >
                                    <h3 className='text-sm font-bold text-center'>
                                        {favorite.product.product_name}
                                    </h3>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
};

// <div className='flex justify-between '>
//     <button
//         onClick={() => {
//             dispatch(
//                 deleteFavorites({
//                     favoriteId: favorite._id,
//                 })
//             );
//         }}
//         type='submit'
//         className='border-2 border-black hover:bg-red-300 hover:border-none font-medium rounded-md m-2 p-2'
//     >
//         Remove
//     </button>

//     <button
//         onClick={() => {
//             dispatch(
//                 getFavoritesById({
//                     favoriteId: favorite._id,
//                 })
//             );
//         }}
//         className='border-2 border-black hover:bg-blue-300 hover:border-none font-medium rounded-md m-2 p-2 '
//         type='submit'
//     >
//         More details
//     </button>
// </div>

export default ViewFavorites;
