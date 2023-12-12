/* eslint-disable react/prop-types */
import { FaRegStar, FaStar } from 'react-icons/fa';

const reviews = [
    {
        text: 'Absolutely love the quality and style of the clothing! The fabric is so soft, and the fit is perfect. I ordered a dress for a special occasion, and I received so many compliments. Will definitely shop here again!',
        author: 'Happy Customer',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1520785643438-5bf77931f493?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGZvcm1hbCUyMHdlYXJ8ZW58MHx8MHx8fDA%3D',
    },
    {
        text: "This footwear collection is amazing! The shoes are not only trendy but also comfortable for long hours. I purchased a pair of sneakers for my workouts, and I couldn't be happier. Great value for money.",
        author: 'Satisfied Shopper',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1506720432985-fa1fd9047c46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D',
    },
    {
        text: 'The accessories here are a game-changer! I found the perfect statement pieces to elevate my outfits. The attention to detail is impressive, and the prices are reasonable. Highly recommend!',
        author: 'Fashion Enthusiast',
        rating: 4,
        image: 'https://images.unsplash.com/photo-1516195851888-6f1a981a862e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8',
    },
];

const StarIcon = ({ filled }) =>
    filled ? (
        <FaStar className={filled ? 'text-primaryColor-gold' : ''} />
    ) : (
        <FaRegStar />
    );

const Trending = () => {
    return (
        <div className='container py-8 px-4 pb-24'>
            <div className='flex flex-col items-center justify-center pb-12'>
                <h2 className='text-4xl font-extrabold leading-tight text-center mb-2'>
                    <span className='text-primaryColor-gold'>@Fashionista</span>{' '}
                    Customer Reviews
                </h2>
                <p className='text-md w-1/2 text-gray-700 text-center'>
                    Timeless Style, Real Reviews
                </p>
            </div>

            <div className='flex flex-col md:flex-row justify-between gap-8'>
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className='w-full md:w-1/3 bg-white p-6 rounded-md shadow-md mb-8 md:mb-0'
                    >
                        <div className='flex justify-center'>
                            <img
                                className='w-32 h-32 object-cover rounded-full mb-4'
                                src={review.image}
                                alt={`Customer ${index + 1}`}
                            />
                        </div>
                        <p className='text-md text-gray-800 mb-4'>
                            {review.text}
                        </p>
                        <div className='flex items-center mb-2'>
                            {Array.from({ length: 5 }, (_, i) => (
                                <StarIcon key={i} filled={i < review.rating} />
                            ))}
                        </div>
                        <p className='text-sm text-gray-600'>
                            — {review.author}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trending;
