import PropTypes from 'prop-types';
import { useToggleSidebar } from '../hooks/useToggleSidebar';

const SidebarItem = ({ icon, text, active }) => {
    const { expanded } = useToggleSidebar();

    return (
        <li
            className={`relative group flex gap-2 items-center py-2 px-3 my-1 text-sm font-medium rounded-md cursor-pointer  ${
                active
                    ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
                    : 'hover:bg-indigo-50 hover:text-primary-light text-primary-light dark:text-primary-dark hover:dark:text-primary-light'
            }`}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${
                    expanded ? 'w-32 ml-3' : 'w-0'
                } `}
            >
                {text}
            </span>

            {!expanded && (
                <div
                    className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:-translate-x-0`}
                >
                    {text}
                </div>
            )}
        </li>
    );
};

export default SidebarItem;

SidebarItem.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string,
    active: PropTypes.bool,
};
