import React, { useState } from "react";
import Header from "./Header";

const RegistrationPage = () => {
  const [activeTab, setActiveTab] = useState("customer");
  const [loading, setLoading] = useState(false);

  const handleDriverSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); // Simulate loading
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); // Simulate loading
  };

  return (
   <>
   <Header/>
   <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="text-center py-6 border-b">
          <h2 className="text-3xl font-bold">Create your account</h2>
        </div>
        <div className="p-6">
          {/* Tabs */}
          <div className="grid grid-cols-2 mb-8">
            <button
              className={`p-4 font-semibold w-full transition duration-300 ${
                activeTab === "customer"
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("customer")}
            >
              Customer Registration
            </button>
            <button
              className={`p-4 font-semibold w-full transition duration-300 ${
                activeTab === "driver" ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("driver")}
            >
              Driver Registration
            </button>
          </div>

          {/* Smooth Transition Container */}
          <div className="relative">
            <div
              className={`transition-opacity duration-500 ${
                activeTab === "customer" ? "opacity-100" : "opacity-0 absolute"
              }`}
            >
              {/* Customer Registration Form */}
              <form onSubmit={handleCustomerSubmit} className="space-y-4">
                <div>
                  <label htmlFor="customer-name" className="block text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    className="mt-1 block w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="customer-email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="customer-email"
                    type="email"
                    className="mt-1 block w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="customer-phone" className="block text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    className="mt-1 block w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="customer-password" className="block text-sm font-medium">
                    Password
                  </label>
                  <input
                    id="customer-password"
                    type="password"
                    className="mt-1 block w-full p-2 border rounded"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Register as Customer"}
                </button>
              </form>
            </div>

            <div
              className={`transition-opacity duration-500 ${
                activeTab === "driver" ? "opacity-100" : "opacity-0 absolute"
              }`}
            >
              {/* Driver Registration Form */}
              <form onSubmit={handleDriverSubmit} className="space-y-4">
                <div>
                  <label htmlFor="driver-name" className="block text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="driver-name"
                    type="text"
                    className="mt-1 block w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="driver-phonenumber" className="block text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    id="driver-phonenumber"
                    type="tel"
                    className="mt-1 block w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="driver-age" className="block text-sm font-medium">
                    Age
                  </label>
                  <input
                    id="driver-age"
                    type="text"
                    className="mt-1 block w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="driver-email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="driver-email"
                    type="email"
                    className="mt-1 block w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="driver-password" className="block text-sm font-medium">
                    Password
                  </label>
                  <input
                    id="driver-password"
                    type="password"
                    className="mt-1 block w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="driver-drivinglicense" className="block text-sm font-medium">
                    Driving License
                  </label>
                  <input
                    id="driver-drivinglicense"
                    type="text"
                    className="mt-1 block w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="driver-addharno" className="block text-sm font-medium">
                    Aadhar Number
                  </label>
                  <input
                    id="driver-addharno"
                    type="text"
                    className="mt-1 block w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="driver-address-flatno" className="block text-sm font-medium">
                    Flat Number
                  </label>
                  <input
                    id="driver-address-flatno"
                    type="text"
                    className="mt-1 block w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="driver-address-street" className="block text-sm font-medium">
                    Street
                  </label>
                  <input
                    id="driver-address-street"
                    type="text"
                    className="mt-1 block w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="driver-address-city" className="block text-sm font-medium">
                      City
                    </label>
                    <input
                      id="driver-address-city"
                      type="text"
                      className="mt-1 block w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="driver-address-state" className="block text-sm font-medium">
                      State
                    </label>
                    <input
                      id="driver-address-state"
                      type="text"
                      className="mt-1 block w-full p-2 border rounded"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="driver-pincode" className="block text-sm font-medium">
                    Pincode
                  </label>
                  <input
                    id="driver-pincode"
                    type="text"
                    className="mt-1 block w-full p-2 border rounded"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Register as Driver"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default RegistrationPage;
