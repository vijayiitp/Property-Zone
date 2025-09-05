import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { fetchProperties } from "../features/property/PropertySlice";
import {
  FaHome,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPlus,
  FaChartLine,
  FaStar,
  FaEye,
} from "react-icons/fa";

interface FormData {
  name: string;
  locality: string;
  city: string;
  price: string;
  squareFeet: string;
  image: File | null;
}

const UserProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { properties } = useAppSelector((state) => state.property);
  const dispatch = useAppDispatch();
  // const [showAll, setShowAll] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    locality: "",
    city: "",
    price: "",
    squareFeet: "",
    image: null,
  });

  const userId = user?._id;
  const userProperties =
    user?.category === "Seller"
      ? properties.filter(
          (property) => String(property.userId) === String(userId)
        )
      : [];
  const recommendedProperties =
    user?.category === "Buyer" ? properties.slice(0, 6) : [];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "image") {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("File size exceeds 5MB. Please upload a smaller image.");
          e.target.value = "";
          setUploadStatus("");
          return;
        }
        setFormData((prev) => ({ ...prev, image: file }));
        setUploadStatus("✅ Image uploaded successfully!");
      }
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof FormData];
        if (value !== null) {
          data.append(key, value);
        }
      });

      await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/newProperty`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Property added successfully!");
      setShowModal(false);
      setFormData({
        name: "",
        locality: "",
        city: "",
        price: "",
        squareFeet: "",
        image: null,
      });
      // Refresh properties to show the newly added property
      dispatch(fetchProperties());
    } catch (err) {
      console.error(err);
      toast.error("Failed to add property");
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Buyer":
        return "bg-blue-100 text-blue-800";
      case "Seller":
        return "bg-green-100 text-green-800";
      case "Agent":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Buyer":
        return "🏠";
      case "Seller":
        return "💰";
      case "Agent":
        return "👔";
      default:
        return "👤";
    }
  };

  return (
    <div className="min-h-screen mt-6">
      {/* Profile Content */}
      <div className="container mx-auto">
        <Toaster />

        <div className="bg-white shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    alt="Profile"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {user?.name || "Loading..."}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm opacity-90">
                    <span className="flex items-center">
                      <FaUser className="mr-2" />
                      {user?.category || "Loading..."}
                    </span>
                    <span className="flex items-center">
                      <FaEnvelope className="mr-2" />
                      {user?.email || "Loading..."}
                    </span>
                  </div>
                </div>
              </div>

              {user?.category !== "Buyer" && (
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-4 md:mt-0 bg-white text-teal-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <FaPlus />
                  <span>Add Property</span>
                </button>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="p-8 bg-gray-50">
  {/* For small devices: horizontal scroll, For md+: grid layout */}
  <div className="flex space-x-4 overflow-x-auto md:grid md:grid-cols-4 md:gap-6">
    <div className="bg-white min-w-[200px] p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Total Properties</p>
          <p className="text-2xl font-bold text-gray-900">{userProperties.length}</p>
        </div>
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <FaHome className="text-blue-600 text-xl" />
        </div>
      </div>
    </div>

    <div className="bg-white min-w-[200px] p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Profile Views</p>
          <p className="text-2xl font-bold text-gray-900">1,234</p>
        </div>
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <FaEye className="text-green-600 text-xl" />
        </div>
      </div>
    </div>

    <div className="bg-white min-w-[200px] p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Rating</p>
          <p className="text-2xl font-bold text-gray-900">4.8</p>
        </div>
        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
          <FaStar className="text-yellow-600 text-xl" />
        </div>
      </div>
    </div>

    <div className="bg-white min-w-[200px] p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Experience</p>
          <p className="text-2xl font-bold text-gray-900">5+ yrs</p>
        </div>
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <FaChartLine className="text-purple-600 text-xl" />
        </div>
      </div>
    </div>
  </div>
</div>


          {/* User Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaUser className="mr-2 text-blue-600" />
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <FaPhone className="text-gray-400" />
                    <span className="text-gray-700">
                      {user?.contactNumber || "Loading..."}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-gray-400" />
                    <span className="text-gray-700">
                      {user?.email || "Loading..."}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {getCategoryIcon(user?.category || "")}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                        user?.category || ""
                      )}`}
                    >
                      {user?.category || "Loading..."}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-green-50 p-6 rounded-xl border border-teal-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-teal-600" />
                  Location & Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">
                      Active in Mumbai, Delhi, Bangalore
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">
                      Last active: 2 hours ago
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Member since: 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Section */}
          <div className="p-6 sm:p-8 border-t border-gray-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                <FaHome className="mr-2 text-teal-600 text-lg sm:text-xl" />
                {user?.category === "Seller"
                  ? "My Properties"
                  : "Recommended Properties"}
              </h3>

              {user?.category === "Seller" && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2">
                  <span className="text-sm text-gray-600 text-center sm:text-left">
                    {userProperties.length} property
                    {userProperties.length !== 1 ? "ies" : "y"} listed
                  </span>
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaPlus size={14} />
                    Add Property
                  </button>
                </div>
              )}
            </div>

            {/* Buyer View */}
            {user?.category === "Buyer" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProperties.length > 0 ? (
                  recommendedProperties.map((property, index) => (
                    <PropertyCard
                      key={property._id || index}
                      product={property}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaHome className="text-gray-400 text-2xl sm:text-3xl" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                      No Properties Available
                    </h4>
                    <p className="text-gray-500 text-sm sm:text-base">
                      No properties are currently available for viewing
                    </p>
                  </div>
                )}
              </div>
            ) : user?.category === "Seller" && userProperties.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHome className="text-gray-400 text-2xl sm:text-3xl" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                  No Properties Yet
                </h4>
                <p className="text-gray-500 mb-6 text-sm sm:text-base">
                  Start by adding your first property to showcase your portfolio
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-teal-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Add Your First Property
                </button>
              </div>
            ) : user?.category === "Seller" && userProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProperties.map((property, index) => (
                  <PropertyCard
                    key={property._id || index}
                    product={property}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Add Property Modal */}
      {showModal && (
        <div className="fixed inset-0 max-h-screen bg-drop bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <FaPlus className="mr-2 text-teal-600" />
                Add New Property
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Owner Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="Enter owner name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Locality
                </label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="Enter locality"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-teal-500 transition-colors">
                  <label
                    htmlFor="image"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6h.1a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">
                      Click to upload image (Max 5MB)
                    </span>
                  </label>
                  <input
                    id="image"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                    required
                  />
                </div>
                {uploadStatus && (
                  <p className="text-green-600 text-sm mt-2">{uploadStatus}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Square Feet
                </label>
                <input
                  type="number"
                  name="squareFeet"
                  value={formData.squareFeet}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="Enter square feet"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
