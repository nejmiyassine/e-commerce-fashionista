/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { BiDollar, BiX } from 'react-icons/bi';
import { ImListNumbered } from 'react-icons/im';
import { CgOptions, CgRename } from 'react-icons/cg';
import { LuAsterisk } from 'react-icons/lu';
import { IoMdCloudUpload } from 'react-icons/io';

import {
    editProduct,
    getProductById,
} from '../../../features/products/productsSlice';
import { getAllCategories } from '../../../features/categories/categoriesSlice';

import Layout from '../../../layouts/Layout';
import LoadingSpinner from '../../../components/LoadingSpinner';

const productSchema = yup
    .object({
        name: yup.string().required('Please enter a product name'),
        quantity: yup.number().required('Please enter a quantity'),
        discount_price: yup.number().required('Please enter a discount price'),
        price: yup.number().required('Please enter a price'),
        category: yup.string().required('Please select a category'),
        short_description: yup
            .string()
            .required('Please enter a short description'),
        long_description: yup
            .string()
            .required('Please enter a long description'),
    })
    .required();

const optionsLength = 7;

const EditProduct = () => {
    const ref = useRef();
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { product, isLoading } = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories.categories);

    const methods = useForm({
        resolver: yupResolver(productSchema),
        defaultValues: {
            name: '',
            quantity: '',
            discount_price: '',
            price: '',
            category: '',
            short_description: '',
            long_description: '',
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = methods;

    const [options, setOptions] = useState(product.options || []);
    const [charOptions, setCharOptions] = useState('');
    const [editedImages, setEditedImages] = useState([]);
    const [existingImages, setExistingImages] = useState(
        product.product_images || []
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (
            charOptions.includes(' ') &&
            charOptions.split(' ')[0] !== '' &&
            product?.options.length < optionsLength
        ) {
            setValue('options', (option) => [
                ...option,
                charOptions.split(' ')[0],
            ]);
            setCharOptions('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [charOptions]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await dispatch(getProductById(productId));
                await dispatch(getAllCategories());

                reset({
                    name: productData.product_name || '',
                    quantity: productData.quantity || '',
                    discount_price: productData.discount_price || '',
                    price: productData.price || '',
                    category: productData.category_id || '',
                    short_description: productData.short_description || '',
                    long_description: productData.long_description || '',
                    options: productData.options || [],
                });
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
    }, [dispatch, productId, reset]);

    const handleClick = () => {
        ref.current?.click();
    };

    const updateProduct = async (data) => {
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
                product_name: data.name,
                price: data.price,
                discount_price: data.discount_price,
                options: data.options,
                category_id: data.category,
                short_description: data.short_description,
                long_description: data.long_description,
                quantity: data.quantity,
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

                    <form onSubmit={handleSubmit(updateProduct)}>
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
                                {...register('name')}
                                isInvalid={!!errors.name}
                                errorMessage={
                                    errors.name && errors.name.message
                                }
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
                                variant='bordered'
                                {...register('quantity')}
                                isInvalid={!!errors.quantity}
                                errorMessage={
                                    errors.quantity && errors.quantity.message
                                }
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
                                variant='bordered'
                                {...register('price')}
                                isInvalid={!!errors.discount_price}
                                errorMessage={
                                    errors.discount_price &&
                                    errors.discount_price.message
                                }
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
                                variant='bordered'
                                {...register('price')}
                                isInvalid={!!errors.price}
                                errorMessage={
                                    errors.price && errors.price.message
                                }
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
                                                                    opt !==
                                                                    option
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
                                    onChange={(e) =>
                                        setCharOptions(e.target.value)
                                    }
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
                                {...register('category')}
                                isInvalid={!!errors.category}
                                errorMessage={
                                    errors.category && errors.category.message
                                }
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
                                className='bg-white max-w-full'
                                area-label='Short Description'
                                labelPlacement='outside'
                                id='short_description'
                                placeholder='Enter your short description'
                                variant='bordered'
                                {...register('short_description')}
                                isInvalid={!!errors.short_description}
                                errorMessage={
                                    errors.short_description &&
                                    errors.short_description.message
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
                                className='max-w-full bg-white'
                                id='long_description'
                                area-label='Long Description'
                                labelPlacement='outside'
                                placeholder='Enter your long description'
                                variant='bordered'
                                {...register('long_description')}
                                isInvalid={!!errors.long_description}
                                errorMessage={
                                    errors.long_description &&
                                    errors.long_description.message
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
                                                            (img, i) =>
                                                                i !== index
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
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default EditProduct;
