const AuthImage = () => {
    return (
        <div
            className={`relative flex hidden lg:flex h-screen lg:w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 overflow-hidden bg-no-repeat bg-center`}
        >
            <div className='absolute top-0 left-0 w-full h-full bg-black/40'></div>
            <img
                className='w-full h-full object-cover'
                src='https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='background admin login'
            />
        </div>
    );
};

export default AuthImage;
