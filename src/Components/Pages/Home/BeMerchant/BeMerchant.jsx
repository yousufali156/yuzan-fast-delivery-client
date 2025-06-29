import React from 'react';
import location from '../../../../assets/location/location-merchant.png';
import merchantBg from '../../../../assets/location/be-a-merchant-bg.png';

const BeMerchant = () => {
    return (
        <div
            data-aos="fade-up"
            data-aos-duration="3000"
            className="bg-no-repeat bg-[#03373D] rounded-4xl mt-10 mb-16 p-5 sm:p-10 md:p-16 lg:p-20"
            style={{ backgroundImage: `url(${merchantBg})` }}
        >
            <div className="hero-content flex-col lg:flex-row-reverse items-center gap-10">
                <img
                    src={location}
                    className="w-full max-w-xs md:max-w-sm rounded-lg shadow-2xl"
                    alt="Merchant Location"
                />
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                        Merchant and Customer Satisfaction is Our First Priority
                    </h1>
                    <p className="py-4 text-white text-base sm:text-lg">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
                        <button className="btn bg-[#CAEB66] hover:bg-[#b3d94d] text-black font-semibold rounded-full transition duration-300">
                            Become a Merchant
                        </button>
                        <button className="btn btn-outline border-[#CAEB66] text-[#CAEB66] hover:bg-[#CAEB66] hover:text-black font-semibold rounded-full transition duration-300">
                            Earn with Profast Courier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;
