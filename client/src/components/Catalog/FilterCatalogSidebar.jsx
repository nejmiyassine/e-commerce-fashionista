import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Checkbox, CheckboxGroup, Radio, RadioGroup } from '@nextui-org/react';
import { IoCloseCircleOutline } from 'react-icons/io5';

import CatalogSidebarItem from './CatalogSidebarItem';
import FilterProductContext from '../../context/FilterProductContext';
import { prices } from '../../data/prices';

const FilterCatalogSidebar = ({
    categories,
    selected,
    setSelected,
    selectedPrice,
    setSelectedPrice,
}) => {
    const { isSidebarOpen, toggleSidebar } = useContext(FilterProductContext);

    return (
        <div className={`flex flex-col gap-3 ${isSidebarOpen ? 'w-full' : ''}`}>
            <div className="flex items-center justify-between pb-3">
                <h3 className="text-xl font-bold">Filter Products</h3>
                <button onClick={toggleSidebar} className="toggle-button">
                    <IoCloseCircleOutline size={22} />
                </button>
            </div>

            {/* All Categories */}
            <CatalogSidebarItem title="Filter By Categories">
                <CheckboxGroup value={selected} onValueChange={setSelected}>
                    {categories.map(({ _id, name }) => (
                        <div
                            key={_id}
                            className="flex items-center justify-between capitalize gap-2 pb-3"
                        >
                            <Checkbox value={name} size="sm" color="warning">
                                <span>{name}</span>
                            </Checkbox>
                        </div>
                    ))}
                </CheckboxGroup>
            </CatalogSidebarItem>

            {/* Price Filter */}
            <CatalogSidebarItem title="Filter By Price">
                <RadioGroup
                    value={selectedPrice}
                    onValueChange={setSelectedPrice}
                >
                    {prices &&
                        prices?.map(({ _id, name, range }) => (
                            <div
                                key={_id}
                                className="flex items-center justify-between capitalize gap-2 pb-3"
                            >
                                <Radio value={range} size="sm" color="warning">
                                    {name}
                                </Radio>
                            </div>
                        ))}
                </RadioGroup>
            </CatalogSidebarItem>
        </div>
    );
};

export default FilterCatalogSidebar;

FilterCatalogSidebar.propTypes = {
    categories: PropTypes.array,
    selected: PropTypes.array,
    setSelected: PropTypes.func,
    selectedPrice: PropTypes.array,
    setSelectedPrice: PropTypes.func,
};
