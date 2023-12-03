// OrderProgressBar.js
import React from 'react';

const Progress = ({ status }) => {
  const orderStatuses = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
  const currentStatusIndex = orderStatuses.indexOf(status);
  const progressPercent = (currentStatusIndex / (orderStatuses.length - 1)) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        {orderStatuses.map((orderStatus, index) => (
          <div key={index} className={`flex-1 text-center ${index <= currentStatusIndex ? 'text-green-500 font-bold' : 'text-gray-500'}`}>
            {orderStatus}
          </div>
        ))}
      </div>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="flex-1 h-2 relative">
            <div className="flex flex-col h-2 w-full absolute">
              <div
                style={{ width: `${progressPercent}%` }}
                className="flex-shrink-0 h-full bg-green-500 rounded-md"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
