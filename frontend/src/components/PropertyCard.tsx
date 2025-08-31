import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square, Heart, Eye, Star } from "lucide-react";
import { useSelector,useDispatch  } from "react-redux";
import { RootState } from "../app/store";
import { deleteProperty } from "../features/property/PropertySlice";
import type { AppDispatch } from "../app/store"
interface PropertyCardProps {
  product: {
    id?: string;
    _id?: string;
    name: string;
    price: number;
    discountedPrice?: number;
    city: string;
    userId: string;
    locality: string;
    squareFeet: number;
    bedrooms?: number;
    bathrooms?: number;
    image?: string;
    images?: string[];
    description?: string;
    type?: string;
    status?: string;
    rating?: number;
    views?: number;
    createdAt?: string;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ product }) => {
  const {
    // id,
    // _id,
    name,
    price,
    discountedPrice,
    city,
    locality,
    squareFeet,
    userId,
    bedrooms = 0,
    bathrooms = 0,
    image,
    description,
    type = "Residential",
    status = "For Sale",
    rating = 4.5,
    views = 0,
  } = product;
  console.log("Product in PropertyCard:", product);
  const mainImage = image;
  const user = useSelector((state: RootState) => state.auth.user);
  const ownerId = user?._id;
  const dispatch = useDispatch<AppDispatch>();
  const handleRemove = (id: string) => {
  dispatch(deleteProperty(id));
};
  const isDiscounted = discountedPrice && discountedPrice < price;
  const discountPercentage = isDiscounted
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatArea = (sqft: number) => {
    return `${sqft.toLocaleString()} sq ft`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "for sale":
        return "bg-green-100 text-green-800";
      case "for rent":
        return "bg-blue-100 text-blue-800";
      case "sold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "residential":
        return "bg-purple-100 text-purple-800";
      case "commercial":
        return "bg-orange-100 text-orange-800";
      case "land":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
              type
            )}`}
          >
            {type}
          </span>
        </div>

        {/* Discount Badge */}
        {isDiscounted && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Heart size={16} className="text-gray-600 hover:text-red-500" />
          </button>
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Eye size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star size={12} className="text-yellow-500 fill-current" />
          <span className="text-xs font-medium text-gray-700">{rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Price Section */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(isDiscounted ? discountedPrice! : price)}
            </span>
            {isDiscounted && (
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(price)}
              </span>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Views</p>
            <p className="text-sm font-medium text-gray-700">{views}</p>
          </div>
        </div>

        {/* Property Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-teal-600 transition-colors">
          {name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 mb-3 text-gray-600">
          <MapPin size={14} className="text-teal-600" />
          <span className="text-sm">
            {locality}, {city}
          </span>
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Property Details */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Bed size={16} className="text-teal-600" />
            <div>
              <p className="text-xs text-gray-500">Bedrooms</p>
              <p className="text-sm font-medium text-gray-900">{bedrooms}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bath size={16} className="text-teal-600" />
            <div>
              <p className="text-xs text-gray-500">Bathrooms</p>
              <p className="text-sm font-medium text-gray-900">{bathrooms}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Square size={16} className="text-teal-600" />
            <div>
              <p className="text-xs text-gray-500">Area</p>
              <p className="text-sm font-medium text-gray-900">
                {formatArea(squareFeet)}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {ownerId === userId ? (
          <button
            onClick={() => handleRemove(product._id)}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
          >
            Remove Property
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        ) : (
          <Link
            to={`/propertydetails/property/${product._id}`}
            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4 rounded-lg font-medium hover:from-teal-700 hover:to-teal-800 transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
          >
            View Details
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
