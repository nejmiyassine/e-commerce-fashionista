import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex items-center justify-between px-10'>
            <h2 className='font-bold text-2xl'>Home</h2>
            <div className='flex items-center gap-2'>
                <Link
                    className='text-blue-600 underline underline-offset-4'
                    to='/admin/dashboard'
                >
                    Dashboard
                </Link>
                <Link
                    className='text-blue-600 underline underline-offset-4'
                    to='/admin/login'
                >
                    Admin Login
                </Link>
                <Link
                    className='text-blue-600 underline underline-offset-4'
                    to='/login'
                >
                    Login
                </Link>
                <Link
                    className='text-blue-600 underline underline-offset-4'
                    to='/catalog'
                >
                    Catalog
                </Link>
            </div>
        </div>
    );
};

export default Home;
