import React from 'react';
import { Link } from 'react-router';

const YuzanLogo = () => {
    return (
        <div>         
          <Link to="/" className="flex items-center gap-2">
          <img
            src="/yousuf-logo.png"
            alt="YuzanFast Logo"
            className="w-12 h-12 md:w-14 md:h-14 transition-all duration-300 brightness-95 dark:brightness-150 drop-shadow-md"
          />
          <span className="text-lg md:text-2xl font-bold">
            <span className="text-blue-500 dark:text-blue-400">Yuzan</span>
            <span className="text-purple-700 dark:text-purple-300">Fast</span>
            <span className="text-blue-500 dark:text-blue-400">Delivery</span>
          </span>
        </Link>
        </div>
    );
};

export default YuzanLogo;