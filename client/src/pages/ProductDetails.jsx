import { useParams } from 'react-router-dom';

import ProductDetailsSection from '@components/ProductDetailsSection';

const ProductDetails = () => {
    const { productId } = useParams();

    return (
        <div className="container mx-auto">
            <ProductDetailsSection productId={productId} isAdmin={false} />
        </div>
    );
};

export default ProductDetails;
