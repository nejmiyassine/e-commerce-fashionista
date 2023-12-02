/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiDollar, BiX } from 'react-icons/bi';
import axios from 'axios';
import {
    editProduct,
    getProductById,
} from '../../../features/products/productsSlice';
import { getAllCategories } from '../../../features/categories/categoriesSlice';
import Layout from '../../../layouts/Layout';
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { ImListNumbered } from 'react-icons/im';
import { CgOptions, CgRename } from 'react-icons/cg';
import { LuAsterisk } from 'react-icons/lu';
import { IoMdCloudUpload } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { toast } from 'react-toastify';

function EditProduct() {
    const ref = useRef();
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { product, isLoading } = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories.categories);

    const optionsLength = 7;
    const [name, setName] = useState(product.product_name || '');
    const [price, setPrice] = useState(product.price || '');
    const [discount_price, setDiscount_price] = useState(
        product.discount_price || ''
    );
    const [options, setOptions] = useState(product.options || []);
    const [charOptions, setCharOptions] = useState('');
    const [category, setCategory] = useState(product.category_id || '');
    const [short_description, setShort_description] = useState(
        product.short_description || ''
    );
    const [long_description, setLong_description] = useState(
        product.long_description || ''
    );
    const [editedImages, setEditedImages] = useState([]);
    const [quantity, setQuantity] = useState(product.quantity || '');
    const [existingImages, setExistingImages] = useState(
        product.product_images || []
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (
            charOptions.includes(' ') &&
            charOptions.split(' ')[0] !== '' &&
            options.length < optionsLength
        ) {
            setOptions((option) => [...option, charOptions.split(' ')[0]]);
            setCharOptions('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [charOptions]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await dispatch(getProductById(productId));
                await dispatch(getAllCategories());

                setOptions(productData.options || []);
                setCharOptions('');
                setName(productData.product_name || '');
                setPrice(productData.price || '');
                setDiscount_price(productData.discount_price || '');
                setCategory(productData.category_id || '');
                setShort_description(productData.short_description || '');
                setLong_description(productData.long_description || '');
                setQuantity(productData.quantity || '');
                setExistingImages(productData.product_images || []);
                setLoading(false);
            } catch (error) {
                // Handle errors
                toast.error(error.data.message, {
                    position: 'bottom-right',
                });
            }
        };

        fetchData();
    }, [dispatch, productId]);

    const handleClick = () => {
        ref.current?.click();
    };

    const updateProduct = async () => {
        try {
            // Upload new images to Cloudinary
            const newImageUrls = await Promise.all(
                editedImages.map(async (file) => {
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
            // Combine existing and new images
            const updatedImageUrls = [...existingImages, ...newImageUrls];

            // Create product data with updated images
            const updatedProductData = {
                product_name: name,
                price,
                discount_price,
                options,
                category_id: category,
                short_description,
                long_description,
                quantity,
                product_images: updatedImageUrls, // Use the new image URLs
            };

            // Dispatch the editProduct action with updated product data
            dispatch(
                editProduct({ id: product._id, data: updatedProductData })
            );
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDeleteImage = (index) => {
        // Create a copy of existingImages array
        const updatedImages = [...existingImages];
        // Remove the image at the specified index
        updatedImages.splice(index, 1);
        // Update the state with the new array
        setExistingImages(updatedImages);
    };

    if (loading || isLoading) {
        return <LoadingSpinner />;
    }

    console.log(product);

    return (
        <Layout>
            <div className='w-full p-2 flex items-center'>
                <div className='rounded lg:w-full md:min-w-[500px]'>
                    <h1 className='text-2xl font-bold mb-3'>Edit Product</h1>

                    <div className='mb-3'>
                        <Input
                            defaultSelected
                            className='bg-white rounded-full'
                            isRequired
                            endContent={
                                <CgRename className='text-default-400 pointer-events-none flex-shrink-0' />
                            }
                            labelPlacement='outside'
                            type='text'
                            label='Product Name'
                            aria-label='Product Name'
                            placeholder='Enter Product Name'
                            variant='bordered'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3 flex items-center gap-3'>
                        <Input
                            className='bg-white rounded-full'
                            isRequired
                            endContent={
                                <ImListNumbered className='text-default-400 pointer-events-none flex-shrink-0' />
                            }
                            labelPlacement='outside'
                            type='number'
                            label='Product Quantity'
                            aria-label='Product Quantity'
                            placeholder='Quantity'
                            value={quantity}
                            variant='bordered'
                            onChange={(e) => setQuantity(e.target.value)}
                        />

                        <Input
                            className='bg-white rounded-full'
                            isRequired
                            endContent={
                                <BiDollar className='text-default-400 pointer-events-none flex-shrink-0' />
                            }
                            labelPlacement='outside'
                            type='number'
                            label='Product Discount Price'
                            aria-label='Product Discount Price'
                            placeholder='Product Discount Price'
                            value={discount_price}
                            variant='bordered'
                            onChange={(e) => setDiscount_price(e.target.value)}
                        />

                        <Input
                            isRequired
                            className='bg-white rounded-full'
                            endContent={
                                <BiDollar className='text-default-400 pointer-events-none flex-shrink-0' />
                            }
                            labelPlacement='outside'
                            type='number'
                            label='Product Price'
                            aria-label='Product Price'
                            placeholder='Product Price'
                            value={price}
                            variant='bordered'
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                        <label
                            className='flex capitalize text-sm mb-2'
                            htmlFor='options'
                        >
                            options
                            <LuAsterisk color='#F4558C' size={10} />
                        </label>
                        <div className='relative shadow appearance-none bg-white border rounded-lg w-full flex py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                            <div className='flex space-x-2'>
                                {options &&
                                    options.map((option, idx) => (
                                        <span
                                            key={idx}
                                            className='rounded-md bg-black text-white relative flex'
                                        >
                                            <span className='p-2'>
                                                {option}
                                            </span>
                                            <span
                                                className='px-1 cursor-pointer flex place-content-center place-items-center'
                                                onClick={() =>
                                                    setOptions(
                                                        options.filter(
                                                            (opt) =>
                                                                opt !== option
                                                        )
                                                    )
                                                }
                                            >
                                                <BiX />
                                            </span>
                                        </span>
                                    ))}
                                <div className='absolute top-1/2 right-2 -translate-y-1/2'>
                                    <CgOptions className='text-default-400 pointer-events-none flex-shrink-0' />
                                </div>
                            </div>
                            <input
                                className='outline-none ml-2 '
                                onChange={(e) => setCharOptions(e.target.value)}
                                value={charOptions}
                                id='options'
                                type='text'
                                placeholder='...'
                                disabled={options.length === optionsLength}
                            />
                        </div>
                    </div>

                    <div className='pt-2 mb-3'>
                        <Select
                            isRequired
                            className='w-full bg-white'
                            variant='underlined'
                            labelPlacement='outside'
                            label='Product Category'
                            aria-label='Product Category'
                            placeholder='Select product category'
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        >
                            {product.category_id && (
                                <SelectItem
                                    key={product.category_id._id}
                                    value={product.category_id._id}
                                >
                                    {product.category_id.name}
                                </SelectItem>
                            )}
                            {categories &&
                                categories
                                    .filter(
                                        (cat) =>
                                            cat._id !==
                                            (product.category_id
                                                ? product.category_id._id
                                                : '')
                                    )
                                    .map((category) => (
                                        <SelectItem
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                        </Select>
                    </div>

                    <div className='mb-3'>
                        <label
                            className='flex capitalize text-sm mb-2'
                            htmlFor='short_description'
                        >
                            Short Description{' '}
                            <LuAsterisk color='#F4558C' size={10} />
                        </label>
                        <Textarea
                            isRequired
                            // label='Short Description'
                            area-label='Short Description'
                            labelPlacement='outside'
                            id='short_description'
                            placeholder='Enter your short description'
                            variant='bordered'
                            value={short_description}
                            className='bg-white max-w-full'
                            onChange={(e) =>
                                setShort_description(e.target.value)
                            }
                        />
                    </div>
                    <div className='mb-3'>
                        <label
                            className='flex capitalize text-sm mb-2'
                            htmlFor='long_description'
                        >
                            Long Description
                            <LuAsterisk color='#F4558C' size={10} />
                        </label>
                        <Textarea
                            isRequired
                            id='long_description'
                            area-label='Long Description'
                            labelPlacement='outside'
                            placeholder='Enter your long description'
                            variant='bordered'
                            value={long_description}
                            className='max-w-full bg-white'
                            onChange={(e) =>
                                setLong_description(e.target.value)
                            }
                        />
                    </div>

                    <div className='mb-3'>
                        <div
                            onClick={handleClick}
                            className='p-4 flex  flex-col items-center gap-2 bg-violet-100 text-violet-500 rounded-lg hover:bg-violet-100 cursor-pointer'
                        >
                            <IoMdCloudUpload className='w-6 h-6' />
                            <span>Choose some files to upload</span>
                            <input
                                id='product_image'
                                type='file'
                                className='hidden'
                                ref={ref}
                                onChange={(event) =>
                                    setExistingImages((prevImages) => [
                                        ...prevImages,
                                        event.target.files[0],
                                    ])
                                }
                                multiple
                            />
                        </div>
                    </div>

                    {/* Display existing images */}
                    {existingImages.length > 0 && (
                        <div className='mb-3'>
                            <label className='block text-gray-700 text-sm font-bold'>
                                Existing Images
                            </label>
                            <div className='flex space-x-2'>
                                {existingImages.map((imageUrl, index) => (
                                    <div key={index} className='relative'>
                                        <span
                                            className='bg-red-300 p-2 cursor-pointer flex place-content-center place-items-center'
                                            onClick={() =>
                                                handleDeleteImage(index)
                                            }
                                        >
                                            <BiX />
                                        </span>
                                        <img
                                            src={imageUrl}
                                            alt={`existing-${index}`}
                                            className='w-20 h-20 object-cover rounded'
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Display uploaded images */}
                    {editedImages.length > 0 && (
                        <div className='mb-3'>
                            <label className='block text-gray-700 text-sm font-bold'>
                                Uploaded Images
                            </label>
                            <div className='flex space-x-2'>
                                {editedImages.map((file, index) => (
                                    <div key={index} className='relative'>
                                        <span
                                            className='bg-red-300 p-2 cursor-pointer flex place-content-center place-items-center'
                                            onClick={() =>
                                                setEditedImages(
                                                    editedImages.filter(
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

                    <div className='flex space-x-3'>
                        <button
                            onClick={updateProduct}
                            disabled={isLoading}
                            className='bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded'
                        >
                            {isLoading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default EditProduct;
