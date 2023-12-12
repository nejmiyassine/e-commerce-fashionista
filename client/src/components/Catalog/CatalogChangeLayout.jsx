import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { CiGrid2H } from 'react-icons/ci';

const layoutOptions = [
    { cols: 1, icon: <CiGrid2H size={16} /> },
    { cols: 4, icon: <BsFillGrid3X3GapFill size={16} /> },
];

/* eslint-disable react/prop-types */
const CatalogChangeLayout = ({ cols, handleChangeCols }) => {
    return (
        <div className='flex items-center gap-2'>
            {layoutOptions.map((option) => (
                <div
                    key={option.cols}
                    className={`flex items-center p-[6px] px-2 py-2 rounded-md focus:outline-none cursor-pointer transition-all duration-300 ${
                        cols === option.cols
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-300 text-gray-700'
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
