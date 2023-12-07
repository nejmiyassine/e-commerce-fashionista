/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { BiX, BiDollar } from 'react-icons/bi';
import { ImListNumbered } from 'react-icons/im';
import { CgOptions, CgRename } from 'react-icons/cg';
import { LuAsterisk } from 'react-icons/lu';

import { getAllCategories } from '../../../features/categories/categoriesSlice';
import { createProduct } from '../../../features/products/productsSlice';
// import { fetchCategories } from '../path-to-your-categories-slice';
import Layout from '../../../layouts/Layout';
// import FileInput from '../../../components/FileInput';
import { IoMdCloudUpload } from 'react-icons/io';
import { toast } from 'react-toastify';

function AddProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.products.isLoading);
    const categories = useSelector((state) => state.categories.categories);

    const optionsLength = 7;
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
            options.length < optionsLength
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

            // Dispatch the createProduct action with product data
            if (
                !name ||
                !price ||
                !discount_price ||
                !options ||
                !category ||
                !short_description ||
                !long_description ||
                !images.length ||
                !quantity
            ) {
                toast.error('All Fields are required!', {
                    position: 'bottom-right',
                });
            } else {
                dispatch(createProduct(productData));
                navigate('/admin/products');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const ref = useRef();

    const handleClick = () => {
        ref.current?.click();
    };

    return (
        <Layout>
            <div className='w-full p-2 flex items-center'>
                <div className='rounded lg:w-full md:min-w-[500px]'>
                    <h1 className='text-2xl font-bold mb-3'>Add Product</h1>

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
                        >
                            {categories &&
                                categories.map((category) => (
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
                                    setImages((prevImages) => [
                                        ...prevImages,
                                        event.target.files[0],
                                    ])
                                }
                                multiple
                            />
                        </div>
                    </div>

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

                    <div className='flex justify-between space-x-3'>
                        <button
                            onClick={addProduct}
                            disabled={loading}
                            className='bg-black border hover:border-black hover:text-black hover:bg-white w-full text-white font-bold py-2 px-4 rounded'
                        >
                            {loading ? 'Loading...' : 'Add Product'}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AddProduct;
