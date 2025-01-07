import React, { useState } from 'react';

const LoginPage = ({ setIsLoggedIn, setUserType }) => {
  const [activeTab, setActiveTab] = useState('customer');

  const handleLogin = () => {
    setUserType(activeTab);
    setIsLoggedIn(true);
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <h1>pratheesh</h1>
      {/* Auth Type Tabs */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        {['customer', 'driver'].map((type) => (
          <button
            key={type}
            className={`w-1/2 py-2 rounded-md ${activeTab === type ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setActiveTab(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Login Form */}
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handleLogin}
        >
          Login as {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
