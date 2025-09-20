import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import BannerImage1 from '../../../../assets/banner/banner1.png';
import BannerImage2 from '../../../../assets/banner/banner2.png';
import BannerImage3 from '../../../../assets/banner/banner3.png';
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} interval={3000} transitionTime={500} showThumbs={false} showStatus={false} className="banner-carousel">
            <div>

                <p className="legend">Welcome to Youzan Family</p>
            </div>
            <div>
                <img src={BannerImage1} />
                <p className="legend">Your Parcel is on the way!</p>
            </div>
            <div>
                <img src={BannerImage2} />
                <p className="legend">Fast and Reliable Delivery</p>
            </div>
            <div>
                <img src={BannerImage3} />
                <p className="legend">Your Satisfaction is Our Priority</p>
            </div>
            <div>

                <p className="legend">Welcome to Youzan Family</p>
            </div>
        </Carousel>
    );
};

export default Banner;