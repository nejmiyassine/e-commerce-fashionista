import React from 'react';


import { deleteCustomer } from '../../features/customers/customersSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';


const DeleteCustomer = ({ deletedCustomer }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isDeleting = !!deletedCustomer;
    console.log('deletedCustomer', isDeleting);

    React.useEffect(() => {
        if (isDeleting) {
            navigate('/admin/customers');
            dispatch(
                deleteCustomer({
                    customerId: deletedCustomer._id,
                })
            );
            console.log('try to delete');
            toast.success('Customer is deleted successfully')
        }
    }, [dispatch, deletedCustomer]);

   

    return (
        <>
        
                 </>
    );
};

export default DeleteCustomer;
