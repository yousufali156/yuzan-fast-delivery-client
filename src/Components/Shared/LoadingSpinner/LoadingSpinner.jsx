import React from "react";
import "./HeartLoader.css";

const HeartLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-transparent">
      <svg
        className="heart-loader"
        viewBox="0 0 100 90"
        width="100"
        height="90"
        fill="none"
      >
        <path
          d="M50 80s-30-20-30-40c0-11 9-20 20-20 7 0 13 4 16 10 3-6 9-10 16-10 11 0 20 9 20 20 0 20-30 40-30 40z"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#ff0055">
              <animate
                attributeName="stop-color"
                values="#ff0055;#ffcc00;#00ccff;#ff0055"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#00ccff">
              <animate
                attributeName="stop-color"
                values="#00ccff;#ffcc00;#ff0055;#00ccff"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default HeartLoader;
