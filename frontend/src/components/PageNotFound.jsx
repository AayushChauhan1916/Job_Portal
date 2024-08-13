import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageNotFoundPhoto from "../assets/pageNotFound.avif"

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-100 text-center">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={PageNotFoundPhoto}
          alt="Cartoon Character"
          className="w-60 h-auto mx-auto"
        />
      </motion.div>
      <motion.h1
        className="text-4xl font-bold text-red-600 mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Oops! Page Not Found
      </motion.h1>
      <motion.p
        className="text-lg text-gray-600 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        The page you're looking for does not exist. Click below to go back home.
      </motion.p>
      <motion.button
        onClick={handleGoHome}
        className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Go Home
      </motion.button>
    </div>
  );
};

export default PageNotFound;
