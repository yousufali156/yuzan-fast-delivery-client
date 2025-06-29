import React from 'react';

import amazon from '../../../assets/brands/amazon.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import start from '../../../assets/brands/start.png';
import startpeople from '../../../assets/brands/start-people.png';

const brandLogos = [
  { id: 1, src: amazon, alt: "Amazon" },
  { id: 3, src: casio, alt: "Casio" },
  { id: 4, src: moonstar, alt: "Moonstar" },
  { id: 5, src: randstad, alt: "Randstad" },
  { id: 6, src: start, alt: "Start" },
  { id: 7, src: startpeople, alt: "Startpeople" },
];

const BrandsMarquee = () => {
  // Duplicate logos to create infinite scroll effect
  const extendedLogos = [...brandLogos, ...brandLogos];

  return (
    <>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          background-color: #fafafa;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          padding: 1rem 0;
        }

        .marquee-content {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: scroll 30s linear infinite;
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        .marquee-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
          height: 64px;
          min-width: 120px;
        }

        .marquee-item:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
          z-index: 10;
        }

        .marquee-item img {
          max-height: 40px;
          max-width: 100%;
          object-fit: contain;
          user-select: none;
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .marquee-item {
            padding: 0 1rem;
            min-width: 90px;
            height: 48px;
          }

          .marquee-item img {
            max-height: 28px;
          }
        }
      `}</style>

      <div className="py-8 sm:py-12 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-blue-400">
              Trusted by Leading Companies
            </h3>
          </div>
          <div className="marquee-container">
            <div className="marquee-content">
              {extendedLogos.map((logo, index) => (
                <div key={index} className="marquee-item" aria-label={logo.alt}>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/150x50/f0f0f0/ccc?text=${logo.alt}`;
                    }}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandsMarquee;
