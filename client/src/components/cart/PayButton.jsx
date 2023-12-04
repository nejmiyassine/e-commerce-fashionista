import axios from 'axios';
// import { useSelector } from 'react-redux';
import React from 'react'
// import { customerAPI, useGetCustomerProfileDataQuery } from './../../app/api/customerApi';

const PayButton = ({cartItems}) => {
    // const { user } = useSelector((state) => state.users);
    // const { data: customer} = useGetCustomerProfileDataQuery();
    // console.log(customer);
    const handleCheckout = async () => {
      axios.post('http://localhost:8000/v1/api/stripe/create-checkout-session', {
        cartItems,
        // userId: customer._id,
      }).then((res) => {
          window.location.href = res.data.url;
      }).catch((err) => {
        console.log(err.message);
      })
    }
  return (
    <div>
      <button className="w-full h-12 bg-blue-500 text-white rounded mt-4 cursor-pointer" onClick={() => handleCheckout()}>Checkout</button>
    </div>
  );
}

export default PayButton;
