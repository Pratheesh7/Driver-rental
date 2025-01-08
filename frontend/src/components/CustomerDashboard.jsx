import React from 'react';
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
          className="w-28 h-28 rounded-full object-cover" // Further increased size
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
  return (
    <>
      {/* Include the Header */}
      <Header isAuthenticated={true} userType="customer" />
      <div className="min-h-screen bg-gray-50 p-6 font-poppins">
        {/* Professional Note */}
        <div className="mb-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <p className="font-medium">
            Note: A charge of ₹15 per kilometer will be charged.Terms & Conditions applied
          </p>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Available Drivers
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyRequests.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
