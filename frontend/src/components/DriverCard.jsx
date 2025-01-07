import React from 'react';

const DriverCard = ({ driver, onBookClick }) => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="font-medium">{driver.name}</h3>
          <p className="text-gray-600">Age: {driver.age}</p>
          <p className="text-gray-600">Location: {driver.location}</p>
          <p className="text-gray-600">Rating: {driver.rating}/5</p>
          <p className="text-gray-600">Experience: {driver.experience}</p>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={onBookClick}
        >
          Book Now
        </button>
      </div>
    </div>
  );

export default DriverCard;
