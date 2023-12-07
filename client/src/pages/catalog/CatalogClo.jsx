import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import LoadingSpinner from '../../components/LoadingSpinner';
import CatalogProducts from '../../components/Catalog/CatalogProducts';
import CatalogSidebar from '../../components/Catalog/CatalogSidebar';
import { getAllCategories } from '../../features/categories/categoriesSlice';
import { getAllProducts } from '../../features/products/productsSlice';
import BagProductsSidebar from '../../layouts/BagProductsSidebar';
import Navbar from '../../components/LandingPage/Navbar';

const Catalogclo = () => {
  const dispatch = useDispatch();
  const { products, isLoading: isProductsLoading } = useSelector(
    (state) => state.products
  );
  const { categories, isLoading } = useSelector((state) => state.categories);

  const [selected, setSelected] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [cols, setCols] = useState(2);

  const hasSearchFilter = Boolean(filterValue);

  const handleChangeCols = (numOfCols) => {
    setCols((prevCols) => (prevCols === numOfCols ? prevCols : numOfCols));
  };

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
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

  const handleFilterButtonClick = () => {
    const filterOptions = {
      category: selected.join(','),
      minPrice: selectedPrice[0],
      maxPrice: selectedPrice[1],
      search: filterValue,
    };

 
  };

  const filteredProduct = useMemo(() => {
    let filteredProducts = products;

    if (hasSearchFilter && Array.isArray(filteredProducts)) {
      filteredProducts = filteredProducts.filter((product) =>
        product.product_name.toLowerCase().includes(filterValue.toLowerCase())
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
          product.price >= selectedPrice[0] && product.price <= selectedPrice[1]
      );
    }

    return filteredProducts;
  }, [products, hasSearchFilter, selected, selectedPrice, filterValue]);

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
          <button onClick={handleFilterButtonClick}>Apply Filters</button>
        </aside>
        <div className='w-full'>
          {filteredProduct && (
            <CatalogProducts
              selected={selected}
              selectedPrice={selectedPrice}
              products={filteredProduct}
              filterValue={filterValue}
              cols={cols}
              handleChangeCols={handleChangeCols}
              onSearchChange={onSearchChange}
            />
          )}
        </div>
      </div>
      <BagProductsSidebar />
    </>
  );
};

export default Catalogclo;
