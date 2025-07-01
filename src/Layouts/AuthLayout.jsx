import React from 'react';
import { Outlet } from 'react-router';
import authImg from "../assets/authImage.png"
import YuzanLogo from '../Components/Shared/YuzanLogo/YuzanLogo';

const AuthLayout = () => {
    return (
        <div className="p-12 container mx-auto">
            <div>
                <YuzanLogo></YuzanLogo>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <img
                    src={authImg}
                    className="max-w-sm rounded-lg shadow-2xl" />
                </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;