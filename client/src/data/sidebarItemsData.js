import { LuLayoutDashboard, LuUsers2 } from 'react-icons/lu';
import { BiUser, BiCategory, BiCategoryAlt, BiTransfer } from 'react-icons/bi';
import { MdOutlineDiscount, MdOutlineInventory2 } from 'react-icons/md';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { UsersIcon } from '../icons/Icons';

export const sidebarItemsData = [
    {
        icon: LuLayoutDashboard,
        text: 'Dashboard',
        path: '/admin/dashboard',
    },
    {
        icon: BiUser,
        text: 'Customers',
        path: '/admin/customers',
    },
    {
        icon: UsersIcon,
        text: 'Users',
        path: '/admin/users',
    },
    {
        icon: MdOutlineDiscount,
        text: 'Products',
        path: '/admin/products',
    },
    {
        icon: HiOutlineShoppingBag,
        text: 'Orders',
        path: '/admin/orders',
    },
    {
        icon: BiCategory,
        text: 'Categories',
        path: '/admin/categories',
    },
    {
        icon: BiCategoryAlt,
        text: 'Subcategories',
        path: '/admin/subcategories',
    },
    {
        icon: MdOutlineInventory2,
        text: 'Inventory',
        path: '/admin/dashboard',
    },
    {
        icon: BiTransfer,
        text: 'Transactions',
        path: '/admin/dashboard',
    },
    { icon: LuUsers2, text: 'Sellers', path: '/admin/dashboard' },
];
