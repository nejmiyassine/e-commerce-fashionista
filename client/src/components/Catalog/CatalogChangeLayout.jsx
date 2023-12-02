import { BsFillGrid3X3GapFill, BsFillGridFill } from 'react-icons/bs';

const layoutOptions = [
    { cols: 3, icon: <BsFillGrid3X3GapFill size={20} /> },
    { cols: 2, icon: <BsFillGridFill size={18} /> },
];

/* eslint-disable react/prop-types */
const CatalogChangeLayout = ({ cols, handleChangeCols }) => {
    return (
        <div className='flex items-center border'>
            {layoutOptions.map((option) => (
                <div
                    key={option.cols}
                    className={`flex items-center p-[6px] gap-1 cursor-pointer transition-all duration-300 ${
                        cols === option.cols
                            ? 'bg-gray-300/50 text-black'
                            : 'text-gray-500'
                    } p-1`}
                    onClick={() => handleChangeCols(option.cols)}
                >
                    {option.icon}
                </div>
            ))}{' '}
        </div>
    );
};

export default CatalogChangeLayout;
