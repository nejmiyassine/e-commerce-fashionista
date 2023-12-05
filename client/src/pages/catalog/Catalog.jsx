import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../components/LoadingSpinner';
import CatalogProducts from '../../components/Catalog/CatalogProducts';
import CatalogSidebar from '../../components/Catalog/CatalogSidebar';

// import { fetchProducts } from '../../features/products/productsThunk';
import { getAllCategories } from '../../features/categories/categoriesSlice';
import { getAllProducts } from '../../features/products/productsSlice';
import Navbar from '../../layouts/Navbar';
import BagProductsSidebar from '../../layouts/BagProductsSidebar';
import { Pagination } from '@nextui-org/react';

const Catalog = () => {
    const dispatch = useDispatch();
    const { products, isLoading: isProductsLoading } = useSelector(
        (state) => state.products
    );
    const { categories, isLoading } = useSelector((state) => state.categories);

    const [selected, setSelected] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [columnCount, setColumnCount] = useState(2);

    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [page, setPage] = useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const handleColumnChange = (newColumnCount) => {
        setColumnCount(newColumnCount);
    };

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue('');
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(getAllCategories());
                dispatch(getAllProducts());
            } catch (error) {
                // Handle errors
                toast.error(error.data.message, {
                    position: 'bottom-right',
                });
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const filteredProduct = useMemo(() => {
        let filteredProducts = products;

        if (hasSearchFilter && Array.isArray(filteredProducts)) {
            filteredProducts = filteredProducts.filter((product) =>
                product.product_name
                    .toLowerCase()
                    .includes(filterValue.toLowerCase())
            );
        }

        if (Array.isArray(filteredProducts) && selected.length > 0) {
            filteredProducts = filteredProducts.filter((product) =>
                Array.from(selected).includes(product.category_id.name)
            );
        }

        if (Array.isArray(filteredProducts) && selectedPrice.length > 0) {
            filteredProducts = filteredProducts.filter(
                (product) =>
                    product.price >= selectedPrice[0] &&
                    product.price <= selectedPrice[1]
            );
        }

        return filteredProducts;
    }, [products, hasSearchFilter, selected, selectedPrice, filterValue]);

    const pages = useMemo(() => {
        return products?.length ? Math.ceil(products.length / rowsPerPage) : 0;
    }, [products?.length, rowsPerPage]);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        if (Array.isArray(filteredProduct))
            return filteredProduct.slice(start, end);
    }, [page, filteredProduct, rowsPerPage]);

    const bottomContent = useMemo(() => {
        return (
            <div className='py-2 px-2 flex justify-between items-center'>
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
                            <option value='6'>6</option>
                            <option value='10'>10</option>
                            <option value='16'>16</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [onRowsPerPageChange, page, pages, products, hasSearchFilter]);

    if (isLoading || isProductsLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Navbar />
            <div className='flex gap-4 p-6'>
                <aside className='w-1/6'>
                    <CatalogSidebar
                        categories={categories}
                        selected={selected}
                        setSelected={setSelected}
                        selectedPrice={selectedPrice}
                        setSelectedPrice={setSelectedPrice}
                    />
                </aside>
                <div className='w-full'>
                    {items && (
                        <CatalogProducts
                            selected={selected}
                            selectedPrice={selectedPrice}
                            products={items}
                            filterValue={filterValue}
                            cols={columnCount}
                            handleChangeCols={handleColumnChange}
                            onSearchChange={onSearchChange}
                            bottomContent={bottomContent}
                        />
                    )}
                    {bottomContent}
                </div>
            </div>

            <BagProductsSidebar />
        </>
    );
};

export default Catalog;
