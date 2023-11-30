/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';

const CatalogSidebarItem = ({ title, children }) => {
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
                <h2 className='text-sm font-semibold'>{title}</h2>
                <FaChevronUp
                    size={12}
                    className={`transform transition ${
                        !isOpen && 'rotate-180'
                    } text-gray-400`}
                />
            </div>

            {isOpen && <div className='mt-2 transition'>{children}</div>}

            <hr />
        </div>
    );
};

export default CatalogSidebarItem;
