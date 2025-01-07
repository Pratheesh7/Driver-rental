import React from 'react';
import RequestCard from '../components/CardRequest';
import { dummyRequests } from '../components/dummyData';

const DriverDashboard = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Pending Requests</h2>
    <div className="space-y-4">
      {dummyRequests.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
    </div>
  </div>
);

export default DriverDashboard;
