const About = () => {
    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center lg:px-16">
                <h1 className="border rounded-lg py-4 px-5 bg-blue-950 mt-5 italic text-yellow-400 font-semibold text-center text-4xl lg:mb-6">
                    Terms & Conditions
                </h1>

                <div className="w-full my-8 space-y-3">
                    <h2 className="font-semibold text-2xl mb-2 text-blue-900 ">
                        1. Acceptance of Terms
                    </h2>
                    <p>
                        By accessing or using the Fashionista website, you agree
                        to comply with and be bound by these Terms and
                        Conditions. If you do not agree with any part of these
                        terms, please do not use our website.
                    </p>

                    <h2 className="font-semibold text-2xl mb-2 text-blue-900 ">
                        2. Intellectual Property
                    </h2>
                    <p>
                        All content and materials available on Fashionista,
                        including but not limited to text, graphics, website
                        name, code, images, and logos, are the intellectual
                        property of Fashionista and are protected by applicable
                        copyright and trademark law.
                    </p>

                    <h2 className="font-semibold text-2xl mb-2 text-blue-900 ">
                        3. User Account
                    </h2>
                    <p>
                        To access certain features of the website, you may be
                        required to create an account. You are responsible for
                        maintaining the confidentiality of your account
                        information and are fully responsible for all activities
                        that occur under your account.
                    </p>

                    <h2 className="font-semibold text-2xl mb-2 text-blue-900 ">
                        4. Privacy Policy
                    </h2>
                    <p>
                        Your use of Fashionista is also governed by our Privacy
                        Policy. Please review our Privacy Policy to understand
                        our practices.
                    </p>

                    <h2 className="font-semibold text-2xl mb-2 text-blue-900 ">
                        5. Governing Law
                    </h2>
                    <p>
                        These Terms and Conditions are governed by and construed
                        in accordance with the laws of [Your Jurisdiction]. Any
                        disputes will be subject to the exclusive jurisdiction
                        of the courts of [Your Jurisdiction].
                    </p>

                    <h2 className="font-semibold text-2xl mb-2 text-blue-900 ">
                        6. Changes to Terms
                    </h2>
                    <p>
                        Fashionista reserves the right to revise these Terms and
                        Conditions at any time. By using this website, you agree
                        to be bound by the current version of these Terms and
                        Conditions.
                    </p>

                    <p className="mt-4">
                        For any questions or concerns regarding these terms,
                        please contact us at{' '}
                        <span className="text-red-600 capitalize font-bold">
                            [+212-654-456-543]
                        </span>{' '}
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
