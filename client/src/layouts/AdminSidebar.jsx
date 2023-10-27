import PropTypes from 'prop-types';

import SidebarItem from '../components/SidebarItem';
import Logo from '../assets/logo.svg';

import { LuLayoutDashboard } from 'react-icons/lu';
import { LuUsers2 } from 'react-icons/lu';
import { BiUser } from 'react-icons/bi';
import { MdOutlineInventory2 } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import { PiUserListLight } from 'react-icons/pi';
import { MdOutlineDiscount } from 'react-icons/md';
import { HiOutlineShoppingBag } from 'react-icons/hi';

const AdminSidebar = ({ expanded }) => {
    const sidebarItems = [
        { icon: <LuLayoutDashboard size={20} />, text: 'Dashboard' },
        { icon: <MdOutlineDiscount size={20} />, text: 'Products' },
        { icon: <HiOutlineShoppingBag size={20} />, text: 'Orders' },
        { icon: <BiUser size={20} />, text: 'Customers' },
        { icon: <PiUserListLight size={20} />, text: 'Users' },
        { icon: <MdOutlineInventory2 size={20} />, text: 'Inventory' },
        { icon: <BiTransfer size={20} />, text: 'Transactions' },
        { icon: <LuUsers2 size={20} />, text: 'Sellers' },
    ];

    return (
        <aside className='h-screen'>
            <nav className='h-full flex flex-col border-r border-gray-300 dark:border-gray-600 shadow-sm bg-white dark:bg-primary-deepDark dark:text-primary-dark'>
                <div className='h-14 overflow-hidden flex justify-center items-center'>
                    <img
                        className={`w-full h-7 object-fill overflow-hidden transition-all ${
                            expanded ? 'w-32' : 'hidden'
                        }`}
                        src={Logo}
                        alt='store logo'
                    />
                </div>

                <ul className='flex flex-col gap-2 pt-3 px-3'>
                    {sidebarItems &&
                        sidebarItems.map((item, idx) => (
                            <SidebarItem
                                key={idx}
                                icon={item.icon}
                                text={item.text}
                                expanded={expanded}
                            />
                        ))}
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;

AdminSidebar.propTypes = {
    expanded: PropTypes.bool,
};
