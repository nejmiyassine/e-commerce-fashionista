import PropTypes from 'prop-types';
import { useState } from 'react';
import { TbColumns2, TbColumns3 } from 'react-icons/tb';

import ProductCard from '../products/ProductCard';

const CatalogProducts = ({ product }) => {
    const [cols, setCols] = useState(4);

    const handleChangeCols = (numOfCols) => {
        setCols(numOfCols);
    };

    return (
        <section className='px-4 border-l'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='font-bold text-xl'>CatalogProducts</h2>

                <div className='flex items-center gap-4'>
                    <TbColumns2
                        size={20}
                        className='cursor-pointer'
                        onClick={() => handleChangeCols(2)}
                    />
                    <TbColumns3
                        size={20}
                        className='cursor-pointer'
                        onClick={() => handleChangeCols(3)}
                    />
                    <div
                        className='cursor-pointer text-sm'
                        onClick={() => handleChangeCols(4)}
                    >
                        Default
                    </div>
                </div>
            </div>

            <div className='products'>
                <ProductCard cols={cols} product={product} />
            </div>
        </section>
    );
};

export default CatalogProducts;

CatalogProducts.propTypes = {
    product: PropTypes.object,
};
