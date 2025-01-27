import React, { useState } from 'react';
import { Star, Phone, Mail, MapPin, Clock, CheckCircle, XCircle, AlertCircle, User, Wallet, Car, Settings, FileText, BarChart, Gift, History } from 'lucide-react';

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [showPopup, setShowPopup] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // State for showing past ride history

  const [driverProfile, setDriverProfile] = useState({
    name: 'Rahul Kumar',
    vehicle: 'Toyota Innova',
    vehicleNumber: 'MH 01 AB 1234',
    rating: 4.7,
    totalRides: 158,
    totalEarnings: '₹24,500',
    phoneNumber: '+91 9876543210',
    email: 'rahul.k@example.com',
    profilePicture: '/api/placeholder/150/150',
    documents: {
      license: true,
      registration: true,
      insurance: false,
      background: true
    },
    availability: true
  });

  const [requests, setRequests] = useState([
    {
      id: 1,
      customer: {
        name: 'John Doe',
        phone: '+91 9876543210',
        email: 'john@example.com',
        profilePicture: '/api/placeholder/100/100',
        rating: 4.8,
        rides: 42
      },
      pickup: '123 Main St, Mumbai',
      dropoff: '456 Park Ave, Mumbai',
      time: '2:00 PM',
      date: '2025-01-27',
      status: 'pending',
      distance: '5.2 km',
      amount: '₹250'
    },
    {
      id: 2,
      customer: {
        name: 'Jane Smith',
        phone: '+91 9876543211',
        email: 'jane@example.com',
        profilePicture: '/api/placeholder/100/100',
        rating: 4.9,
        rides: 87
      },
      pickup: '789 Oak Rd, Mumbai',
      dropoff: '321 Pine St, Mumbai',
      time: '4:30 PM',
      date: '2025-01-27',
      status: 'pending',
      distance: '3.8 km',
      amount: '₹180'
    },
    {
      id: 3,
      customer: {
        name: 'Alice Johnson',
        phone: '+91 9876543212',
        email: 'alice@example.com',
        profilePicture: '/api/placeholder/100/100',
        rating: 4.6,
        rides: 15
      },
      pickup: '111 Elm St, Mumbai',
      dropoff: '222 Maple St, Mumbai',
      time: '5:00 PM',
      date: '2025-01-27',
      status: 'accepted',
      distance: '7.1 km',
      amount: '₹320'
    }
  ]);

  const handleStatusChange = (requestId, newStatus) => {
    setRequests(requests.map(req =>
      req.id === requestId ? { ...req, status: newStatus } : req
    ));

    if (newStatus === 'accepted') {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  const filteredRequests = requests.filter(request =>
    activeTab === 'pending' ? request.status === 'pending' : request.status === 'accepted'
  );

  const renderRides = () => (
    <div className="grid gap-6">
      {filteredRequests.map(request => (
        <div key={request.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            {/* Customer Info */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                <div className="relative">
                  <img
                    src={request.customer.profilePicture}
                    alt={request.customer.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-white"
                  />
                  <span className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {request.customer.rides} rides
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {request.customer.name}
                  </h2>
                  <div className="flex items-center mt-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-600">{request.customer.rating} Rating</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-600">{request.customer.rides} Rides</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pickup and Dropoff */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                Pickup: {request.pickup}
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                Dropoff: {request.dropoff}
              </div>
            </div>

            {/* Ride Status and Actions */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1 text-gray-400" />
                {new Date(request.date).toLocaleDateString()} at {request.time}
              </div>
              <div className="flex gap-2">
                {request.status === 'pending' && (
                  <>
                    <button
                      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                      onClick={() => handleStatusChange(request.id, 'accepted')}
                      aria-label="Accept Ride"
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                      onClick={() => handleStatusChange(request.id, 'rejected')}
                      aria-label="Reject Ride"
                    >
                      Reject
                    </button>
                  </>
                )}
                {request.status === 'accepted' && (
                  <span className="text-green-600 font-semibold">Accepted</span>
                )}
                {request.status === 'rejected' && (
                  <span className="text-red-600 font-semibold">Rejected</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPopup = () => (
    <div
      className={`fixed top-0 left-0 right-0 mt-10 mx-auto max-w-xs bg-green-600 text-white text-center p-4 rounded-lg transition-opacity duration-300 ${showPopup ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      Accepted successfully!
    </div>
  );

  const renderProfile = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start gap-6 border-b pb-6">
        <div className="relative">
          <img
            src={driverProfile.profilePicture}
            alt={driverProfile.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-green-50"
          />
          <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${driverProfile.availability ? 'bg-green-500' : 'bg-gray-400'} ring-2 ring-white`} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{driverProfile.name}</h2>
              <div className="flex items-center mt-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-600">{driverProfile.rating} Rating</span>
                <span className="mx-2">•</span>
                <span className="text-gray-600">{driverProfile.totalRides} Rides</span>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700" aria-label="Settings">
              <Settings className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center text-gray-600">
              <Car className="w-4 h-4 mr-2" />
              {driverProfile.vehicle} • {driverProfile.vehicleNumber}
            </div>
            <div className="flex items-center text-gray-600">
              <Wallet className="w-4 h-4 mr-2" />
              {driverProfile.totalEarnings} earned
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Document Verification</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(driverProfile.documents).map(([doc, status]) => (
            <div key={doc} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="capitalize">{doc}</span>
              {status ? (
                <span className="text-green-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" /> Verified
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <XCircle className="w-4 h-4 mr-1" /> Pending
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <BarChart className="w-6 h-6 text-blue-600 mb-2" />
          <h4 className="font-semibold">Analytics</h4>
          <p className="text-sm text-gray-600">View your performance</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <FileText className="w-6 h-6 text-purple-600 mb-2" />
          <h4 className="font-semibold">Earnings Report</h4>
          <p className="text-sm text-gray-600">Download statements</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <Gift className="w-6 h-6 text-orange-600 mb-2" />
          <h4 className="font-semibold">Rewards</h4>
          <p className="text-sm text-gray-600">View your benefits</p>
        </div>
      </div>
    </div>
  );

  // Rides History (dropdown content)
  const renderHistory = () => (
    <div className={`fixed bottom-0 right-0 w-full md:w-96 bg-white p-6 transition-transform duration-300 ${showHistory ? 'transform translate-y-0' : 'transform translate-y-full'}`}>
      <h3 className="text-lg font-semibold mb-4">Past Ride History</h3>
      <div className="space-y-4">
        {requests.map(request => (
          <div key={request.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <div>
                <h4 className="font-semibold">{request.customer.name}</h4>
                <p className="text-sm text-gray-600">{request.pickup} → {request.dropoff}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Amount: {request.amount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {renderPopup()}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          {renderProfile()}
        </div>
        <div className="col-span-2">
          <div className="flex justify-between mb-6">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-2 px-4 rounded-lg ${activeTab === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}
              aria-label="Show Pending Rides"
            >
              Pending Rides
            </button>
            <button
              onClick={() => setActiveTab('accepted')}
              className={`py-2 px-4 rounded-lg ${activeTab === 'accepted' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}
              aria-label="Show Accepted Rides"
            >
              Accepted Rides
            </button>
          </div>
          {renderRides()}
        </div>
      </div>

      {/* Button to show history */}
      <button
        className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700"
        onClick={() => setShowHistory(prev => !prev)}
        aria-label="Show Ride History"
      >
        <History className="w-6 h-6" />
      </button>

      {/* History Dropdown */}
      {renderHistory()}
    </div>
  );
}

export default DriverDashboard;
