import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../../features/customers/customersSlice';
import TableCustomer from './CustomersTable';

const CustomersView = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.customers);
    console.log('data from customers view', data);

    useEffect(() => {
        dispatch(fetchCustomers());
        console.log('view', dispatch(fetchCustomers()));
    }, []);

    if (loading) {
        return <div>loading.....</div>;
    }
    if (!loading && error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {data.length ? (
                <TableCustomer customers={data} />
            ) : (
                <div>customers not found</div>
            )}
        </div>
    );
};
export default CustomersView;
