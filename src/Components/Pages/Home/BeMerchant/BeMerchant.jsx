import React from 'react';
import location from '../../../../assets/location/location-merchant.png';

const BeMerchant = () => {
    return (
        <div className="hero bg-[#03373D] rounded-4xl mt-10 mb-16 p-20">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={location}
                    className="max-w-sm text-white rounded-lg shadow-2xl"
                />
                <div className=''>
                    <h1 className="text-5xl font-bold text-white">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-white">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <div  className="flex gap-4 mt-6">
                        <button className="btn btn-primary bg-blue-600 rounded-full">Become a Merchant</button>
                    <button className="btn btn-primary bg-blue-600 btn-outline">Earn with Profast Courier</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;