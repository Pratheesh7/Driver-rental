import React, { useState } from 'react';
import DriverCard from '../components/DriverCard';
import BookingModal from '../components/BookingModal';
import FilterSection from '../components/FilterSection';
import { dummyDrivers } from '../components/dummyData';

const CustomerDashboard = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  return (
    <div className="p-6">
      <FilterSection />
      <div className="space-y-4">
        {dummyDrivers.map((driver) => (
          <DriverCard
            key={driver.id}
            driver={driver}
            onBookClick={() => {
              setSelectedDriver(driver);
              setShowBookingModal(true);
            }}
          />
        ))}``
      </div>
      {showBookingModal && (
        <BookingModal
          driver={selectedDriver}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
