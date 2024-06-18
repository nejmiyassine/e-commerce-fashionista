/* eslint-disable react/no-unescaped-entities */

const About = () => {
    return (
        <div>
            <div className=" py-5 flex flex-col items-center justify-center lg:px-32 px-5 bg-backgroundColor">
                <h1 className=" mb-5 font-black text-5xl italic capitalize text-center lg:mt-5 mx-5 text-yellow-500">
                    @Fashionista
                </h1>

                <div className=" flex flex-col lg:flex-row items-center gap-5">
                    <div className=" w-full lg:w-2/4">
                        <img
                            className=" rounded-lg"
                            src="https://res.cloudinary.com/derzan9nn/image/upload/v1703069185/qzen3wecjnupu10nczbj.webp"
                            alt="img"
                        />
                    </div>
                    <div className=" w-full lg:w-2/4 p-4 space-y-3">
                        <h2 className=" font-semibold text-3xl text-primaryColor-gold italic">
                            Our Story:{' '}
                        </h2>
                        <p>
                            Fashionista's journey began with a vision to
                            redefine elegance in the realm of fashion. We
                            understand that true style is timeless, and our
                            collections are curated with precision and passion.
                            Each piece is a testament to our commitment to
                            offering you a wardrobe that transcends trends and
                            embraces enduring sophistication.
                        </p>
                    </div>
                </div>
            </div>
            <div className="py-8 flex flex-col items-center justify-center lg:px-32 px-3">
                <div className="flex flex-col lg:flex-row items-center gap-5">
                    <div className="w-full lg:w-2/4 p-4 space-y-3">
                        <h2 className=" font-semibold text-3xl text-primaryColor-gold italic">
                            Our Mission:
                        </h2>
                        <p>
                            At Fashionista, we redefine elegance by seamlessly
                            blending classic styles with contemporary flair. Our
                            collections are curated to enhance your natural
                            grace, offering a canvas for your unique beauty to
                            shine through. Each ensemble is a testament to the
                            artistry that lies in simplicity and refined taste.
                        </p>
                    </div>
                    <div className="w-full lg:w-2/4">
                        <img
                            className="rounded-lg"
                            src="https://res.cloudinary.com/derzan9nn/image/upload/v1703069185/mk7y3u1dnmu9cm0cawd6.webp"
                            alt="img"
                        />
                    </div>
                </div>
            </div>
            <div className="py-8 flex flex-col items-center justify-center lg:px-32 px-5 bg-backgroundColor">
                <div className=" flex flex-col lg:flex-row items-center gap-5">
                    <div className=" w-full lg:w-2/4">
                        <img
                            className=" rounded-lg"
                            src="https://res.cloudinary.com/derzan9nn/image/upload/v1703069185/byfjl6mno0jyooowi5op.webp"
                            alt="img"
                        />
                    </div>
                    <div className=" w-full lg:w-2/4 p-4 space-y-3">
                        <h2 className=" font-semibold text-3xl text-primaryColor-gold italic">
                            Crafting Your Style Story:
                        </h2>
                        <p>
                            Fashionista is not just a destination for clothing;
                            it's a sanctuary where you craft your style story.
                            Our pieces are carefully selected to inspire
                            confidence, radiate grace, and leave a lasting
                            impression. Join us in celebrating the art of being
                            effortlessly chic, because at Fashionista, elegance
                            is more than a choice – it's a lifestyle.{' '}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
