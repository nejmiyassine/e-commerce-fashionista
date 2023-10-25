import SidebarItem from '../components/SidebarItem';
import Logo from '../assets/logo.svg';

import { useToggleSidebar } from '../hooks/useToggleSidebar';

import { LuLayoutDashboard } from 'react-icons/lu';
import { LuUsers2 } from 'react-icons/lu';
import { BiUser } from 'react-icons/bi';
import { MdOutlineInventory2 } from 'react-icons/md';
import { MdAttachMoney } from 'react-icons/md';
import { AiOutlineInbox } from 'react-icons/ai';
import { BsBoxes } from 'react-icons/bs';

const AdminSidebar = () => {
    const { expanded } = useToggleSidebar();

    const sidebarItems = [
        { icon: <LuLayoutDashboard size={20} />, text: 'Dashboard' },
        { icon: <BiUser size={20} />, text: 'Customers' },
        { icon: <LuUsers2 size={20} />, text: 'Users' },
        { icon: <AiOutlineInbox size={20} />, text: 'Orders' },
        { icon: <BsBoxes size={20} />, text: 'Products' },
        { icon: <MdOutlineInventory2 size={20} />, text: 'Inventory' },
        { icon: <MdAttachMoney size={20} />, text: 'Billings' },
    ];

    return (
        <aside className='h-screen'>
            <nav className='h-full flex flex-col border-r border-gray-300 dark:border-gray-600 shadow-sm bg-white dark:bg-gray-900 dark:text-white'>
                <div className='h-14 overflow-hidden p-4 pb-2 flex justify-center items-center'>
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
                            />
                        ))}
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
