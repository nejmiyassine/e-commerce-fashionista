/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../features/products/productsSlice';
// import { fetchCategories } from '../path-to-your-categories-slice';
import { getAllCategories } from '../../features/categories/categoriesSlice';
import { BiX } from 'react-icons/bi';
import axios from 'axios';

function AddModel({ setShowModel }) {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.products.isLoading);
    const categories = useSelector((state) => state.categories.categories);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [discount_price, setDiscount_price] = useState('');
    const [options, setOptions] = useState([]);
    const [charOptions, setCharOptions] = useState('');
    const [category, setCategory] = useState('');
    const [short_description, setShort_description] = useState('');
    const [long_description, setLong_description] = useState('');
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if (
            charOptions.includes(' ') &&
            charOptions.split(' ')[0] !== '' &&
            options.length < 3
        ) {
            setOptions((option) => [...option, charOptions.split(' ')[0]]);
            setCharOptions('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [charOptions]);

    const addProduct = async () => {
        try {
            // Upload images to Cloudinary
            const imageUrls = await Promise.all(
                images.map(async (file) => {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('upload_preset', 'tjbjycer');

                    const response = await axios.post(
                        'https://api.cloudinary.com/v1_1/dgbwl69xi/image/upload',
                        formData
                    );
                    return response.data.secure_url;
                })
            );
            // Create product data
            const productData = {
                product_name: name,
                price,
                discount_price,
                options,
                category_id: category,
                short_description,
                long_description,
                quantity,
                product_images: imageUrls, // Add the image URL to the product data
            };
            console.log('Product Data:', productData);
            // Dispatch the createProduct action with product data
            dispatch(createProduct(productData));

            // Close the modal
            setShowModel(false);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleCancel = () => {
        setShowModel(false);
    };
    return (
        <div className='absolute z-10 top-0 left-0 w-full min-h-screen bg-black bg-opacity-50 p-10 flex place-content-center place-items-center'>
            <div className='bg-white rounded p-4 md:min-w-[500px] min-w-full '>
                <h1 className='text-2xl font-bold mb-3'>Add Product</h1>
                {/* Display uploaded images */}
                {images.length > 0 && (
                    <div className='mb-3'>
                        <label className='block text-gray-700 text-sm font-bold'>
                            Uploaded Images
                        </label>
                        <div className='flex space-x-2'>
                            {images.map((file, index) => (
                                <div key={index} className='relative'>
                                    <span
                                        className='bg-red-300 p-2 cursor-pointer flex place-content-center place-items-center'
                                        onClick={() =>
                                            setImages(
                                                images.filter(
                                                    (img, i) => i !== index
                                                )
                                            )
                                        }
                                    >
                                        <BiX />
                                    </span>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`uploaded-${index}`}
                                        className='w-20 h-20 object-cover rounded'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className='mb-3'>
                    <label
                        className='block text-gray-700 text-sm font-bold '
                        htmlFor='name'
                    >
                        Name
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='name'
                        type='text'
                        placeholder='Product Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label
                        className='block text-gray-700 text-sm font-bold '
                        htmlFor='price'
                    >
                        Quantity
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='price'
                        type='number'
                        placeholder='Product quantity'
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label
                        className='block text-gray-700 text-sm font-bold '
                        htmlFor='price'
                    >
                        price
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='price'
                        type='number'
                        placeholder='Product price'
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label
                        className='block text-gray-700 text-sm font-bold '
                        htmlFor='discount_price'
                    >
                        discount_price
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='discount_price'
                        type='number'
                        placeholder='Product discount_price'
                        onChange={(e) => setDiscount_price(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label
                        className='block text-gray-700 text-sm font-bold '
                        htmlFor='options'
                    >
                        options
                    </label>
                    <div className='shadow appearance-none border rounded w-full flex py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                        <div className='flex space-x-2'>
                            {options &&
                                options.map((option) => (
                                    <span
                                        key={option}
                                        className='bg-gray-200 relative flex'
                                    >
                                        <span
                                            className='bg-red-300 p-2 cursor-pointer flex place-content-center place-items-center'
                                            onClick={() =>
                                                setOptions(
                                                    options.filter(
                                                        (opt) => opt !== option
                                                    )
                                                )
                                            }
                                        >
                                            <BiX />
                                        </span>
                                        <span className='p-2'>{option}</span>
                                    </span>
                                ))}
                        </div>
                        <input
                            className='outline-none ml-2 '
                            onChange={(e) => setCharOptions(e.target.value)}
                            value={charOptions}
                            id='options'
                            type='text'
                            placeholder='...'
                            disabled={options.length === 3}
                        />
                    </div>
                </div>

                <div className='mb-3'>
                    <label
                        className='block text-gray-700 text-sm font-bold '
                        htmlFor='category'
                    >
                        category
                    </label>
                    <select
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='category'
                        type='text'
                        placeholder='Product category'
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value=''>Select Category</option>
                        {categories &&
                            categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div className='mb-3'>
                    <label
                        className='block text-gray-700 text-sm font-bold '
                        htmlFor='short_description'
                    >
                        short_description
                    </label>
                    <textarea
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='short_description'
                        type='text'
                        placeholder='Product short_description'
                        onChange={(e) => setShort_description(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label
                        className='block text-gray-700 text-sm font-bold '
                        htmlFor='long_description'
                    >
                        long_description
                    </label>
                    <textarea
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='long_description'
                        type='text'
                        placeholder='Product long_description'
                        onChange={(e) => setLong_description(e.target.value)}
                    />
                </div>

                <div className='mb-3'>
                    <label
                        className='block text-gray-700 text-sm font-bold'
                        htmlFor='image'
                    >
                        Add Images
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='product_image'
                        type='file'
                        onChange={(event) =>
                            setImages((prevImages) => [
                                ...prevImages,
                                event.target.files[0],
                            ])
                        }
                        multiple
                    />
                </div>
                <div className='flex justify-between space-x-3'>
                    <button
                        onClick={handleCancel}
                        className='bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={addProduct}
                        disabled={loading}
                        className='bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded'
                    >
                        {loading ? 'Loading...' : 'Add Product'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddModel;
