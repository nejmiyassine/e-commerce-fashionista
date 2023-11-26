import { useDispatch, useSelector } from 'react-redux';
import CatalogProducts from '../../components/Catalog/CatalogProducts';
import CatalogSidebar from '../../components/Catalog/CatalogSidebar';
import { useEffect, useMemo } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getAllCategories } from '../../features/categories/categoriesSlice';
import { fetchProducts } from '../../features/products/productsThunk';
import { toast } from 'react-toastify';

const Catalog = () => {
    const dispatch = useDispatch();
    const { products, isLoading: isProductsLoading } = useSelector(
        (state) => state.products
    );
    const { categories, isLoading } = useSelector((state) => state.categories);
    const memoizedCategories = useMemo(() => categories, [categories]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAllCategories());
                await dispatch(fetchProducts(categories));
            } catch (error) {
                // Handle errors
                toast.error(error.data.message, {
                    position: 'bottom-right',
                });
                console.log(error.data);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    if (isLoading || isProductsLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='flex gap-4 p-6'>
            <aside className='w-1/6'>
                <CatalogSidebar categories={memoizedCategories} />
            </aside>
            <div className='w-5/6'>
                {products.map((product) => (
                    <CatalogProducts key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Catalog;
