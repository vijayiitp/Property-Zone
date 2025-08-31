import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface FormData {
  name: string;
  category: string;
  email: string;
  contactNumber: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    email: "",
    contactNumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validator = (formData: FormData): boolean => {
    if (formData.name.length < 3) {
      toast.error("Name must be at least 3 characters long");
      return false;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      toast.error("Invalid email address");
      return false;
    }
    if (formData.contactNumber.length < 10) {
      toast.error("Invalid contact number");
      return false;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    if (!formData.category || formData.category === "NA") {
      toast.error("Please select a category");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!validator(formData)) {
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/register/`,
        formData
      );
      if (response.status === 201) {
        toast.success("Account created successfully!");
        navigate("/login");
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    } catch (error: any) {
      console.error("Failed to create account. Please try again.", error);
      toast.error(error.response?.data?.message || "Failed to create account. Please try again.");
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 w-full max-w-md mx-auto">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            maxLength={50}
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600
                       focus:border-teal-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 transition-colors"
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
            required
          >
            <option value="">Select Role</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
            <option value="Agent">Agent</option>
          </select>
        </div>
        
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600
                       focus:border-teal-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                       dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 transition-colors"
            placeholder="Enter your email address"
            required
          />
        </div>
        
        <div>
          <label
            htmlFor="contactNumber"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Contact Number
          </label>
          <input
            type="tel"
            maxLength={10}
            minLength={10}
            name="contactNumber"
            id="contactNumber"
            placeholder="Enter 10-digit number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 transition-colors"
            required
          />
        </div>
        
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            minLength={8}
            maxLength={12}
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 transition-colors"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Create Account
        </button>
        
        <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-teal-600 hover:text-teal-500 hover:underline dark:text-teal-400"
          >
            Sign in here
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
