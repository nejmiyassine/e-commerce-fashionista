import { useParams } from 'react-router-dom';

import ProductDetailsSection from '../components/ProductDetailsSection';
import CustomerNavbar from '../layouts/CustomerNavbar';

const ProductDetails = () => {
    const { productId } = useParams();

    return (
        <>
            <CustomerNavbar />
            <div className='container mx-auto'>
                <ProductDetailsSection productId={productId} isAdmin={false} />
            </div>
        </>
    );
};

export default ProductDetails;
