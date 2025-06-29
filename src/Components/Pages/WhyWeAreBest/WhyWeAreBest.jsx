import React from 'react';

import liveTracking from '../../../assets/live-tracking.png';
import safeDelivery from '../../../assets/tiny-deliveryman.png';
import service from '../../../assets/safe-delivery.png';

const featuresData = [
  {
    id: 1,
    imageSrc: liveTracking,
    title: "Live Parcel Tracking",
    description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind."
  },
  {
    id: 2,
    imageSrc: service,
    title: "24/7 Call Center Support",
    description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us."
  },
   {
    id: 3,
    imageSrc: safeDelivery,
    title: "100% Safe Delivery",
    description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time."
  },
];

const FeatureItem = ({ imageSrc, title, description, reverse }) => {
  const flexDirection = reverse ? 'md:flex-row-reverse' : 'md:flex-row';

  return (
    <div className={`bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col ${flexDirection} items-center gap-8 md:gap-12 transition-all duration-300`}>
      {/* Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src={imageSrc}
          alt={title}
          className="h-60 w-auto object-contain rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 mx-auto"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/400x300/f0f0f0/ccc?text=${title}`;
          }}
        />
      </div>
      {/* Text */}
      <div className="md:w-1/2 text-center md:text-left">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const WhyWeAreBest = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Line */}
        <hr className="border-t-2 border-gray-200" />

        {/* Title Section */}
        <div className="text-center py-10 md:py-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Why Are We The Best?
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            We don't just deliver parcels; we work as a reliable partner at every step of your business.
          </p>
        </div>

        {/* Feature Items */}
        <div className="space-y-12">
          {featuresData.map((feature, index) => (
            <FeatureItem
              key={feature.id}
              imageSrc={feature.imageSrc}
              title={feature.title}
              description={feature.description}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>

        {/* Bottom Line */}
        <hr className="border-t-2 border-gray-200 mt-12 md:mt-20" />
      </div>
    </section>
  );
};

export default WhyWeAreBest;
