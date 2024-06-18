import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
    return (
        <div className="bg-white h-screen container mx-auto flex flex-col items-center">
            <div className="p-6  md:mx-auto h-full flex flex-col justify-center">
                <svg
                    viewBox="0 0 24 24"
                    className="text-green-600 w-16 h-16 mx-auto my-6"
                >
                    <path
                        fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Your Order is complete!
                    </h3>
                    <p className="text-gray-400 my-2 w-[500px] mx-auto">
                        Your order has been placed and will be processed as soon
                        as possible. Have a great day!
                    </p>
                    <div className="py-6 text-center">
                        <Link
                            to="/shop"
                            className="px-12 border transition duration-200 hover:bg-black hover:text-white font-semibold py-3"
                        >
                            GO BACK SHOPPING
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
