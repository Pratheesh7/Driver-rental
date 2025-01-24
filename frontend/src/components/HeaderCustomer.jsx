import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import {
  UserCircle,
  Home,
  Car,
  LayoutDashboard,
  LogOut,
  Bell,
  MessageSquare
} from 'lucide-react';

const Header = ({ pageType }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    setIsAuthenticated(storedIsAuthenticated);
    setUserName(userData.name || '');

    // Simulate notifications (replace with actual API call)
    if (storedIsAuthenticated) {
      setNotifications(Math.floor(Math.random() * 5));
    }
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    setIsMobileMenuOpen(false);
    alert('Logout successful');  
    window.location.reload();
  };

  const NavLink = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
    >
      <Icon className="w-5 h-5 mr-2" />
      <span>{children}</span>
    </Link>
  );

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Driver Hub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <NavLink to="/" icon={Home}>Home</NavLink>

                {pageType === 'customerDashboard' ? (
                  <NavLink to="/customer-dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
                ) : (
                  <NavLink to="/rent" icon={Car}>Rent</NavLink>
                )}

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <Bell className="w-6 h-6" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {notifications}
                    </span>
                  )}
                </button>

                {/* Messages */}
                <Link to="/messages" className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <MessageSquare className="w-6 h-6" />
                </Link>

                {/* User Menu */}
                <div className="relative ml-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">
                      Welcome, {userName}
                    </span>
                    <button
                      onClick={handleLogoutClick}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <UserCircle className="w-4 h-4 mr-2" />
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <NavLink to="/" icon={Home}>Home</NavLink>
                {pageType === 'customerDashboard' ? (
                  <NavLink to="/customer-dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
                ) : (
                  <NavLink to="/rent" icon={Car}>Rent</NavLink>
                )}
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <UserCircle className="w-5 h-5 mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
