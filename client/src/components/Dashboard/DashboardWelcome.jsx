import { useSelector } from 'react-redux';

const DashboardWelcome = () => {
    const { user } = useSelector((state) => state.users);

    return (
        <div>
            <h2 className='text-xl font-semibold'>
                Welcome Back {user.username} 👋!
            </h2>
            <span className='text-sm text-gray-600 dark:text-gray-200'>
                Home - Dashboard
            </span>
        </div>
    );
};

export default DashboardWelcome;
