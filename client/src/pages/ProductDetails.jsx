import { Link, useParams } from 'react-router-dom';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';

import ProductDetailsSection from '../components/ProductDetailsSection';

const ProductDetails = () => {
    const { productId } = useParams();

    return (
        <div>
            <Link to='/shop' className='flex items-center gap-2'>
                <HiOutlineArrowSmLeft />
                Back to Shop Page
            </Link>
            <ProductDetailsSection productId={productId} isAdmin={false} />
        </div>
    );
};

export default ProductDetails;
