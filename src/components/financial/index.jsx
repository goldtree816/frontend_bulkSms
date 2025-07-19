// components/SummaryCard.jsx
import React from "react";

const SummaryCard = ({ title, totalText, currentLabel, currentValue, overdueLabel, overdueValue, currentWidth, overdueWidth }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600">{totalText}</p>
      <div className="relative h-1 bg-gray-300 rounded mb-4">
        <div className="absolute h-full bg-blue-500 rounded" style={{ width: currentWidth }} />
        <div className="absolute h-full bg-yellow-500 rounded" style={{ width: overdueWidth }} />
      </div>
      <div className="flex justify-between">
        <div>
          <span className="font-medium">{currentLabel}</span>
          <p>{currentValue}</p>
        </div>
        <div>
          <span className="font-medium">{overdueLabel}</span>
          <p>{overdueValue}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
