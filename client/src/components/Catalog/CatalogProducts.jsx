import PropTypes from 'prop-types';
import { Input } from '@nextui-org/react';
import { CiSearch } from 'react-icons/ci';

import ProductCard from '../products/ProductCard';
import Line from '../Line';
import CatalogChangeLayout from './CatalogChangeLayout';

const CatalogProducts = ({
    selected,
    selectedPrice,
    products,
    filterValue,
    onSearchChange,
    cols,
    handleChangeCols,
    bottomContent,
}) => {
    return (
        <section className='px-4'>
            <div className='text-sm flex items-center gap-2'>
                <span className='text-gray-500'>Selected Filters: </span>
                {selected.map((select) => (
                    <span
                        key={select}
                        className='font-semibold capitalize py-1 px-2 bg-black text-white rounded-md'
                    >
                        {select}
                    </span>
                ))}
                {selectedPrice.map((select) => (
                    <span
                        key={select}
                        className='font-semibold capitalize p-1 bg-gray-300/50 rounded-md'
                    >
                        ${select}
                    </span>
                ))}
            </div>

            <Line />

            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-2xl capitalize'>
                    {selected.length ? selected[0] : 'All Products'}
                </h2>

                <div className='flex'>
                    <Input
                        isClearable
                        variant='underlined'
                        fullWidth
                        aria-label='product_name'
                        labelPlacement='outside'
                        type='text'
                        name='search'
                        value={filterValue}
                        onValueChange={onSearchChange}
                        placeholder='Product Name'
                        startContent={
                            <CiSearch
                                size={20}
                                className='text-2xl text-default-400 pointer-events-none flex-shrink-0'
                            />
                        }
                    />
                </div>

                <div className='hidden md:block'>
                    <CatalogChangeLayout
                        cols={cols}
                        handleChangeCols={handleChangeCols}
                    />
                </div>
            </div>

            <Line />

            <div
                className={`grid grid-col-1 md:${
                    cols === 2 ? 'grid-cols-2' : 'grid-cols-3'
                } gap-4`}
            >
                {products.length ? (
                    products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            bottomContent={bottomContent}
                            isAdmin={false}
                        />
                    ))
                ) : (
                    <div>
                        <p>There are no product matching the search!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CatalogProducts;

CatalogProducts.propTypes = {
    products: PropTypes.array,
    selected: PropTypes.array,
    selectedPrice: PropTypes.array,
    filterValue: PropTypes.string,
    onSearchChange: PropTypes.any,
    cols: PropTypes.any,
    handleChangeCols: PropTypes.any,
    bottomContent: PropTypes.any,
};
