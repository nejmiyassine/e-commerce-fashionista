import UpdateCustomerComponent from '../../components/CustomersFront/UpdateCustomerComponent';
import LoadingSpinner from '../../components/LoadingSpinner';

import { useGetCustomerProfileDataQuery } from '../../app/api/customerApi';
import Navbar from '../../layouts/Navbar';

const UpdateCustomerInfo = () => {
    const {
        data: customer,
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetCustomerProfileDataQuery();

    if (isLoading || isFetching) {
        return <LoadingSpinner />;
    }

    if (!isLoading && isError) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Navbar />
            <UpdateCustomerComponent customer={customer} />
        </div>
    );
};

export default UpdateCustomerInfo;
