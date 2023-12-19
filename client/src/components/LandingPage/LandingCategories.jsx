// ... (previous code)

const categories = [
    {
        image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D',
        name: 'Clothing',
        description:
            'Explore our latest collection of stylish and comfortable clothing for all occasions.',
    },
    {
        image: 'https://images.unsplash.com/photo-1588099768531-a72d4a198538?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3RoaW5nfGVufDB8fDB8fHww',
        name: 'Footwear',
        description:
            'Step into style with our trendy and high-quality footwear collection for every step of your journey.',
    },
    {
        image: 'https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG5lY2tsYWNlfGVufDB8fDB8fHww',
        name: 'Accessories',
        description:
            'Complete your look with our curated accessories that add a touch of elegance to your style.',
    },
    {
        image: 'https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGNsb3RoaW5nfGVufDB8fDB8fHww',
        name: 'Athleisure',
        description:
            'Blend comfort and style with our athleisure collection designed for an active lifestyle.',
    },
    {
        image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvcm1hbCUyMHdlYXJ8ZW58MHx8MHx8fDA%3D',
        name: 'Formal Wear',
        description:
            'Make a lasting impression with our formal wear collection, tailored for elegance and sophistication.',
    },
];

const LandingCategories = () => {
    return (
        <div className='container py-8 px-4'>
            <div className='flex flex-col items-center justify-center pb-12'>
                <h2 className='text-4xl font-extrabold leading-tight text-center mb-2'>
                    <span className='text-primaryColor-gold'>Our </span>
                    Categories
                </h2>
                <p className='text-md w-full md:w-2/3 text-gray-700 text-center'>
                    Elevate your style with chic clothing, comfortable footwear,
                    statement accessories, athleisure essentials, and
                    sophisticated formal wear.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 pt-5'>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className='bg-white rounded-lg overflow-hidden shadow-md'
                    >
                        <img
                            className='h-40 w-full object-cover'
                            src={`${category.image}`}
                            alt={`${category._id}`}
                        />
                        <div className='p-4'>
                            <h2 className='text-lg font-semibold mb-2 leading-[1.5] text-black'>
                                {category.name}
                            </h2>
                            <p className='text-gray-600 text-sm'>
                                {category.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingCategories;
