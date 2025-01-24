import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn, setUserType }) => {
  const [activeTab, setActiveTab] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loginApiUrl =
      activeTab === 'driver'
        ? 'http://192.168.90.141:5000/driver/auth/login'
        : 'http://192.168.90.141:5000/user/auth/login';
  
    const credentials = { email, password };
  
    try {
      const response = await axios.post(loginApiUrl, credentials);
      console.log('Login successful:', response.data);
  
      const userData = response.data;
  
      // Store user data and login status in localStorage
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('userType', activeTab);
      localStorage.setItem('userData', JSON.stringify(userData));
  
      // Update state
      setIsLoggedIn(true);
      setUserType(activeTab);
  
      // Redirect to home page
      navigate('/');
    } catch (error) {
      setLoading(false);
  
      // Handle different error cases
      if (error.response) {
        // Server responded with a status code outside 2xx
        if (error.response.status === 401) {
          alert('Invalid email or password. Please try again.');
        } else if (error.response.status === 400) {
          alert('Invalid email or password. Please try again.');
        } else {
          alert(`Error: ${error.response.data.message || 'Something went wrong. Please try again later.'}`);
        }
      } else if (error.request) {
        // No response was received from the server
        alert('Network error. Please check your internet connection and try again.');
      } else {
        // Other errors (e.g., setting up the request)
        alert(`Unexpected error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

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

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Logging in...' : `Login as ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
          </button>
        </form>

        <div className="mt-4 text-center">
          {activeTab === 'customer' ? (
            <p>
              New customer?{' '}
              <a
                href="/register"
                className="text-blue-500 hover:underline"
              >
                Register here
              </a>
            </p>
          ) : (
            <p>
              New driver?{' '}
              <a
                href="/register"
                className="text-blue-500 hover:underline"
              >
                Register here
              </a>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
