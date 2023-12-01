import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { customersById } from '../../../features/customers/customersSlice';
import DisplayCustomerDetails from '../../../components/Customers/DisplayCustomerDetails';
import LoadingSpinner from '../../../components/LoadingSpinner';

const CustomerDetails = () => {
    const { customerId } = useParams();

    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.customers);
    console.log('data from customerDetails' , data)

    useEffect(() => {
        dispatch(customersById(customerId));
    }, [dispatch, customerId]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!loading && error) {
        console.error(error);
    }

    return (
        <div>
            {data._id ? (
                <DisplayCustomerDetails customer={data} />
            ) : (
                <div>customer not found</div>
            )}
        </div>
    );
};

export default CustomerDetails;