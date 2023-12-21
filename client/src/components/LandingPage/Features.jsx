import delivery from '../../assets/delivery.webp';
import refund from '../../assets/refund.webp';
import support from '../../assets/support.webp';

const Features = () => {
    return (
        <div className='bg-[#F2F3F5] mb-8'>
            <div className='container mx-auto'>
                <div className='w-full max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center'>
                    <div className='rounded-sm p-4 flex flex-col items-center'>
                        <img
                            src={delivery}
                            className='w-12 h-12 object-cover mb-2'
                            alt='Delivery Icon'
                        />
                        <h4 className='font-medium capitalize text-lg'>
                            Free Shipping
                        </h4>
                        <p className='text-gray-500 text-sm text-center'>
                            Order Over $50
                        </p>
                    </div>
                    <div className='rounded-sm p-4 flex flex-col items-center'>
                        <img
                            src={refund}
                            className='w-12 h-12 object-cover mb-2'
                            alt='Refund Icon'
                        />
                        <h4 className='font-medium capitalize text-lg'>
                            Money Return
                        </h4>
                        <p className='text-gray-500 text-sm text-center'>
                            15 Days Money Returns
                        </p>
                    </div>
                    <div className='rounded-sm p-4 flex flex-col items-center'>
                        <img
                            src={support}
                            className='w-12 h-12 object-cover mb-2'
                            alt='Support Icon'
                        />
                        <h4 className='font-medium capitalize text-lg'>
                            24/7 Support
                        </h4>
                        <p className='text-gray-500 text-sm text-center'>
                            Customer Support
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
