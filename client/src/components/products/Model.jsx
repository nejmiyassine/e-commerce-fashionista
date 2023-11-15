import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../features/products/productsSlice';
// import { fetchCategories } from '../path-to-your-categories-slice';
import { getAllCategories } from '../../features/categories/categoriesSlice';
import { BiX } from 'react-icons/bi';

function AddModel({ setShowModel, getProducts }) {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.products.isLoading);
    const categories = useSelector((state) => state.categories.categories);

    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [price, setPrice] = useState('');
    const [discount_price, setDiscount_price] = useState('');
    const [options, setOptions] = useState([]);
    const [charOptions, setCharOptions] = useState('');
    const [category, setCategory] = useState('');
    const [short_description, setShort_description] = useState('');
    const [long_description, setLong_description] = useState('');
    const [image, setImage] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if (charOptions.includes(' ') && charOptions.split(' ')[0] !== '' && options.length < 3) {
            setOptions((option) => [...option, charOptions.split(' ')[0]]);
            setCharOptions('');
        }
    }, [charOptions]);

    const addProduct = () => {
        const data = {
            product_name: name,
            sku,
            price,
            discount_price,
            options,
            category_id: category,
            short_description,
            long_description,
            quantity,
        };

        dispatch(createProduct(data));
        setShowModel(false);
    };

    const handleCancel = () => {
        setShowModel(false);
    };

    return (
        <div className='absolute z-10 top-0 left-0 w-full min-h-screen bg-black bg-opacity-50 p-10 flex place-content-center place-items-center'>
            <div className='bg-white rounded p-4 md:min-w-[500px] min-w-full '>
                <h1 className='text-2xl font-bold mb-3'>Add Product</h1>
                {/* ... rest of your form */}
                <div className='mb-3'>
                <label className='block text-gray-700 text-sm font-bold ' htmlFor='name'>
                    Name
                </label>
                <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='name'
                    type='text'
                    placeholder='Product Name'
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div className='mb-3'>
                <label className='block text-gray-700 text-sm font-bold ' htmlFor='sku'>
                    sku
                </label>
                <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='sku'
                    type='text'
                    placeholder='Product sku'
                    onChange={(e)=>setSku(e.target.value)}
                />
            </div>
            <div className='mb-3'>
                <label className='block text-gray-700 text-sm font-bold ' htmlFor='price'>
                    Quantity
                </label>
                <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='price'
                    type='text'
                    placeholder='Product quantity'
                    onChange={(e)=>setQuantity(e.target.value)}
                />
            </div>
            <div className='mb-3'>
                <label className='block text-gray-700 text-sm font-bold ' htmlFor='price'>
                    price
                </label>
                <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='price'
                    type='text'
                    placeholder='Product price'
                    onChange={(e)=>setPrice(e.target.value)}
                />
            </div>
            <div className='mb-3'>
                <label className='block text-gray-700 text-sm font-bold ' htmlFor='discount_price'>
                    discount_price
                </label>
                <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='discount_price'
                    type='text'
                    placeholder='Product discount_price'
                    onChange={(e)=>setDiscount_price(e.target.value)}
                />
            </div>  
            <div className='mb-3'>
                <label className='block text-gray-700 text-sm font-bold ' htmlFor='options'>
                    options
                </label>
                <div className='shadow appearance-none border rounded w-full flex py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                <div className='flex space-x-2'>
                    {
                        options &&
                        options.map((option)=>(
                            <span className='bg-gray-200 relative flex'>
                                <span className='bg-red-300 p-2 cursor-pointer flex place-content-center place-items-center' onClick={()=>setOptions(options.filter((opt)=>opt !== option))}>
                                    <BiX />
                                </span>
                                <span className='p-2'>{option}</span>
                            </span>
                        ))
                    }
                </div>
                <input
                    className='outline-none ml-2 '
                    onChange={(e)=>setCharOptions(e.target.value)}
                    value={charOptions}
                    id='options'
                    type='text'
                    placeholder='...'
                    disabled={options.length === 3}
                    />
                </div>

            </div>  

            <div className='mb-3'>
                <label className='block text-gray-700 text-sm font-bold ' htmlFor='category'>
                    category
                </label>
                <select
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='category'
                    type='text'
                    placeholder='Product category'
                    onChange={(e)=>setCategory(e.target.value)}
                >
                    <option value=''>Select Category</option>
                    {
                        categories &&
                        categories.map((category)=>(
                            <option value={category._id}>{category.name}</option>
                        ))
                    }
                </select>
                </div>

            <div className='mb-3'>
                <label className='block text-gray-700 text-sm font-bold ' htmlFor='short_description'>
                    short_description
                </label>
                <textarea
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='short_description'
                    type='text'
                    placeholder='Product short_description'
                    onChange={(e)=>setShort_description(e.target.value)}
                />

            </div>
            <div className='mb-3'>
                <label className='block text-gray-700 text-sm font-bold ' htmlFor='long_description'>
                    long_description
                </label>
                <textarea
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='long_description'
                    type='text'
                    placeholder='Product long_description'
                    onChange={(e)=>setLong_description(e.target.value)}
                />

            </div>

            <div className='mb-3'>
                <label className='block text-gray-700 text-sm font-bold ' htmlFor='image'>
                    image
                </label>
                <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='product_image'
                    type='file'

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



















































// import axios from 'axios';
// import React, { useEffect,useState } from 'react'
// import { BiX } from 'react-icons/bi';

// function Model({showModel,setShowModel,getProducts}) {
//     const [name, setName] = useState('');
//     const [sku, setSku] = useState('');
//     const [price, setPrice] = useState('');
//     const [discount_price, setDiscount_price] = useState('');
//     const [options, setOptions] = useState([]);
//     const [charOptions, setCharOptions] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [category, setCategory] = useState('');
//     const [short_description, setShort_description] = useState('');
//     const [long_description, setLong_description] = useState('');
//     const [image, setImage] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [quantity, setQuantity] = useState('');


//     useEffect(()=>{
//         setLoading(true);
//         axios.get('http://localhost:8000/v1/categories').then((res)=>{
//             setCategories(res.data.data);
//         }).catch((err)=>{
//             console.log(err);
//         }).finally(()=>{
//             setLoading(false);
//         })
//     },[])


//     useEffect(()=>{
//         if (charOptions.includes(' ') && charOptions.split(' ')[0] !== '' && options.length < 3) {
//             setOptions(option => [...option,charOptions.split(' ')[0]])
//             setCharOptions('')
//         }
//     },[charOptions])

//     const addProduct = () => {
//         setLoading(true);
//         const data = {
//             product_name:name,
//             sku,
//             price,
//             discount_price,
//             options,
//             category_id: category,
//             short_description,
//             long_description,
//             quantity
//         }
//         console.log(data);
//         axios.post('http://localhost:8000/v1/products',data).then((res)=>{
//             console.log(res);
//             getProducts();
//             setShowModel(false);
//         }).catch((err)=>{
//             console.log(err);
//         }).finally(()=>{
//             setLoading(false);
//         })
//     }





//   return (
//     <div className='absolute z-10  top-0 left-0 w-full min-h-screen bg-black bg-opacity-50 p-10 flex place-content-center place-items-center'>
//         <div className='bg-white rounded  p-4 md:min-w-[500px] min-w-full ' >
//             <h1 className='text-2xl font-bold mb-3'>Add Product</h1>
//             <div className='mb-3'>
//                 <label className='block text-gray-700 text-sm font-bold ' htmlFor='name'>
//                     Name
//                 </label>
//                 <input
//                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//                     id='name'
//                     type='text'
//                     placeholder='Product Name'
//                     onChange={(e)=>setName(e.target.value)}
//                 />
//             </div>
//             <div className='mb-3'>
//                 <label className='block text-gray-700 text-sm font-bold ' htmlFor='sku'>
//                     sku
//                 </label>
//                 <input
//                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//                     id='sku'
//                     type='text'
//                     placeholder='Product sku'
//                     onChange={(e)=>setSku(e.target.value)}
//                 />
//             </div>
//             <div className='mb-3'>
//                 <label className='block text-gray-700 text-sm font-bold ' htmlFor='price'>
//                     Quantity
//                 </label>
//                 <input
//                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//                     id='price'
//                     type='text'
//                     placeholder='Product quantity'
//                     onChange={(e)=>setQuantity(e.target.value)}
//                 />
//             </div>
//             <div className='mb-3'>
//                 <label className='block text-gray-700 text-sm font-bold ' htmlFor='price'>
//                     price
//                 </label>
//                 <input
//                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//                     id='price'
//                     type='text'
//                     placeholder='Product price'
//                     onChange={(e)=>setPrice(e.target.value)}
//                 />
//             </div>
//             <div className='mb-3'>
//                 <label className='block text-gray-700 text-sm font-bold ' htmlFor='discount_price'>
//                     discount_price
//                 </label>
//                 <input
//                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//                     id='discount_price'
//                     type='text'
//                     placeholder='Product discount_price'
//                     onChange={(e)=>setDiscount_price(e.target.value)}
//                 />
//             </div>  
//             <div className='mb-3'>
//                 <label className='block text-gray-700 text-sm font-bold ' htmlFor='options'>
//                     options
//                 </label>
//                 <div className='shadow appearance-none border rounded w-full flex py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
//                 <div className='flex space-x-2'>
//                     {
//                         options &&
//                         options.map((option)=>(
//                             <span className='bg-gray-200 relative flex'>
//                                 <span className='bg-red-300 p-2 cursor-pointer flex place-content-center place-items-center' onClick={()=>setOptions(options.filter((opt)=>opt !== option))}>
//                                     <BiX />
//                                 </span>
//                                 <span className='p-2'>{option}</span>
//                             </span>
//                         ))
//                     }
//                 </div>
//                 <input
//                     className='outline-none ml-2 '
//                     onChange={(e)=>setCharOptions(e.target.value)}
//                     value={charOptions}
//                     id='options'
//                     type='text'
//                     placeholder='...'
//                     disabled={options.length === 3}
//                     />
//                 </div>

//             </div>  

//             <div className='mb-3'>
//                 <label className='block text-gray-700 text-sm font-bold ' htmlFor='category'>
//                     category
//                 </label>
//                 <select
//                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//                     id='category'
//                     type='text'
//                     placeholder='Product category'
//                     onChange={(e)=>setCategory(e.target.value)}
//                 >
//                     <option value=''>Select Category</option>
//                     {
//                         categories &&
//                         categories.map((category)=>(
//                             <option value={category._id}>{category.name}</option>
//                         ))
//                     }
//                 </select>
//                 </div>

//             <div className='mb-3'>
//                 <label className='block text-gray-700 text-sm font-bold ' htmlFor='short_description'>
//                     short_description
//                 </label>
//                 <textarea
//                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//                     id='short_description'
//                     type='text'
//                     placeholder='Product short_description'
//                     onChange={(e)=>setShort_description(e.target.value)}
//                 />

//             </div>
//             <div className='mb-3'>
//                 <label className='block text-gray-700 text-sm font-bold ' htmlFor='long_description'>
//                     long_description
//                 </label>
//                 <textarea
//                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//                     id='long_description'
//                     type='text'
//                     placeholder='Product long_description'
//                     onChange={(e)=>setLong_description(e.target.value)}
//                 />

//             </div>

//             <div className='mb-3'>
//                 <label className='block text-gray-700 text-sm font-bold ' htmlFor='image'>
//                     image
//                 </label>
//                 <input
//                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//                     id='product_image'
//                     type='file'

//                 />

//             </div>


//             <div className='flex justify-between space-x-3'>
//                 <button onClick={()=>setShowModel(false)} className='bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
//                     Cancel
//                 </button>
//                 <button
//                     onClick={addProduct}
//                     disabled={loading}
//                 className='bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded'>
//                     {
//                         loading ? 'Loading...' : 'Add Product'
//                     }
//                 </button>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Model