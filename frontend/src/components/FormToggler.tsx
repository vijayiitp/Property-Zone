import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignUpForm from "./SignUp";
import SignInForm from "./Login";
import logo from "../assets/logo.png";


const AuthToggler = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const direction = isSignUp ? 1 : -1;

  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-10">
      <motion.div
        layout // animate height change
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded shadow-md p-6"
      >
        <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-fit text-center h-18"
            src={logo}
            alt="loading"
          />
        </p>
        {/* Toggle Buttons */}
        <div className="flex mb-3">
          <button
            className={`w-1/2 py-2 font-semibold rounded-l ${
              !isSignUp ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button
            className={`w-1/2 py-2 font-semibold rounded-r ${
              isSignUp ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>

        {/* Animated Form Switch */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={isSignUp ? "signup" : "signin"}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout // Animate height change between forms
          >
            {isSignUp ? <SignUpForm /> : <SignInForm />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthToggler;
