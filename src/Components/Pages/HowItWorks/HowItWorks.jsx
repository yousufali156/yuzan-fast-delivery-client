
import React from 'react';
import { Truck } from 'lucide-react';
import HowItWorksCard from './HowItWorksCard';

// Data for the 'How It Works' section
const howItWorksData = [
  {
    id: 1,
    title: 'Booking Pick & Drop',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
  },
  {
    id: 2,
    title: 'Cash On Delivery',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
  },
  {
    id: 3,
    title: 'Delivery Hub',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
  },
  {
    id: 4,
    title: 'Booking SME & Corporate',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
  },
];


const HowItWorks = () => {
  return (
    <div className="bg-[#F5F8F9] py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#03373D]">
            How it Works
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksData.map((item) => (
            <HowItWorksCard
              key={item.id}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;