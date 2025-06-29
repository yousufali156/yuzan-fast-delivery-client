import React, { useState } from 'react';
// Make sure to install lucide-react: npm install lucide-react
import { Truck, Globe, Warehouse, Banknote, Briefcase, Undo2, Zap, ShoppingCart, Boxes, Building2, MapPin, PackageCheck } from 'lucide-react';
import ServiceCard from './ServiceCard';

// Expanded data for the services with 12 total items
const servicesData = [
  {
    id: 1,
    icon: (
      <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-100">
        <Truck className="h-10 w-10 text-blue-600" />
      </div>
    ),
    title: "Express & Standard Delivery",
    description: "We deliver parcels within 24–72 hours in key cities. Express delivery in Dhaka is available within 4–6 hours from pick-up."
  },
  {
    id: 2,
    icon: (
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
            <Globe className="h-10 w-10 text-green-600" />
        </div>
    ),
    title: "Nationwide Delivery",
    description: "Our network covers every district, ensuring home delivery nationwide within 48–72 hours."
  },
  {
    id: 3,
    icon: (
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-purple-100">
            <Warehouse className="h-10 w-10 text-purple-600" />
        </div>
    ),
    title: "Fulfillment Solution",
    description: "Customized inventory management, order processing, packaging, and after-sales support for your business."
  },
  {
    id: 4,
    icon: (
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-yellow-100">
            <Banknote className="h-10 w-10 text-yellow-600" />
        </div>
    ),
    title: "Cash on Home Delivery",
    description: "Offering 100% cash on delivery service across Bangladesh with guaranteed product safety."
  },
  {
    id: 5,
    icon: (
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100">
            <Briefcase className="h-10 w-10 text-indigo-600" />
        </div>
    ),
    title: "Corporate Service",
    description: "Tailored corporate logistics solutions, including dedicated warehouse and inventory management support."
  },
  {
    id: 6,
    icon: (
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-pink-100">
            <Undo2 className="h-10 w-10 text-pink-600" />
        </div>
    ),
    title: "Parcel Return",
    description: "Our reverse logistics facility allows easy product returns and exchanges for online merchants."
  },
  {
    id: 7,
    icon: (
      <div className="flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
        <Zap className="h-10 w-10 text-red-600" />
      </div>
    ),
    title: "Same-Day Express",
    description: "Urgent delivery? Get your parcels delivered on the very same day within metro areas."
  },
  {
    id: 8,
    icon: (
      <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-100">
        <ShoppingCart className="h-10 w-10 text-teal-600" />
      </div>
    ),
    title: "E-commerce Integration",
    description: "Seamlessly connect your online store with our logistics platform for automated order processing."
  },
  {
    id: 9,
    icon: (
      <div className="flex items-center justify-center h-20 w-20 rounded-full bg-orange-100">
        <Boxes className="h-10 w-10 text-orange-600" />
      </div>
    ),
    title: "Bulk Shipment",
    description: "Cost-effective solutions for large quantity and heavyweight shipments for B2B and B2C."
  },
  {
    id: 10,
    icon: (
      <div className="flex items-center justify-center h-20 w-20 rounded-full bg-cyan-100">
        <Building2 className="h-10 w-10 text-cyan-600" />
      </div>
    ),
    title: "Warehousing & Storage",
    description: "Secure, flexible, and scalable warehousing solutions to store your products before delivery."
  },
  {
    id: 11,
    icon: (
      <div className="flex items-center justify-center h-20 w-20 rounded-full bg-lime-100">
        <MapPin className="h-10 w-10 text-lime-600" />
      </div>
    ),
    title: "Real-Time Tracking",
    description: "Monitor your shipment's journey from start to finish with our live parcel tracking feature."
  },
  {
    id: 12,
    icon: (
      <div className="flex items-center justify-center h-20 w-20 rounded-full bg-fuchsia-100">
        <PackageCheck className="h-10 w-10 text-fuchsia-600" />
      </div>
    ),
    title: "Fragile Item Handling",
    description: "Specialized handling and packaging for delicate and high-value items to ensure safe delivery."
  }
];



const Services = () => {
  const [showAll, setShowAll] = useState(false);

  // Determine which services to display
  const displayedServices = showAll ? servicesData : servicesData.slice(0, 6);

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500 max-w-3xl mx-auto">
            Express & Standard Delivery · Nationwide Delivery · Fulfillment Solution · Cash on Home Delivery · Corporate Service · Parcel Return
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedServices.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {showAll ? 'Show Less' : 'Show All Services'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;