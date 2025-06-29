import React from 'react';

const ServiceCard = ({ icon, title, description }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-200 flex flex-col items-center text-center h-full">
            <div className="mb-5">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-base leading-relaxed">{description}</p>
        </div>
    );
};


export default ServiceCard;