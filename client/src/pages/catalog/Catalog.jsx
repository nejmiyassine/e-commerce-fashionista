import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../components/LoadingSpinner';
import CatalogProducts from '../../components/Catalog/CatalogProducts';
import CatalogSidebar from '../../components/Catalog/CatalogSidebar';

// import { fetchProducts } from '../../features/products/productsThunk';
import { getAllCategories } from '../../features/categories/categoriesSlice';
import { getAllProducts } from '../../features/products/productsSlice';

const Catalog = () => {
    const dispatch = useDispatch();
    const { products, isLoading: isProductsLoading } = useSelector(
        (state) => state.products
    );
    const { categories, isLoading } = useSelector((state) => state.categories);

    const [selected, setSelected] = useState(['watch']);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAllCategories());
                await dispatch(getAllProducts());
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

        // if (hasSearchFilter && Array.isArray(filteredProducts)) {
        //     filteredProducts = filteredProducts.filter((user) =>
        //         user.username.toLowerCase().includes(filterValue.toLowerCase())
        //     );
        // }

        if (Array.isArray(filteredProducts)) {
            filteredProducts = filteredProducts.filter((product) =>
                Array.from(selected).includes(product.category_id.name)
            );
        }

        return filteredProducts;
    }, [products, selected]);

    if (isLoading || isProductsLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='flex gap-4 p-6'>
            <aside className='w-1/6'>
                <CatalogSidebar
                    categories={categories}
                    selected={selected}
                    setSelected={setSelected}
                />
            </aside>
            <div className='w-5/6'>
                {filteredProduct.length ? (
                    <CatalogProducts
                        selected={selected}
                        products={filteredProduct}
                    />
                ) : (
                    <CatalogProducts selected={selected} products={products} />
                )}
            </div>
        </div>
    );
};

export default Catalog;
