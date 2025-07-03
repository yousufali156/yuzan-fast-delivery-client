import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner'

// --- Custom Hook to Load Leaflet ---
function useLeafletLoader() {
  const [loaded, setLoaded] = useState(!!window.L);

  useEffect(() => {
    if (window.L) {
      setLoaded(true);
      return;
    }

    const cssLinkId = 'leaflet-css';
    if (!document.getElementById(cssLinkId)) {
      const cssLink = document.createElement('link');
      cssLink.id = cssLinkId;
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(cssLink);
    }

    const scriptId = 'leaflet-js';
    const existingScript = document.getElementById(scriptId);

    const onScriptLoad = () => {
      if (window.L) {
        setLoaded(true);
      }
    };

    if (existingScript) {
      if (window.L) {
        setLoaded(true);
      } else {
        existingScript.addEventListener('load', onScriptLoad);
      }
    } else {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.addEventListener('load', onScriptLoad);
      document.body.appendChild(script);
    }

    return () => {
      if (existingScript) {
        existingScript.removeEventListener('load', onScriptLoad);
      }
    };
  }, []);

  return loaded;
}

// --- Search Icon SVG ---
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
  >
    <path d="m21 21-4.3-4.3"></path>
    <circle cx="10.5" cy="10.5" r="7.5"></circle>
  </svg>
);

// --- Main Coverage Component ---
const Coverage = () => {
  const leafletLoaded = useLeafletLoader();
  const [searchTerm, setSearchTerm] = useState('');
  const [coverageData, setCoverageData] = useState([]);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersLayerRef = useRef(null);

  // Fetch coverage data from JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/data/warehouses.json');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        setCoverageData(json);
      } catch (error) {
        console.error('Failed to load warehouse data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredDistricts = coverageData.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.district.toLowerCase().includes(term) ||
      item.region.toLowerCase().includes(term) ||
      item.city.toLowerCase().includes(term)
    );
  });

  // Initialize map after Leaflet loads
  useEffect(() => {
    // Only init once
    if (leafletLoaded && mapContainerRef.current && !mapRef.current) {
      mapRef.current = window.L.map(mapContainerRef.current, {
        center: [23.685, 90.3563],
        zoom: 7,
        scrollWheelZoom: false,
      });

      window.L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      ).addTo(mapRef.current);

      markersLayerRef.current = window.L.layerGroup().addTo(mapRef.current);
    }
  }, [leafletLoaded]);

  // Update markers when data or search changes
  useEffect(() => {
    if (mapRef.current && markersLayerRef.current && coverageData.length > 0) {
      markersLayerRef.current.clearLayers();

      const locationsToDisplay = searchTerm ? filteredDistricts : coverageData;

      locationsToDisplay.forEach((item) => {
        const marker = window.L.marker([item.latitude, item.longitude]);
        const popupContent = `
          <div class="font-sans p-1 max-w-xs">
            <h3 class="font-bold text-md mb-1 text-teal-600">${item.district}</h3>
            <p class="text-gray-600 m-0 text-sm"><strong>City:</strong> ${item.city}</p>
            <div class="mt-2">
              <h4 class="font-semibold text-gray-800 text-sm">Covered Areas:</h4>
              <ul class="list-disc list-inside text-gray-600 text-xs mt-1">
                ${item.covered_area.map((area) => `<li>${area}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;
        marker.bindPopup(popupContent);
        markersLayerRef.current.addLayer(marker);
      });

      if (searchTerm && filteredDistricts.length > 0) {
        const bounds = window.L.latLngBounds(
          filteredDistricts.map((item) => [item.latitude, item.longitude])
        );
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      } else {
        mapRef.current.setView([23.685, 90.3563], 7);
      }
    }
  }, [searchTerm, filteredDistricts, coverageData]);

  return (
    <div className="relative z-0 bg-white font-sans text-gray-800 p-8 md:p-12 rounded-2xl shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-teal-800">
          We are available in {coverageData.length} districts
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative my-8 flex items-center gap-4"
      >
        <div className="relative flex-grow">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-100 border-2 border-gray-200 text-gray-700 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
          />
        </div>
        <button
          className="px-8 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all"
          onClick={() => {}}
          aria-label="Search"
        >
          Search
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4">
          We deliver almost all over Bangladesh
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="h-[50vh] w-full rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-gray-200"
      >
        {leafletLoaded ? (
          <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
        ) : (
          <div className="text-gray-500 flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <LoadingSpinner></LoadingSpinner>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Coverage;
