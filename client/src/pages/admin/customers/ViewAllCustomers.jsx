import { useEffect } from 'react';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../../features/customers/customersSlice';
import Layout from '../../../layouts/Layout';
import CustomersTable from '../../../components/Customers/CustomersTable';
import LoadingSpinner from '../../../components/LoadingSpinner';
// import { useGetAllCustomersQuery } from '../../../app/api/customerApi';

const ViewAllCustomers = () => {
    const dispatch = useDispatch();
    const { isLoading, data, error } = useSelector((state) => state.customers);

    // const { isLoading, isFetching, isError, error, data } =
    //     useGetAllCustomersQuery();

    useEffect(() => {
        dispatch(fetchCustomers());

        if (error) {
            NProgress.done();
            const err = error;
            if (Array.isArray(err.data.error)) {
                err.data.error.forEach((el) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                const resMessage =
                    err.data.message ||
                    err.data.detail ||
                    err.message ||
                    err.toString();
                toast.error(resMessage, {
                    position: 'top-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isLoading && error) {
        return <div>Error: {error}</div>;
    }

    console.log('customer from view all customer', data);
    return (
        <Layout>
            {data && (
                <CustomersTable loading={isLoading} data={data} error={error} />
            )}
        </Layout>
    );
};
export default ViewAllCustomers;
