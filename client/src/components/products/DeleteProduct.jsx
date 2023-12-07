/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../features/products/productsSlice';

function DeleteProduct({ showModel, setShowModel }) {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.products.isLoading);

    const handleDelete = () => {
        dispatch(deleteProduct(showModel));
        setShowModel('');
    };

    const handleCancel = () => {
        setShowModel('');
    };

    return (
        <div className='fixed z-50 top-0 left-0 w-full min-h-screen bg-black bg-opacity-50 p-10 flex place-content-center place-items-center'>
            <div className='bg-white rounded p-4 md:min-w-[500px] min-w-full '>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-xl font-bold text-center'>
                        Are you sure you want to Delete this product?
                    </h2>
                </div>

                <div className='flex justify-between space-x-3'>
                    <button
                        onClick={handleCancel}
                        className='bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className='bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded'
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteProduct;
