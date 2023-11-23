import { Link } from 'react-router-dom';
import { CiCircleChevLeft } from 'react-icons/ci';

const Unauthorized = () => {
    return (
        <div className='flex flex-col items-center justify-center text-center h-screen'>
            <h2 className='font-bold text-9xl'>401</h2>
            <h2 className='text-2xl'>Authorization required.</h2>
            <Link
                to='/'
                className='mt-2 flex items-center gap-2 text-blue-400 transition hover:text-blue-600'
            >
                <CiCircleChevLeft />
                <span>Back to Home</span>
            </Link>
        </div>
    );
};

export default Unauthorized;
