import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Car, Clock, Calendar, MapPin, DollarSign, Star } from "lucide-react";
import HeaderCustomer from "./HeaderCustomer"

const CustomerDashboard = () => {
  const tripHistory = [
    { month: "Jan", trips: 4, spent: 240 },
    { month: "Feb", trips: 3, spent: 180 },
    { month: "Mar", trips: 5, spent: 300 },
    { month: "Apr", trips: 2, spent: 120 },
    { month: "May", trips: 4, spent: 240 },
    { month: "Jun", trips: 6, spent: 360 },
  ];

  const recentTrips = [
    {
      id: 1,
      driverName: "John Doe",
      date: "2025-01-20",
      location: "New York City",
      amount: 60,
      rating: 4.8,
    },
    {
      id: 2,
      driverName: "Jane Smith",
      date: "2025-01-18",
      location: "Boston",
      amount: 45,
      rating: 4.5,
    },
  ];

  const stats = [
    {
      title: "Total Trips",
      value: "24",
      icon: <Car className="h-5 w-5 text-blue-600" />,
      trend: "+3 this month",
    },
    {
      title: "Active Hours",
      value: "86",
      icon: <Clock className="h-5 w-5 text-green-600" />,
      trend: "12 hrs this week",
    },
    {
      title: "Total Spent",
      value: "$1,440",
      icon: <DollarSign className="h-5 w-5 text-purple-600" />,
      trend: "$180 this month",
    },
  ];

  return (
    <>
    <HeaderCustomer/>
    <div className="min-h-screen bg-gray-50 pt-20 px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
          <p className="text-gray-500 mt-2">Track your trips and driver interactions</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 bg-white shadow rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-full">{stat.icon}</div>
              </div>
              <div className="mt-4 text-sm text-blue-600 font-medium">{stat.trend}</div>
            </div>
          ))}
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Trip History</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tripHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="trips" stroke="#3b82f6" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="spent" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Trips</h2>
            <div className="space-y-4">
              {recentTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">{trip.driverName}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {trip.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {trip.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${trip.amount}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {trip.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default CustomerDashboard;
