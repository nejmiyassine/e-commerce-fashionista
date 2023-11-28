import { HiOutlineViewGrid, HiOutlineViewGridAdd } from 'react-icons/hi';

/* eslint-disable react/prop-types */
const CatalogChangeLayout = ({ cols, handleChangeCols }) => {
    return (
        <div className='flex items-center gap-4'>
            <div
                className={`transition-all duration-300 ${
                    cols === 3 && 'bg-primaryColor-blueCyan text-white'
                } p-1 rounded-md`}
            >
                <HiOutlineViewGrid
                    size={20}
                    className='cursor-pointer'
                    onClick={() => handleChangeCols(3)}
                />
            </div>

            <div
                className={`transition-all duration-300 ${
                    cols === 4 && 'bg-primaryColor-blueCyan text-white'
                } p-1 rounded-md`}
            >
                <HiOutlineViewGridAdd
                    size={20}
                    className='cursor-pointer'
                    onClick={() => handleChangeCols(4)}
                />
            </div>
        </div>
    );
};

export default CatalogChangeLayout;
