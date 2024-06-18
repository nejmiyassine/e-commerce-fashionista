import { Link } from 'react-router-dom';
import AuthRegisterForm from '@components/AuthRegisterForm';

const AuthRegister = () => {
    return (
        <div className="flex items-center h-screen overflow-y-hidden bg-white text-primaryColor-light dark:bg-primaryColor-deepDark dark:text-primaryColor-dark">
            <div className="w-full">
                <div className="px-8 py-6">
                    <div className="mb-6 text-center">
                        <h2 className="text-3xl font-extrabold text-center mb-4">
                            <span className="text-primaryColor-gold">
                                Fashionista{' '}
                            </span>
                            Register
                        </h2>
                        <p className="text-gray-600 text-sm mt-4 text-center">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-primaryColor-gold"
                            >
                                Sign in here
                            </Link>
                            .
                        </p>
                    </div>

                    <AuthRegisterForm account_type={'customer'} />
                </div>
            </div>
        </div>
    );
};

export default AuthRegister;
