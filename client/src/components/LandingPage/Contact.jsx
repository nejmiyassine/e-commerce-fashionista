/* eslint-disable react/no-unescaped-entities */
import { AiFillPhone, AiOutlineClockCircle } from 'react-icons/ai';
import { CiLocationArrow1 } from 'react-icons/ci';

const Contact = () => {
    return (
        <div className="max-w-screen-lg mx-auto p-5 py-16">
            <div className="grid grid-cols-1 md:grid-cols-12 border h-[40rem] bg-cover bg-center bg-black">
                <div className="bg-gray-800 md:col-span-4 p-10 text-white bg-cover bg-center h-[40rem]">
                    <p className="mt-4 text-sm leading-7 font-regular uppercase">
                        Business Inquiries
                    </p>
                    <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight">
                        Let's{' '}
                        <span className="text-primaryColor-gold">Connect!</span>
                    </h3>
                    <p className="mt-4 leading-7 text-gray-200">
                        Are you a retailer, influencer, or fashion enthusiast
                        looking to collaborate? We are open to partnerships that
                        align with our vision. Reach out to us for wholesale
                        inquiries, brand collaborations, or any other business
                        proposition.
                    </p>
                    <div className="flex items-center mt-5">
                        <CiLocationArrow1
                            size={30}
                            className="text-white mr-2"
                        />

                        <span className="text-sm">Casablanca, Morocco.</span>
                    </div>
                    <div className="flex items-center mt-5">
                        <AiFillPhone size={30} className="text-white mr-2" />
                        <span className="text-sm">+93 749 99 65 50</span>
                    </div>
                    <div className="flex items-center mt-5">
                        <AiOutlineClockCircle
                            size={30}
                            className="text-white mr-2"
                        />
                        <span className="text-sm">9AM - 5AM</span>
                    </div>
                </div>
                <form className="md:col-span-8 p-10">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase  tracking-wide text-gray-100 text-xs font-bold mb-2"
                                htmlFor="grid-first-name"
                            >
                                First Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-opacity-50 bg-gray-200 text-white border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:text-black"
                                id="grid-first-name"
                                type="text"
                                placeholder="Jane"
                            />
                            <p className="text-red-500 text-xs italic">
                                Please fill out this field.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2"
                                htmlFor="grid-last-name"
                            >
                                Last Name
                            </label>
                            <input
                                className="appearance-none block bg-opacity-50 w-full bg-gray-200 text-gray-100 border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name"
                                type="text"
                                placeholder="Doe"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2"
                                htmlFor="grid-email"
                            >
                                Email Address
                            </label>
                            <input
                                className="appearance-none block w-full bg-opacity-50 bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-email"
                                type="email"
                                placeholder="********@*****.**"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2"
                                htmlFor="grid-message"
                            >
                                Your Message
                            </label>
                            <textarea
                                rows="10"
                                className="appearance-none block w-full bg-gray-200 bg-opacity-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            ></textarea>
                        </div>
                        <div className="flex justify-between w-full px-3">
                            <div className="md:flex md:items-center">
                                <label className="block text-gray-100 font-bold">
                                    <input
                                        className="mr-2 leading-tight"
                                        type="checkbox"
                                    />
                                    <span className="text-sm">
                                        Send me your newsletter!
                                    </span>
                                </label>
                            </div>
                            <button
                                className="shadow bg-primaryColor-gold hover:bg-primaryColor-gold/80 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                                type="submit"
                            >
                                Send Message
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
