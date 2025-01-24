import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DriverDashboard from './components/DriverDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import NotFound from './components/NotFound';
import Home from './components/Home';
import RegistrationPage from './components/Registration';
import Header from './components/Header';
import Rent from './components/Rentdrivers'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');

  const handleLogin = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType('');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Include the Header */}
        

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          {/* Protected Routes */}
          <Route path="/driver-dashboard" element={<DriverDashboard />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsAuthenticated} setUserType={setUserType} />} />
          <Route path="/register" element={<RegistrationPage />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
