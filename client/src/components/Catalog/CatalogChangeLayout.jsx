import { HiOutlineViewGrid, HiOutlineViewGridAdd } from 'react-icons/hi';

const layoutOptions = [
    { cols: 2, icon: <HiOutlineViewGrid size={20} />, label: '2 Columns' },
    { cols: 3, icon: <HiOutlineViewGridAdd size={20} />, label: '3 Columns' },
    // Add more options as needed
];

/* eslint-disable react/prop-types */
const CatalogChangeLayout = ({ cols, handleChangeCols }) => {
    return (
        <div className='flex items-center gap-4'>
            {layoutOptions.map((option) => (
                <div
                    key={option.cols}
                    className={`flex items-center gap-1 cursor-pointer transition-all duration-300 ${
                        cols === option.cols
                            ? 'bg-primaryColor-orange text-white'
                            : ''
                    } p-1 rounded-md`}
                    onClick={() => handleChangeCols(option.cols)}
                >
                    {option.icon}
                    <span className='hidden md:inline'>{option.label}</span>
                    <span className='md:hidden'>{option.cols}</span>
                </div>
            ))}{' '}
        </div>
    );
};

export default CatalogChangeLayout;
