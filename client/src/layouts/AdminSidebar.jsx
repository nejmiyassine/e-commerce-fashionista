import PropTypes from 'prop-types';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { sidebarItemsData } from '../data/sidebarItemsData';
import SidebarItem from '../components/SidebarItem';
import Logo from '../assets/logo.svg';

const AdminSidebar = ({ expanded, toggleSidebar }) => {
    return (
        <aside
            className={`fixed z-50 h-screen transition-all ${
                expanded ? 'w-2/12' : 'w-18'
            }`}
        >
            <nav className='h-full flex flex-col border-r border-gray-300 dark:border-gray-600 shadow-sm bg-white dark:bg-primary-deepDark dark:text-primary-dark'>
                <div className='h-14 overflow-hidden flex justify-around items-center'>
                    <img
                        className={`w-full h-7 object-fill overflow-hidden transition-all ${
                            expanded ? 'w-30' : 'hidden'
                        }`}
                        src={Logo}
                        alt='store logo'
                    />

                    <Disclosure as='nav'>
                        <div className='flex items-center'>
                            <Disclosure.Button
                                onClick={toggleSidebar}
                                className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition-all hover:text-gray-600 dark:hover:text-white'
                            >
                                <span className='absolute -inset-0.5' />
                                <span className='sr-only'>Open main menu</span>
                                {expanded ? (
                                    <XMarkIcon
                                        className='block h-6 w-6'
                                        aria-hidden='true'
                                    />
                                ) : (
                                    <Bars3Icon
                                        className='block h-6 w-6'
                                        aria-hidden='true'
                                    />
                                )}
                            </Disclosure.Button>
                        </div>
                    </Disclosure>
                </div>

                <ul className='flex flex-col gap-2 pt-3 px-3'>
                    {sidebarItemsData &&
                        sidebarItemsData.map((item, idx) => (
                            <SidebarItem
                                key={idx}
                                Icon={item.icon}
                                text={item.text}
                                path={item.path}
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
    toggleSidebar: PropTypes.func,
};
