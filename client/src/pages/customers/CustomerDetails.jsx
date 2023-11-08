import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customersById } from '../../features/customers/customersSlice';
import DisplayCustomerDetails from '../../components/Customers/DisplayCustomerDetails';
import { useParams } from 'react-router-dom';

const CustomerDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.customers);
    useEffect(() => {
        dispatch(customersById(id));
        console.log('dispatch', dispatch(customersById(id)));
    }, [dispatch, id]);

    if (loading) {
        return <div>loading.....</div>;
    }
    if (!loading && error) {
        return <div>Error: {error}</div>;
    }

    console.log('data from customerDetails:' , data._id)
    return (
        <div>
            {data._id ? (
                <div>
                    {/* {data._id} */}
                     <DisplayCustomerDetails customer={data} /> 

                </div>
            ) : (
                <>
                    <div>customers not found</div>
                </>
            )}
        </div>
    );
};

export default CustomerDetails;
