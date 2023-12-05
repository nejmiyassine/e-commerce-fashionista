import PropTypes from 'prop-types';
import { Checkbox, CheckboxGroup, Radio, RadioGroup } from '@nextui-org/react';

import CatalogSidebarItem from './CatalogSidebarItem';
import { prices } from '../../data/prices';
import { IoFilter } from 'react-icons/io5';

const CatalogSidebar = ({
    categories,
    selected,
    setSelected,
    selectedPrice,
    setSelectedPrice,
    isSidebarOpen,
    toggleSidebar,
}) => {
    return (
        <div className={`flex flex-col gap-3 ${isSidebarOpen ? 'w-full' : ''}`}>
            <button onClick={toggleSidebar} className='toggle-button'>
                <IoFilter size={22} />
            </button>

            {/* All Categories */}
            <CatalogSidebarItem title='Filter By Categories'>
                <CheckboxGroup value={selected} onValueChange={setSelected}>
                    {categories.map(({ _id, name }) => (
                        <div
                            key={_id}
                            className='flex items-center justify-between capitalize gap-2 pb-3'
                        >
                            <Checkbox value={name} size='sm' color='warning'>
                                <span>{name}</span>
                            </Checkbox>
                        </div>
                    ))}
                </CheckboxGroup>
            </CatalogSidebarItem>

            {/* Price Filter */}
            <CatalogSidebarItem title='Filter By Price'>
                <RadioGroup
                    value={selectedPrice}
                    onValueChange={setSelectedPrice}
                >
                    {prices &&
                        prices?.map(({ _id, name, range }) => (
                            <div
                                key={_id}
                                className='flex items-center justify-between capitalize gap-2 pb-3'
                            >
                                <Radio value={range} size='sm' color='warning'>
                                    {name}
                                </Radio>
                            </div>
                        ))}
                </RadioGroup>
            </CatalogSidebarItem>
        </div>
    );
};

export default CatalogSidebar;

CatalogSidebar.propTypes = {
    categories: PropTypes.array,
    selected: PropTypes.array,
    setSelected: PropTypes.func,
    selectedPrice: PropTypes.array,
    setSelectedPrice: PropTypes.func,
    isSidebarOpen: PropTypes.bool,
    toggleSidebar: PropTypes.func,
};
