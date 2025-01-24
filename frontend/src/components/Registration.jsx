import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserIcon, TruckIcon, ChevronRightIcon, MailIcon, PhoneIcon, LockIcon, MapPinIcon, } from "lucide-react";

const RegistrationPage = () => {
  const [activeTab, setActiveTab] = useState("customer");
  const [loading, setLoading] = useState(false);
  const [otpPopupVisible, setOtpPopupVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleDriverSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Collect data directly from the form fields
    const driverData = {
      name: e.target["driver-name"].value,
      phonenumber: e.target["driver-phonenumber"].value,
      age: e.target["driver-age"].value,
      email: e.target["driver-email"].value,
      password: e.target["driver-password"].value,
      drivinglicense: e.target["driver-drivinglicense"].value,
      addharno: e.target["driver-addharno"].value,
      address: {
        flatno: e.target["driver-address-flatno"].value,
        street: e.target["driver-address-street"].value,
        city: e.target["driver-address-city"].value,
        state: e.target["driver-address-state"].value,
      },
      pincode: e.target["driver-pincode"].value,
    };
  
    // Ensure the values are strings for schema compatibility
    driverData.age = String(driverData.age);  // Ensure age is a string
    driverData.phonenumber = String(driverData.phonenumber); // Ensure phone number is string
    driverData.pincode = String(driverData.pincode); // Ensure pincode is string
  
    try {
      // Send driverData as JSON
      const response = await axios.post(
        "http://192.168.90.141:5000/driver/auth/send-otp",
        driverData,
        {
          headers: {
            "Content-Type": "application/json", // Ensure the request content type is set to JSON
          },
        }
      );
      console.log("Driver registration successful:", response.data);
      alert("Driver registered successfully. OTP sent to email.");
  
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(driverData));
      localStorage.setItem('userType', 'driver');
      
      setUserEmail(driverData.email);
      setUserType("driver");
      setOtpPopupVisible(true);
    } catch (error) {
      console.error("Error during driver registration:", error);
      alert("Driver registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const customerData = {
      name: formData.get("customer-name"),
      email: formData.get("customer-email"),
      phonenumber: formData.get("customer-phone"),
      password: formData.get("customer-password"),
    };
  
    try {
      const response = await axios.post("http://192.168.90.141:5000/user/auth/send-otp", customerData);
      console.log("Customer registration successful:", response.data);
      alert("Customer registered successfully. OTP sent to email.");
  
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(customerData));
      localStorage.setItem('userType', 'customer');
      
      setUserEmail(customerData.email);
      setUserType("customer");
      setOtpPopupVisible(true);
    } catch (error) {
      console.error("Error during customer registration:", error);
      alert("Customer registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleOtpSubmit = async () => {
    try {
      const apiUrl = userType === "driver" ? "http://192.168.90.141:5000/driver/auth/verify-otp" : "http://192.168.90.141:5000/user/auth/verify-otp";
      const response = await axios.post(apiUrl, { email: userEmail, otp });
      console.log("OTP verified:", response.data);
      alert("OTP verified successfully!");
      setOtpPopupVisible(false);
      navigate("/");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Create Your Account
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Join our community and experience seamless transportation services
          </p>
        </div>

        {/* Registration Type Selector */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
          <div className="grid grid-cols-2 divide-x divide-gray-200">
            <button
              onClick={() => setActiveTab("customer")}
              className={`flex items-center justify-center space-x-3 p-6 transition duration-200 ${
                activeTab === "customer"
                  ? "bg-blue-50 border-b-4 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <UserIcon className={`w-6 h-6 ${activeTab === "customer" ? "text-blue-500" : "text-gray-400"}`} />
              <span className={`text-lg font-medium ${activeTab === "customer" ? "text-blue-500" : "text-gray-500"}`}>
                Customer Registration
              </span>
            </button>
            <button
              onClick={() => setActiveTab("driver")}
              className={`flex items-center justify-center space-x-3 p-6 transition duration-200 ${
                activeTab === "driver"
                  ? "bg-blue-50 border-b-4 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <TruckIcon className={`w-6 h-6 ${activeTab === "driver" ? "text-blue-500" : "text-gray-400"}`} />
              <span className={`text-lg font-medium ${activeTab === "driver" ? "text-blue-500" : "text-gray-500"}`}>
                Driver Registration
              </span>
            </button>
          </div>
        </div>

        {/* Forms Container */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          {activeTab === "customer" ? (
            <form onSubmit={handleCustomerSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Customer Form Fields */}
                <div className="relative">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Full Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="customer-name"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Email Address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="customer-email"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                

                <div className="relative">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="customer-password"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Register as Customer
                      <ChevronRightIcon className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleDriverSubmit} className="space-y-6">
              {/* Driver Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Full Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="driver-name"
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Age
                      </label>
                      <input
                        type="number"
                        name="driver-age"
                        required
                        min="18"
                        className="block w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="25"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Email Address
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MailIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="driver-email"
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Phone Number
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PhoneIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="driver-phonenumber"
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Document Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Driving License Number
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="driver-drivinglicense"
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="DL12345678"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Aadhar Number
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="driver-addharno"
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="1234 5678 9012"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Flat/House Number
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPinIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="driver-address-flatno"
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="42"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Street Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPinIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="driver-address-street"
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Main Street"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        City
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPinIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="driver-address-city"
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Mumbai"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        State
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPinIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="driver-address-state"
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Maharashtra"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        PIN Code
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPinIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="driver-pincode"
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="400001"
                          pattern="[0-9]{6}"
                          title="Please enter a valid 6-digit PIN code"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="driver-password"
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Register as Driver
                        <ChevronRightIcon className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {otpPopupVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Verify Your Email
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              We've sent a verification code to your email. Please enter it below.
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter verification code"
            />
            <button
              onClick={handleOtpSubmit}
              className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Verify OTP
            </button>
            <button
              onClick={() => setOtpPopupVisible(false)}
              className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;