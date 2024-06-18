import PropTypes from 'prop-types';
import { Input } from '@nextui-org/react';
import { CiSearch } from 'react-icons/ci';
import * as Io from 'react-icons/io';

import ProductCard from '../products/ProductCard';
import Line from '../Line';

const CatalogProducts = ({
    selected,
    selectedPrice,
    setSelectedPrice,
    products,
    filterValue,
    onSearchChange,
    bottomContent,
    handleRemoveSelected,
}) => {
    return (
        <section className="px-4">
            {/* {selectedPrice.length > 0 ||
                (selected.length > 0 && ( */}
            <div className="text-sm flex items-center gap-2">
                <span className="text-gray-500">Selected Filters: </span>
                {selected.map((select) => (
                    <div
                        key={select}
                        className="p-1 pl-2 bg-black text-white rounded-md flex items-center justify-center gap-2"
                    >
                        <span className="font-semibold capitalize">
                            {select}
                        </span>
                        <Io.IoIosClose
                            size={20}
                            className="hover:cursor-pointer"
                            onClick={() => handleRemoveSelected(select)}
                        />
                    </div>
                ))}

                {selectedPrice.length > 0 ? (
                    <div className="p-1 pl-2 bg-black text-white rounded-md flex items-center justify-center gap-2">
                        <span className="font-semibold capitalize">
                            {selectedPrice[1] < 900
                                ? `$${selectedPrice[0]}, $${selectedPrice[1]}`
                                : `More than $${selectedPrice[0]}`}
                        </span>
                        <Io.IoIosClose
                            size={20}
                            className="hover:cursor-pointer"
                            onClick={() => setSelectedPrice([])}
                        />
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {/* ))} */}

            <Line />
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-2xl capitalize">
                    {selected.length ? selected[0] : 'All Products'}
                </h2>

                <div className="flex">
                    <Input
                        isClearable
                        variant="underlined"
                        fullWidth
                        aria-label="product_name"
                        labelPlacement="outside"
                        type="text"
                        name="search"
                        value={filterValue}
                        onValueChange={onSearchChange}
                        placeholder="Product Name"
                        startContent={
                            <CiSearch
                                size={20}
                                className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                            />
                        }
                    />
                </div>
            </div>
            <Line />
            <div className={`grid grid-cols-4 gap-8`}>
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
                        <p>There are no products matching the search!</p>
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
