import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../../features/customers/customersSlice';
import TableCustomer from '../../../components/Customers/CustomersTable';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Layout from '../../../layouts/Layout';

const ViewAllCustomers = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.customers);
    console.log('data from customers view', data);

    useEffect(() => {
        dispatch(fetchCustomers());
        console.log('view', dispatch(fetchCustomers()));
    }, [dispatch]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!loading && error) {
        return <div>Error: {error}</div>;
    }
    console.log('customer from view all customer' , data)
    return <Layout>{data && <TableCustomer customers={data} />}</Layout>;
};
export default ViewAllCustomers;
