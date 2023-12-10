import { Link } from 'react-router-dom';

const categories = [
    {
        image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D',
        name: 'Clothing',
    },
    {
        image: 'https://images.unsplash.com/photo-1588099768531-a72d4a198538?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3RoaW5nfGVufDB8fDB8fHww',
        name: 'Footwear',
    },
    {
        image: 'https://images.unsplash.com/photo-1604272490759-7c465473958a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGNsb3RoaW5nfGVufDB8fDB8fHww',
        name: 'Accessories',
    },
    {
        image: 'https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGNsb3RoaW5nfGVufDB8fDB8fHww',
        name: 'Athleisure',
    },
    {
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9ybWFsJTIwd2VhcnxlbnwwfHwwfHx8MA%3D%3D',
        name: 'Formal Wear',
    },
];

const SubCat = () => {
    return (
        <div className='container py-8 px-4 md:py-16 md:px-16 lg:px-24 xl:px-32'>
            <h2 className='text-3xl md:text-4xl lg:text-5xl py-3 mb-3 md:py-5 font-bold text-center text-gray-900'>
                Shop By Category:
            </h2>
            <div className='grid grid-rows-2  md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {categories.map((category, index) => (
                    <div key={index} className='relative group'>
                        <div className='relative grid h-[18rem] md:h-[13rem] w-full flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700 transition-opacity duration-300 ease-in-out'>
                            <div
                                className='cursor-pointer absolute inset-0 m-0 h-full w-full bg-no-repeat overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none transition-opacity duration-300 ease-in-out'
                                style={{
                                    backgroundImage: `url(${category.image})`,
                                }}
                            >
                                <div className='absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50'></div>
                            </div>
                            <div className='relative p-4 md:p-6 lg:p-8'>
                                <h2 className='group-hover:mb-4 md:group-hover:mb-6 block font-sans text-xl md:text-2xl lg:text-3xl font-medium leading-[1.5] tracking-normal text-white antialiased'>
                                    {category.name}
                                </h2>
                                <div className='p-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
                                    <Link
                                        to={`/shop?category=${category.name}`}
                                        className='align-middle font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs md:text-sm lg:text-base py-2 md:py-3.5 px-4 md:px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full hover:scale-[1.02] focus:scale-[1.02] active:scale-100'
                                    >
                                        Explore Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubCat;
