import React from 'react';
import Banner from './Banner/Banner';
import Services from '../Services/Services';
import BrandsMarquee from '../BrandsMarquee/BrandsMarquee';
import WhyWeAreBest from '../WhyWeAreBest/WhyWeAreBest';
import BeMerchant from './BeMerchant/BeMerchant';

const Home = () => {
    return (
        <div className='mt-10 mb-16'>
            <h2 className='text-3xl font-bold text-center'>Welcome to Yuzan Fast Delivery</h2>
            <p className='text-center mb-10'>Your one-stop solution for fast and reliable delivery services.</p>
            <Banner/>
            <Services />
            <BrandsMarquee />
            <WhyWeAreBest />
            <BeMerchant/>
        </div>
    );
};

export default Home;