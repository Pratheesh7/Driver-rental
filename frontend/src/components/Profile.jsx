import React from 'react';

const Profile = () => {
  // Sample data, replace this with actual data from your backend or state
  const customerData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    bookings: [
      { id: 1, date: '2025-01-20', destination: 'New York', status: 'Completed' },
      { id: 2, date: '2025-01-15', destination: 'Boston', status: 'Pending' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      {/* Customer Info */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">
          Name: <span className="font-medium">{customerData.name}</span>
        </p>
        <p className="text-gray-600">
          Email: <span className="font-medium">{customerData.email}</span>
        </p>
      </div>

      {/* Bookings */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Bookings</h2>
        <ul className="space-y-4">
          {customerData.bookings.map((booking) => (
            <li
              key={booking.id}
              className="p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <p className="text-gray-600">
                <strong>Booking ID:</strong> {booking.id}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong> {booking.date}
              </p>
              <p className="text-gray-600">
                <strong>Destination:</strong> {booking.destination}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong> {booking.status}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Terms and Conditions */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Terms and Conditions</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          By using this platform, you agree to our terms and conditions. The service is provided "as is" without any guarantees or warranties. Bookings are subject to availability. Cancellation fees may apply as per company policy. Refer to our website for detailed terms and conditions.
        </p>
      </div>

      {/* Copyright Info */}
      <div className="text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} DriverHub. All rights reserved.
      </div>
    </div>
  );
};

export default Profile;
