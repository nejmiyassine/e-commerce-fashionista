import UpdateCustomerComponent from '../../components/CustomersFront/UpdateCustomerComponent';
import NavbarCustomers from '../../components/CustomersFront/NavBarCustomers';
import LoadingSpinner from '../../components/LoadingSpinner';

import { useGetCustomerProfileDataQuery } from '../../app/api/customerApi';

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
            <NavbarCustomers customer={customer} />
            <UpdateCustomerComponent customer={customer} />
        </div>
    );
};

export default UpdateCustomerInfo;
