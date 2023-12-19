import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiCartAdd } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { Input, Pagination, Select, SelectItem } from '@nextui-org/react';
import { Link } from 'react-router-dom';

import Layout from '../../../layouts/Layout';
import DeleteProduct from '../../../components/products/DeleteProduct';
import { getAllProducts } from '../../../features/products/productsSlice';
import { getAllCategories } from '../../../features/categories/categoriesSlice';
import ProductCard from '../../../components/products/ProductCard';

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const categories = useSelector((state) => state.categories.categories);

    const [search, setSearch] = useState('');
    const [deleteModel, setDeleteModel] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const hasSearchFilter = Boolean(search);

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setSearch(''); // Clear search when a category is selected
    };

    useEffect(() => {
        setPage(1); // Reset page to 1 when selected category changes
    }, [selectedCategory]);

    const pages = useMemo(() => {
        const filteredProducts = products.filter(
            (product) =>
                product?.product_name
                    .toLowerCase()
                    .includes(search.toLowerCase()) &&
                (selectedCategory === '' ||
                    product?.category_id._id === selectedCategory)
        );

        return filteredProducts?.length
            ? Math.ceil(filteredProducts.length / rowsPerPage)
            : 0;
    }, [products, rowsPerPage, search, selectedCategory]);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        if (Array.isArray(products)) return products.slice(start, end);
    }, [page, products, rowsPerPage]);

    const bottomContent = useMemo(() => {
        return (
            <div className='mt-6 px-2 flex justify-between items-center'>
                {pages > 0 ? (
                    <Pagination
                        showControls
                        classNames={{
                            cursor: 'bg-foreground text-background',
                        }}
                        color='default'
                        variant='light'
                        page={page}
                        total={pages}
                        isDisabled={hasSearchFilter}
                        onChange={setPage}
                    />
                ) : null}

                <div className='flex justify-between gap-2 items-center'>
                    <span className='text-default-400 text-md'>
                        Total {products && products.length} products:
                    </span>
                    <label className='flex items-center text-default-400 text-small'>
                        rows per page:
                        <select
                            className='bg-transparent outline-none text-default-400 text-small'
                            onChange={onRowsPerPageChange}
                        >
                            <option value='10'>10</option>
                            <option value='16'>16</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [onRowsPerPageChange, page, pages, products, hasSearchFilter]);

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
                    <div className='category-dropdown flex items-center gap-2 w-40'>
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

                <div className='grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {items ? (
                        items
                            .filter(
                                (product) =>
                                    product?.product_name
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) &&
                                    (selectedCategory === '' ||
                                        product?.category_id._id ===
                                            selectedCategory)
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
                {bottomContent}
            </div>
        </Layout>
    );
};

export default Products;
