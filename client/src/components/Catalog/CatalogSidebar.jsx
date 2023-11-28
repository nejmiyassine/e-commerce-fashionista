import PropTypes from 'prop-types';
import { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import { FaChevronUp } from 'react-icons/fa';

const CatalogSidebar = ({ categories, selected, setSelected }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='flex flex-col gap-3'>
            <div
                className='flex items-center justify-between cursor-pointer'
                onClick={handleToggle}
            >
                <h2 className='text-lg font-semibold'>All Categories</h2>
                <FaChevronUp
                    size={12}
                    className={`transform transition ${
                        !isOpen && 'rotate-180'
                    } text-gray-400`}
                />
            </div>

            {isOpen && (
                <div className='mt-2 transition'>
                    <CheckboxGroup value={selected} onChange={setSelected}>
                        {categories.map(({ _id, name }) => (
                            <div
                                key={_id}
                                className='flex items-center justify-between capitalize gap-2 pb-3'
                            >
                                <Checkbox value={name} size='sm'>
                                    <span>{name}</span>
                                </Checkbox>
                                <p className='text-gray-400 text-sm'>32</p>
                            </div>
                        ))}
                    </CheckboxGroup>

                    <div className='pt-3' />
                    <hr />
                </div>
            )}
        </div>
    );
};

export default CatalogSidebar;

CatalogSidebar.propTypes = {
    categories: PropTypes.array,
    selected: PropTypes.array,
    setSelected: PropTypes.func,
};
