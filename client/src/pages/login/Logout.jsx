import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLoginAgain = () => {
    navigate('../login');
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Goodbye!</h2>
          <p className="text-sm mt-4 text-[#002D74]">You have been successfully logged out.</p>
          <div className="text-center">
            <button
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              onClick={handleLoginAgain}
            >
              Log In Again
            </button>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://images.pexels.com/photos/1858488/pexels-photo-1858488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Logout"
          />
        </div>
      </div>
    </section>
  );
};

export default Logout;
