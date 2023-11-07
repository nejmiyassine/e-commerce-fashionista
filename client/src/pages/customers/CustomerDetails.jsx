import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customersById } from '../../features/customers/customersSlice';
import ViewCustomerDetails from '../../components/Customers/ViewCustomerDetails';

const CustomerDetails = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.customers);
    console.log('details from info', data);

    useEffect(() => {
        dispatch(customersById());
        console.log('fdsfdd', dispatch(customersById()));
    }, []);

    // return (
    // <div>
    //     id from info page {data._id}
    //     <ViewCustomer customerId = {data._id} />
    if (loading) {
        return <div>loading.....</div>;
    }
    if (!loading && error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
         
            {/* {data.length ? (
                 <ViewCustomerDetails customers={data} />
                 ) : (  */}
            <>
                <div>customers not found</div>

                MOVE TO VIEWCUSTOMERDETAILS COMPONENT
                <ViewCustomerDetails customers={data} />
            </>
            {/* )}   */}
        </div>
    );
};

export default CustomerDetails;
