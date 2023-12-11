import { useParams } from 'react-router-dom';

import ProductDetailsSection from '../components/ProductDetailsSection';
import Navbar from '../layouts/Navbar';

const ProductDetails = () => {
    const { productId } = useParams();

    return (
        <>
            <Navbar />
            <div className='container mx-auto'>
                <ProductDetailsSection productId={productId} isAdmin={false} />
            </div>
        </>
    );
};

export default ProductDetails;
