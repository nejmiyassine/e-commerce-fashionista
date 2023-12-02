import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiCartAdd } from 'react-icons/bi';
import Layout from '../../../layouts/Layout';
import DeleteProduct from '../../../components/products/DeleteProduct';

import { getAllProducts } from '../../../features/products/productsSlice';
import { getAllCategories } from '../../../features/categories/categoriesSlice';
import ProductCard from '../../../components/products/ProductCard';
import { Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { Input, Select, SelectItem } from '@nextui-org/react';

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const categories = useSelector((state) => state.categories.categories);

    const [search, setSearch] = useState('');
    const [deleteModel, setDeleteModel] = useState('');
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
            {deleteModel && (
                <DeleteProduct
                    showModel={deleteModel}
                    setShowModel={setDeleteModel}
                />
            )}

            <div className='p-5'>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6'>
                    <Link
                        to='/admin/add/product'
                        className='bg-black transition-all border border-white hover:border-black hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded mb-2 md:mb-0'
                    >
                        Add Product
                        <BiCartAdd className='inline-block ml-2' />
                    </Link>

                    <div className='search flex items-center mt-2 md:mt-0'>
                        <Input
                            isClearable
                            variant='underlined'
                            fullWidth
                            aria-label='product_name'
                            labelPlacement='outside'
                            type='text'
                            name='search'
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Product Name'
                            startContent={
                                <CiSearch
                                    size={20}
                                    className='text-2xl text-default-400 pointer-events-none flex-shrink-0'
                                />
                            }
                        />
                    </div>
                    <div className='category-dropdown flex items-center gap-2'>
                        <label htmlFor='category' className='text-sm w-full'>
                            Filter by:{' '}
                        </label>
                        <Select
                            isRequired
                            id='category'
                            className='w-full'
                            variant='underlined'
                            labelPlacement='outside'
                            placeholder='Select product category'
                            onChange={handleCategoryChange}
                            value={selectedCategory}
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
                </div>

                <div className={`grid grid-cols-3 gap-4`}>
                    {products ? (
                        products
                            .filter(
                                (product) =>
                                    product?.product_name
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) &&
                                    (selectedCategory === '' ||
                                        product?.category_id._id ===
                                            selectedCategory)
                                // product?.category_id.name.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    isAdmin={true}
                                    categories={categories}
                                    setDeleteModel={setDeleteModel}
                                />
                            ))
                    ) : (
                        <div>
                            <p>There are no product matching the search!</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Products;
