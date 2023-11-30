import { FcGoogle } from 'react-icons/fc';

const SignInWithGoogle = () => {
    return (
        <button className='flex items-center justify-center py-2 gap-2 border w-[250px] mx-auto rounded-full py-1 px-4'>
            <FcGoogle />
            <span className='font-semibold'>Sign in with google</span>
        </button>
    );
};

export default SignInWithGoogle;
