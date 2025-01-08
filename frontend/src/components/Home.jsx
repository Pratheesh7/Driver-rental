import React, { useState, useEffect } from 'react';
import { Car, Shield, Clock, Star } from 'lucide-react';
import Header from './Header';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Car className="w-6 h-6" />,
      title: "Professional Drivers",
      description: "Experienced and vetted drivers at your service",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe & Secure",
      description: "Your safety is our top priority with background-checked drivers",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Service",
      description: "Available round the clock for your convenience",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Top Rated",
      description: "Consistently high-rated service by our customers",
    },
  ];

  return (
   <>
   < Header />
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div
          className={`text-center transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Personal Driver
            <span className="text-blue-600"> On Demand</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional drivers at your fingertips. Safe, reliable, and available 24/7.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white rounded px-6 py-3 font-semibold text-lg hover:bg-blue-700 transition-colors duration-300">
              Book Now
            </button>
            <button className="border border-blue-600 text-blue-600 rounded px-6 py-3 font-semibold text-lg hover:bg-gray-100 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white shadow rounded-lg overflow-hidden transform transition-all duration-700 delay-${
                  index * 200
                } hover:shadow-lg hover:-translate-y-1 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 text-center transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5k+</div>
              <div className="text-blue-100">Professional Drivers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
   </>
  );
};

export default HomePage;
