import {useState} from 'react'

const ViewFavorites = ({ favorites }) => {
    console.log('favorites', favorites._id);
 const[del, setDelete] = useState('');

 const removeProduct = () => {

    dispatch(
        setDelete({
            favoriteId : favorites._id
            
        })
    )
 }
    return (
        <div className='grid grid-cols-3 gap-14 m-5 p-5 '>
            {favorites &&
                favorites.map((favorite) => (
                    <div
                        key={favorite.product._id}
                        className='w-auto h-auto'
                    >
                        <div>
                            <p className="text-center">{favorite.product.product_name}</p>
                            <img className="w-[500px] h-[280px] "
                                src={`${favorite.product.product_images[0]}`}
                                alt='image of the product'
                            />
                        </div>

                        <button onClick={removeProduct} type="button" className="bg-gray-300 font-medium rounded-md p-2">Remove Product</button>
                    </div>
                ))}
        <div>
        </div>
        </div>

    );
};

export default ViewFavorites;
