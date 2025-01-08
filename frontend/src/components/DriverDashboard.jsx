import React, { useState } from 'react';
import { FaStar, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';

const DriverDashboard = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      customer: {
        name: 'John Doe',
        phone: '+91 9876543210',
        email: 'john@example.com',
        profilePicture: '/api/placeholder/100/100',
        rating: 4.8
      },
      pickup: '123 Main St, Mumbai',
      dropoff: '456 Park Ave, Mumbai',
      time: '2:00 PM',
      date: '2025-01-08',
      status: 'accepted'
    },
    {
      id: 2,
      customer: {
        name: 'Jane Smith',
        phone: '+91 9876543211',
        email: 'jane@example.com',
        profilePicture: '/api/placeholder/100/100',
        rating: 4.9
      },
      pickup: '789 Oak Rd, Mumbai',
      dropoff: '321 Pine St, Mumbai',
      time: '4:30 PM',
      date: '2025-01-08',
      status: 'accepted'
    },
    {
      id: 3,
      customer: {
        name: 'Alice Johnson',
        phone: '+91 9876543212',
        email: 'alice@example.com',
        profilePicture: '/api/placeholder/100/100',
        rating: 4.6
      },
      pickup: '111 Elm St, Mumbai',
      dropoff: '222 Maple St, Mumbai',
      time: '5:00 PM',
      date: '2025-01-08',
      status: 'accepted'
    },
    {
      id: 4,
      customer: {
        name: 'Bob Brown',
        phone: '+91 9876543213',
        email: 'bob@example.com',
        profilePicture: '/api/placeholder/100/100',
        rating: 4.7
      },
      pickup: '333 Birch Rd, Mumbai',
      dropoff: '444 Cedar St, Mumbai',
      time: '6:00 PM',
      date: '2025-01-08',
      status: 'accepted'
    }
  ]);

  const [showRides, setShowRides] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Driver Dashboard</h1>
            <div 
              onClick={() => setShowRides(!showRides)}
              className="cursor-pointer bg-gray-100 text-gray-900 px-4 py-2 rounded-full"
            >
              My Rides
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Accepted Rides Section */}
          {showRides && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-start">
              <div className="bg-white w-full md:w-1/3 lg:w-1/4 max-h-screen overflow-y-auto rounded-lg shadow-lg p-6 transform transition-all duration-500 translate-y-[-200%] opacity-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Accepted Rides</h2>
                {requests
                  .filter(request => request.status === 'accepted')
                  .map(request => (
                    <div key={request.id} className="mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={request.customer.profilePicture}
                          alt={request.customer.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {request.customer.name}
                          </h3>
                          <p className="text-gray-600">{request.pickup} → {request.dropoff}</p>
                          <p className="text-gray-600">
                            {request.time} on {request.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Render pending rides */}
          {requests
            .filter(request => request.status === 'pending')
            .map(request => (
              <div
                key={request.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 ${
                  request.status !== 'pending' ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                }`}
              >
                <div className="p-6">
                  {/* Customer Info Section */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4">
                      <img
                        src={request.customer.profilePicture}
                        alt={request.customer.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {request.customer.name}
                        </h2>
                        <div className="flex items-center mt-1">
                          <FaStar className="text-yellow-400 w-4 h-4" />
                          <span className="ml-1 text-gray-600">
                            {request.customer.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <FaPhoneAlt className="w-4 h-4 mr-2 text-gray-400" />
                      {request.customer.phone}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaEnvelope className="w-4 h-4 mr-2 text-gray-400" />
                      {request.customer.email}
                    </div>
                  </div>

                  {/* Ride Details */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-gray-700">From: {request.pickup}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-red-500 mr-2" />
                        <span className="text-gray-700">To: {request.dropoff}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-500 mr-2" />
                        <span className="text-gray-700">
                          {request.time} on {request.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setRequests(requests.map(req => req.id === request.id ? { ...req, status: 'accepted' } : req))}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Accept Ride
                    </button>
                    <button
                      onClick={() => setRequests(requests.map(req => req.id === request.id ? { ...req, status: 'declined' } : req))}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
                    >
                      <XCircle className="w-5 h-5 mr-2" />
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {requests.filter(r => r.status === 'pending').length === 0 && (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Pending Requests
              </h3>
              <p className="text-gray-500">
                You've handled all current ride requests.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
