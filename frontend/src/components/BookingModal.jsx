import React from 'react';

const BookingModal = ({ driver, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Book {driver.name}</h3>
        <form className="space-y-4">
          <input
            placeholder="Pickup Address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            placeholder="Dropoff Address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="time"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button
              type="button"
              className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={onClose}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

export default BookingModal;

  