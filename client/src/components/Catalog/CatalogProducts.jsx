import PropTypes from 'prop-types';
import { useState } from 'react';

import ProductCard from '../products/ProductCard';
import Line from '../Line';
import CatalogChangeLayout from './CatalogChangeLayout';

const CatalogProducts = ({ selected, products }) => {
    const [cols, setCols] = useState(3);

    const handleChangeCols = (numOfCols) => {
        setCols(numOfCols);
    };

    return (
        <section className='px-4 border-l'>
            <div className='text-sm'>
                <span className='text-gray-500'>Home / </span>
                <span className='font-semibold capitalize'>
                    {selected.length ? selected[0] : 'All Products'}
                </span>
            </div>

            <Line />

            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-2xl capitalize'>
                    {selected.length ? selected[0] : 'All Products'}
                </h2>

                <CatalogChangeLayout
                    cols={cols}
                    handleChangeCols={handleChangeCols}
                />
            </div>

            <Line />

            <div className={`grid grid-cols-${cols} grid-flow-row gap-4`}>
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        cols={cols}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
};

export default CatalogProducts;

CatalogProducts.propTypes = {
    products: PropTypes.array,
    selected: PropTypes.array,
};
