import { Truck } from 'lucide-react';
import React from 'react';
const HowItWorksCard = ({ title, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 text-center transition-transform transform hover:-translate-y-2">
      <div className="flex justify-center items-center mb-5">
        <div className="bg-teal-50 p-4 rounded-full">
          <Truck className="h-8 w-8 text-teal-600" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
    </div>
  );
};

export default HowItWorksCard;