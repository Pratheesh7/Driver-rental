import React from 'react';

const FilterSection = () => (
    <div className="flex gap-4 mb-6 flex-wrap">
      <input
        placeholder="Search drivers..."
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Location</option>
        <option value="downtown">Downtown</option>
        <option value="suburb">Suburb</option>
        <option value="uptown">Uptown</option>
      </select>
      <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Age Range</option>
        <option value="25-35">25-35</option>
        <option value="35-45">35-45</option>
        <option value="45+">45+</option>
      </select>
    </div>
  );
  
export default FilterSection;
