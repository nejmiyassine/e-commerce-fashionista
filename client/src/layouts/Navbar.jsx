/* eslint-disable react/prop-types */
import { FaShoppingBag } from 'react-icons/fa';
import { toggleBag } from '../features/bag/bagSlice';
import { useDispatch } from 'react-redux';
import { IoFilter } from 'react-icons/io5';

const Navbar = ({ toggleSidebar }) => {
    const dispatch = useDispatch();

    const openBagSidebar = () => {
        dispatch(toggleBag(true));
    };

    return (
        <div className='p-4 flex items-center gap-2'>
            <button onClick={openBagSidebar}>
                <FaShoppingBag size={22} />
            </button>

            <button onClick={toggleSidebar}>
                <IoFilter size={22} />
            </button>
        </div>
    );
};

export default Navbar;
