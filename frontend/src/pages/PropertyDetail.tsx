import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setSelectedProperty } from "../features/property/PropertySlice";
import { MapPin, Bed, Bath, Square, Phone, MessageSquare, Heart, Share2 } from "lucide-react";

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { properties, selectedProperty, loading } = useAppSelector((state) => state.property);
  
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  // Form state for contact
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: "I'm interested in this property and would like to schedule a visit."
  });

  // Find property from Redux store based on ID
  useEffect(() => {
    if (id && properties.length > 0) {
      const foundProperty = properties.find(
        (property) => property._id === id);
      if (foundProperty) {
        dispatch(setSelectedProperty(foundProperty));
      } else {
        // Property not found in store, redirect to properties page
        toast.error("Property not found");
        navigate("/properties");
      }
    }
  }, [id, properties, dispatch, navigate]);

  const handleSendRequest = async (): Promise<void> => {
    if (!user) {
      toast.error("Please login to send a request");
      return;
    }

    if (!selectedProperty) {
      toast.error("Property not found");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/visitRequest`,
        {
          buyerId: user._id,
          sellerId: selectedProperty.userId,
          propertyId: selectedProperty._id,
          message: contactForm.message
        }
        ,{
          withCredentials: true
        }
      );
      console.log(res);
      toast.success("Request sent to seller!");
      setShowContactForm(false);
    } catch (err: any) {
      console.error("Visit request error:", err);
      const errorMessage = err.response?.data?.message || "Failed to send request. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatArea = (sqft: number) => {
    return `${sqft.toLocaleString()} sq ft`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!selectedProperty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/properties")}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const property = selectedProperty;
  const images = property.image;
  const isDiscounted = property.discountedPrice && property.discountedPrice < property.price;
  const discountPercentage = isDiscounted ? Math.round(((property.price - property.discountedPrice!) / property.price) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br mt-6 from-slate-50 via-blue-50 to-indigo-50">
      <Toaster />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/properties")}
            className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
          >
            ← Back to Properties
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={images}
                  alt={property.name}
                  className="w-full h-96 object-cover"
                />
                
                {/* Image Navigation */}
                {/* {images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-4">
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
                      className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0)}
                      className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      →
                    </button>
                  </div>
                )} */}

                {/* Discount Badge */}
                {isDiscounted && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{discountPercentage}% OFF
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart size={20} className="text-gray-600" />
                  </button>
                  <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {/* {images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index ? 'border-teal-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )} */}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} className="text-teal-600" />
                    <span>{property.locality}, {property.city}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(isDiscounted ? property.discountedPrice! : property.price)}
                    </span>
                    {isDiscounted && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(property.price)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Total Price</p>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed size={24} className="text-teal-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <p className="text-lg font-semibold text-gray-900">N/A</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath size={24} className="text-teal-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <p className="text-lg font-semibold text-gray-900">N/A</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square size={24} className="text-teal-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Area</p>
                  <p className="text-lg font-semibold text-gray-900">{formatArea(property.squareFeet)}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  This beautiful residential property in {property.locality}, {property.city} offers {formatArea(property.squareFeet)} of living space. Perfect for buying, this property features modern amenities and a prime location.
                </p>
              </div>

              {/* EMI Calculator */}
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">EMI Calculator</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {formatPrice(Math.round((isDiscounted ? property.discountedPrice! : property.price) / 6))}
                    </p>
                    <p className="text-sm text-gray-600">0% EMI for 6 months</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {formatPrice(Math.round((isDiscounted ? property.discountedPrice! : property.price) / 12))}
                    </p>
                    <p className="text-sm text-gray-600">0% EMI for 12 months</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-900">Location</h3>
              </div>
              <div className="h-80">
                <iframe
                  className="w-full h-full"
                  src={`https://maps.google.com/maps?q=${property.city},${property.locality}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  title="Property Location"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Agent</h3>
              
              {!showContactForm ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={20} />
                    Request Visit
                  </button>
                  <button
                    onClick={handleSendRequest}
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    Quick Request
                  </button>
                </div>
              ) : (
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={contactForm.fullName}
                      onChange={handleContactFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleContactFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={contactForm.preferredDate}
                      onChange={handleContactFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactFormChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Your message to the agent"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSendRequest}
                      className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                    >
                      Send Request
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-medium">Residential</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium">For Sale</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per sq ft</span>
                  <span className="font-medium">
                    {formatPrice(Math.round((isDiscounted ? property.discountedPrice! : property.price) / property.squareFeet))}
                  </span>
                </div>
                {property.createdAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed</span>
                    <span className="font-medium">{new Date(property.createdAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
