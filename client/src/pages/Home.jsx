import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2 className='font-bold text-2xl'>Home</h2>
            <Link
                className='text-blue-600 underline underline-offset-4'
                to='/admin/dashboard'
            >
                Dashboard
            </Link>
        </div>
    );
};

export default Home;
