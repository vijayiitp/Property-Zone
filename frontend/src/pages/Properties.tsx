import React, { useState, useEffect } from "react";
import { Search, Filter, Home } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import { useAppSelector } from "../app/hooks";

const PropertyListing: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Increased for better grid layout
  const { properties, loading } = useAppSelector((state) => state.property);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");
  const [minSqft, setMinSqft] = useState("");
  const [maxSqft, setMaxSqft] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCity, selectedLocality, minSqft, maxSqft]);

  const uniqueCities = [...new Set(properties.map((p) => p.city))].sort();
  const uniqueLocalities = selectedCity
    ? [...new Set(properties.filter((p) => p.city === selectedCity).map((p) => p.locality))].sort()
    : [...new Set(properties.map((p) => p.locality))].sort();
  
  const filteredProducts = properties.filter((product) => {
    const matchesCity = selectedCity ? product.city === selectedCity : true;
    const matchesLocality = selectedLocality ? product.locality === selectedLocality : true;
    const matchesSearch = searchTerm 
      ? (product.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.city.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;
    const matchesMinSqft = minSqft ? product.squareFeet >= parseInt(minSqft, 10) : true;
    const matchesMaxSqft = maxSqft ? product.squareFeet <= parseInt(maxSqft, 10) : true;

    return matchesCity && matchesLocality && matchesSearch && matchesMinSqft && matchesMaxSqft;
  });
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setSelectedLocality("");
  };

  const handleLocalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocality(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMinSqftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinSqft(e.target.value);
  };

  const handleMaxSqftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxSqft(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCity("");
    setSelectedLocality("");
    setMinSqft("");
    setMaxSqft("");
    setCurrentPage(1);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50 transition-colors"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {startPage > 1 && (
          <>
            <button
              className="px-3 py-1 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded-lg transition-colors ${
              currentPage === page
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <button
              className="px-3 py-1 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50 transition-colors"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-700 text-white mt-6 py-6">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Find Your <span className="text-orange-400">Dream</span> Property
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover the perfect property that matches your lifestyle and budget
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-2">
        {/* Search & Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Search className="mr-2 text-teal-600" />
              Search Properties
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Filter size={16} />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Main Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by locality, property name, or city..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              />
            </div>
            <button
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
              onClick={() => {}}
            >
              <Search size={20} />
              Search
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">All Cities</option>
                  {uniqueCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
                <select
                  value={selectedLocality}
                  onChange={handleLocalityChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  disabled={!selectedCity}
                >
                  <option value="">All Localities</option>
                  {uniqueLocalities.map((locality) => (
                    <option key={locality} value={locality}>{locality}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Sq. Ft</label>
                <input
                  type="number"
                  placeholder="Min area"
                  value={minSqft}
                  onChange={handleMinSqftChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Sq. Ft</label>
                <input
                  type="number"
                  placeholder="Max area"
                  value={maxSqft}
                  onChange={handleMaxSqftChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
          )}

          {/* Filter Summary */}
          {(searchTerm || selectedCity || selectedLocality || minSqft || maxSqft) && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Active filters:</span>
                {searchTerm && <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded">Search: {searchTerm}</span>}
                {selectedCity && <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">{selectedCity}</span>}
                {selectedLocality && <span className="px-2 py-1 bg-green-100 text-green-800 rounded">{selectedLocality}</span>}
                {(minSqft || maxSqft) && <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">Area: {minSqft || '0'} - {maxSqft || '∞'} sq ft</span>}
              </div>
              <button
                onClick={clearFilters}
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {properties.length} properties
            {currentPage > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </p>
          {filteredProducts.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Home size={16} />
              <span>{currentProducts.length} properties on this page</span>
            </div>
          )}
        </div>

        {/* Property Cards */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading properties...</p>
            </div>
          </div>
        ) : currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentProducts.map((product, index) => (
              <PropertyCard key={ product._id || index} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Properties Found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or filters to find more properties
            </p>
            <button
              onClick={clearFilters}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {renderPagination()}
      </div>
    </div>
  );
};

export default PropertyListing;
