import { LuLayoutDashboard } from 'react-icons/lu';
import { BiUser, BiCategory, BiCategoryAlt } from 'react-icons/bi';
import { MdOutlineDiscount } from 'react-icons/md';
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
];
