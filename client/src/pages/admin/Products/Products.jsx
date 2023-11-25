import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiCartAdd, BiSolidSearchAlt2 } from 'react-icons/bi';
import Layout from '../../../layouts/Layout';
import Model from '../../../components/products/Model';
import DModel from '../../../components/products/DeleteModel';
import EModel from '../../../components/products/EditModel';

import { getAllProducts } from '../../../features/products/productsSlice';
import { getAllCategories } from '../../../features/categories/categoriesSlice';

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const categories = useSelector((state) => state.categories.categories);
    // console.log("this is product id " + products);
    const [search, setSearch] = useState('');
    const [showModel, setShowModel] = useState(false);
    const [deleteModel, setDeleteModel] = useState('');
    const [editModel, setEditModel] = useState();
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setSearch(''); // Clear search when a category is selected
    };
    // console.log(products)
    // console.log(JSON.stringify(products, null, 2));
    return (
        <Layout>
            {showModel && (
                <Model showModel={showModel} setShowModel={setShowModel} />
            )}
            {deleteModel && (
                <DModel showModel={deleteModel} setShowModel={setDeleteModel} />
            )}
            {editModel && (
                <EModel showModel={editModel} setShowModel={setEditModel} />
            )}

            <div className='p-5'>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6'>
                    <button
                        onClick={() => setShowModel(true)}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 md:mb-0'
                    >
                        Add Product
                        <BiCartAdd className='inline-block ml-2' />
                    </button>
                    <div className='search flex items-center mt-2 md:mt-0'>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            type='search'
                            className='border p-2 rounded mr-4 outline-none'
                            placeholder='Search...'
                        />
                        <BiSolidSearchAlt2 className='text-gray-500' />
                    </div>
                    <div className='category-dropdown'>
                        <label htmlFor='category'>Filter by Category: </label>
                        <select
                            id='category'
                            onChange={handleCategoryChange}
                            value={selectedCategory}
                        >
                            <option value=''>All Categories</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='overflow-x-auto'>
                    <table className='w-full bg-white border rounded-lg shadow-lg'>
                        <thead className='bg-gray-100'>
                            <tr>
                                <th className='px-4 py-3 text-left min-w-[150px]'>
                                    Product
                                </th>
                                <th className='px-4 py-3 text-left min-w-[150px]'>
                                    Category
                                </th>
                                <th className='px-4 py-3 text-left min-w-[150px]'>
                                    Price
                                </th>
                                <th className='px-4 py-3 text-left min-w-[150px]'>
                                    Quantity
                                </th>
                                <th className='px-4 py-3 text-left min-w-[150px]'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products &&
                                products
                                    .filter(
                                        (product) =>
                                            product?.product_name
                                                .toLowerCase()
                                                .includes(
                                                    search.toLowerCase()
                                                ) &&
                                            (selectedCategory === '' ||
                                                product?.category_id._id ===
                                                    selectedCategory)
                                        // product?.category_id.name.toLowerCase().includes(search.toLowerCase())
                                    )
                                    .map((product) => (
                                        <tr
                                            className='hover:bg-gray-50'
                                            key={product._id}
                                        >
                                            <td className='px-4 py-3'>
                                                {product?.product_name}
                                            </td>
                                            <td className='px-4 py-3'>
                                                {product?.category_id.name
                                                    ? product?.category_id.name
                                                    : categories.find(
                                                          (cat) =>
                                                              cat._id ===
                                                              product?.category_id
                                                      )?.name}
                                            </td>
                                            <td className='px-4 py-3'>
                                                {product?.price}
                                            </td>
                                            <td className='px-4 py-3 text-red-500'>
                                                {product?.quantity}
                                            </td>
                                            <td className='px-4 py-3'>
                                                <button
                                                    className='text-blue-500 hover:underline'
                                                    onClick={() =>
                                                        setEditModel(product)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className='text-red-500 hover:underline ml-2'
                                                    onClick={() =>
                                                        setDeleteModel(
                                                            product._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Products;

// import { BiCartAdd, BiSolidSearchAlt2 } from 'react-icons/bi';
// import Layout from '../../layouts/Layout';
// import Model from '../../components/products/Model';
// import DModel from '../../components/products/DeleteModel';
// import EModel from '../../components/products/EditModel';
// import { useEffect,useState } from 'react';
// import axios from 'axios';

// const Products = () => {
//     const [products, setProducts] = useState([]);
//     const [search, setSearch] = useState('');
//     const [showModel, setShowModel] = useState(false);
//     const [deleteModel, setDeleteModel] = useState('');
//     const [editModel, setEditModel] = useState();

//     useEffect(()=>{
//         getProducts();
//     },[])

//     const getProducts = () => {
//         axios.get('http://localhost:8000/v1/products').then((res)=>{
//             setProducts(res.data.data);
//         }).catch((err)=>{
//             console.log(err);
//         })
//     }
//     return (
//         <Layout>
//             {showModel && <Model showModel={showModel} setShowModel={setShowModel} getProducts={getProducts} />}
//             {deleteModel && <DModel showModel={deleteModel} setShowModel={setDeleteModel} getProducts={getProducts} />}
//             {editModel && <EModel showModel={editModel} setShowModel={setEditModel} getProducts={getProducts} />}

//             <div className='p-5'>
//                 <div className='flex justify-between items-center mb-6'>
//                     <button onClick={()=>setShowModel(true)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5'>
//                         Add Product
//                         <BiCartAdd className='inline-block ml-2' />
//                     </button>
//                     <div className='search flex items-center'>
//                         <input onChange={(e)=>setSearch(e.target.value)} type='search' className='border p-2 rounded mr-4 outline-none' placeholder='Search...' />
//                         <BiSolidSearchAlt2 className='text-gray-500' />
//                     </div>
//                 </div>
//                 <table className='w-full bg-white border rounded-lg shadow-lg'>
//                     <thead className='bg-gray-100'>
//                         <tr>
//                             <th className='px-4 py-3 text-left'>Product</th>
//                             <th className='px-4 py-3 text-left'>Category</th>
//                             <th className='px-4 py-3 text-left'>Price</th>
//                             <th className='px-4 py-3 text-left'>Quantity</th>
//                             <th className='px-4 py-3 text-left'>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             products &&
//                             products
//                             .filter((product)=> product?.product_name.toLowerCase().includes(search.toLowerCase()) || product.category_id.name.toLowerCase().includes(search.toLowerCase()))
//                             .map
//                             ((product)=> (
//                                 <tr className='hover:bg-gray-50'>
//                                     <td className='px-4 py-3'>{product?.product_name}</td>
//                                     <td className='px-4 py-3'>{product?.category_id.name}</td>
//                                     <td className='px-4 py-3'>{product?.price}</td>
//                                     <td className='px-4 py-3 text-red-500'>{product?.quantity}</td>
//                                     <td className='px-4 py-3'>
//                                         <button className='text-blue-500 hover:underline' onClick={()=>setEditModel(product)}>
//                                             Edit
//                                         </button>
//                                         <button className='text-red-500 hover:underline ml-2' onClick={()=>setDeleteModel(product._id)}>
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </Layout>
//     );
// };

// export default Products;
