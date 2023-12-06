import { useParams } from 'react-router-dom';

import ProductDetailsSection from '../../../components/ProductDetailsSection';
import Layout from '../../../layouts/Layout';

const AdminProductDetails = () => {
    const { productId } = useParams();

    return (
        <Layout>
            <ProductDetailsSection productId={productId} isAdmin={true} />
        </Layout>
    );
};

export default AdminProductDetails;
