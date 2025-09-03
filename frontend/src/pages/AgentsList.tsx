import React, { useState } from "react";
import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";

interface Agent {
  id: number;
  name: string;
  username: string;
  image: string;
  rating: number;
  experience: string;
  properties: number;
  location: string;
  phone: string;
  email: string;
  bio: string;
  specialties: string[];
}

const agents: Agent[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "@sarah_j",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    experience: "8+ years",
    properties: 127,
    location: "Mumbai, Maharashtra",
    phone: "+91 98765 43210",
    email: "sarah.johnson@propertyzone.com",
    bio: "Specialized in luxury residential properties and commercial real estate. Known for exceptional client service and market expertise.",
    specialties: ["Luxury Homes", "Commercial", "Investment"]
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    username: "@rajesh_k",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4,
    experience: "12+ years",
    properties: 89,
    location: "Delhi, NCR",
    phone: "+91 98765 43211",
    email: "rajesh.kumar@propertyzone.com",
    bio: "Expert in residential properties with focus on family homes and investment opportunities. Strong local market knowledge.",
    specialties: ["Residential", "Family Homes", "Investment"]
  },
  {
    id: 3,
    name: "Priya Sharma",
    username: "@priya_s",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    experience: "6+ years",
    properties: 156,
    location: "Bangalore, Karnataka",
    phone: "+91 98765 43212",
    email: "priya.sharma@propertyzone.com",
    bio: "Specialized in tech corridor properties and modern apartments. Excellent track record with IT professionals.",
    specialties: ["Tech Corridor", "Apartments", "Modern Homes"]
  },
  {
    id: 4,
    name: "Amit Patel",
    username: "@amit_p",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 4,
    experience: "10+ years",
    properties: 203,
    location: "Hyderabad, Telangana",
    phone: "+91 98765 43213",
    email: "amit.patel@propertyzone.com",
    bio: "Leading expert in commercial real estate and industrial properties. Strong network in business community.",
    specialties: ["Commercial", "Industrial", "Business"]
  },
  {
    id: 5,
    name: "Neha Singh",
    username: "@neha_s",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    experience: "7+ years",
    properties: 94,
    location: "Pune, Maharashtra",
    phone: "+91 98765 43214",
    email: "neha.singh@propertyzone.com",
    bio: "Specialized in educational hub properties and student accommodations. Perfect for families and investors.",
    specialties: ["Educational Hub", "Student Housing", "Family Homes"]
  },
  {
    id: 6,
    name: "Vikram Malhotra",
    username: "@vikram_m",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 4,
    experience: "15+ years",
    properties: 312,
    location: "Chennai, Tamil Nadu",
    phone: "+91 98765 43215",
    email: "vikram.malhotra@propertyzone.com",
    bio: "Veteran real estate professional with expertise in all property types. Trusted advisor for high-value transactions.",
    specialties: ["All Types", "High-Value", "Consultation"]
  }
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center space-x-1">
    {[...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ))}
    <span className="ml-2 text-sm font-medium text-gray-600">({rating}.0)</span>
  </div>
);

const AgentCard: React.FC<{ agent: Agent }> = ({ agent }) => {
  // const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-blue-50 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
              <p className="text-gray-500 text-sm">{agent.username}</p>
              <div className="flex items-center mt-1">
                <FaMapMarkerAlt className="w-4 h-4 text-red-400 mr-1" />
                <span className="text-sm text-gray-600">{agent.location}</span>
              </div>
            </div>
          </div>
          <StarRating rating={agent.rating} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{agent.experience}</div>
            <div className="text-xs text-gray-500">Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{agent.properties}</div>
            <div className="text-xs text-gray-500">Properties</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{agent.rating}</div>
            <div className="text-xs text-gray-500">Rating</div>
          </div>
        </div>

        {/* Bio
        <p className="text-gray-600 text-sm mt-4 leading-relaxed">
          {isExpanded ? agent.bio : `${agent.bio.substring(0, 100)}...`}
        </p>
        
        {agent.bio.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-800"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )} */}

        {/* Specialties */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Specialties:</h4>
          <div className="flex flex-wrap gap-2">
            {agent.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-blue-600 hover:text-blue-800">
              <FaPhone className="w-4 h-4" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-green-600 hover:text-green-800">
              <FaEnvelope className="w-4 h-4" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-blue-700 hover:text-blue-900">
              <FaLinkedin className="w-4 h-4" />
            </button>
          </div>
          <button className="bg-gradient-to-r from-teal-600 to-teal-600 text-white px-6 py-2 rounded-full font-semibold hover:from-teal-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
            Connect Now
          </button>
        </div>
      </div>
    </div>
  );
};

const AgentsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const locations = [...new Set(agents.map(agent => agent.location))];
  const specialties = [...new Set(agents.flatMap(agent => agent.specialties))];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation ? agent.location === selectedLocation : true;
    const matchesSpecialty = selectedSpecialty ? agent.specialties.includes(selectedSpecialty) : true;
    
    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white mt-6 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Real Estate Agent
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Connect with experienced professionals who understand your needs
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedLocation("");
                setSelectedSpecialty("");
              }}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAgents.length} of {agents.length} agents
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No agents found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentsList;
