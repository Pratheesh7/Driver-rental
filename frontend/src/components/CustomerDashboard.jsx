import React, { useState } from 'react';
import { FaStar, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { dummyRequests } from './dummyData';
import Header from './Header'; // Assuming Header is located in the same directory

const DriverCard = ({ driver }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
    <div className="p-6 space-y-4">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        {/* Driver Name and Details */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{driver.name}</h2>
          <p className="text-sm text-gray-600">
            <strong>City:</strong> {driver.address.city}, {driver.address.state}
          </p>
        </div>
        {/* Profile Picture */}
        <img
          src={driver.profilePicture || '/placeholder-profile.png'} // Default placeholder
          alt={`${driver.name}'s profile`}
          className="w-28 h-28 rounded-full object-cover"
        />
      </div>
      {/* Additional Details */}
      <p className="text-sm text-gray-600">
        <strong>Age:</strong> {driver.age}
      </p>
      <p className="text-sm text-gray-600 flex items-center">
        <FaPhoneAlt className="mr-2 text-blue-500" /> {driver.phoneNumber}
      </p>
      <p className="text-sm text-gray-600 flex items-center">
        <FaEnvelope className="mr-2 text-red-500" /> {driver.email}
      </p>
      {/* Rating */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Rating:</span>
        <div className="flex items-center">
          <FaStar className="text-yellow-500" />
          <span className="ml-1 font-medium text-gray-800">{driver.rating}</span>
        </div>
      </div>
    </div>
  </div>
);

const CustomerDashboard = () => {
  const [filters, setFilters] = useState({
    age: '',
    place: '',
    rating: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredDrivers = dummyRequests.filter((driver) => {
    return (
      (filters.age === '' || driver.age.toString() === filters.age) &&
      (filters.place === '' ||
        driver.address.city.toLowerCase().includes(filters.place.toLowerCase()) ||
        driver.address.state.toLowerCase().includes(filters.place.toLowerCase())) &&
      (filters.rating === '' || driver.rating >= parseFloat(filters.rating))
    );
  });

  return (
    <>
      <Header isAuthenticated={true} userType="customer" />
      <div className="min-h-screen bg-gray-50 p-6 font-poppins">
        {/* Professional Note */}
        <div className="mb-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <p className="font-medium">
            Note: A charge of ₹15 per kilometer will be charged. Terms & Conditions apply.
          </p>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Available Drivers
        </h1>
        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="age"
            placeholder="Filter by Age"
            className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            value={filters.age}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="place"
            placeholder="Filter by City/State"
            className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            value={filters.place}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Filter by Minimum Rating"
            className="p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            value={filters.rating}
            onChange={handleFilterChange}
          />
        </div>
        {/* Driver Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
