import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';


const Header = ({ isAuthenticated, userType, onLogout }) => {
 
  const location = useLocation();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            DriverRent
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                {/* Show these links when user is logged in */}
                <Link 
                  to="/profile" 
                  className={`text-gray-600 hover:text-blue-600 ${
                    location.pathname === '/profile' ? 'text-blue-600' : ''
                  }`}
                >
                  Profile
                </Link>
                
                {userType === 'driver' ? (
                  <Link 
                    to="/driver-dashboard" 
                    className={`text-gray-600 hover:text-blue-600 ${
                      location.pathname === '/driver-dashboard' ? 'text-blue-600' : ''
                    }`}
                  >
                    My Requests
                  </Link>
                ) : (
                  <Link 
                    to="/customer-dashboard" 
                    className={`text-gray-600 hover:text-blue-600 ${
                      location.pathname === '/customer-dashboard' ? 'text-blue-600' : ''
                    }`}
                  >
                    Find Drivers
                  </Link>
                )}
                
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Show these links when user is not logged in */}
                <Link 
                  to="/login"
                  className={`text-gray-600 hover:text-blue-600 ${
                    location.pathname === '/login' ? 'text-blue-600' : ''
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className={`px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors ${
                    location.pathname === '/register' ? 'bg-blue-600' : ''
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header