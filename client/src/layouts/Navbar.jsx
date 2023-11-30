import { toggleBag } from '../features/bag/bagSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch();

    const openBagSidebar = () => {
        dispatch(toggleBag(true));
    };

    return (
        <div>
            <button onClick={openBagSidebar}>Open sidebar</button>
        </div>
    );
};

export default Navbar;
