import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import { FaChevronUp } from 'react-icons/fa';

import { getAllCategories } from '../../features/categories/categoriesSlice';
import LoadingSpinner from '../LoadingSpinner';

const CatalogSidebar = () => {
    const dispatch = useDispatch();
    const { categories, isLoading } = useSelector((state) => state.categories);

    const [isOpen, setIsOpen] = useState(true);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        dispatch(getAllCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

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
                        {!isLoading &&
                            categories &&
                            categories.map(({ _id, name }) => (
                                <div
                                    key={_id}
                                    className='flex items-center justify-between capitalize gap-2 pb-3'
                                >
                                    <Checkbox
                                        color='warning'
                                        value={name}
                                        size='sm'
                                    >
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
