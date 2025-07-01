import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- Main App Component ---
// Sets up the environment and renders the main Coverage component.
export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen w-full flex items-center justify-center p-4 font-sans">
      <div className="w-full h-full max-w-6xl mx-auto">
        <Coverage />
      </div>
    </div>
  );
}


// --- Detailed Coverage Data for all districts ---
const coverageData = [
  { "region": "Dhaka", "district": "Dhaka", "city": "Dhaka", "covered_area": ["Uttara", "Dhanmondi", "Mirpur", "Mohammadpur"], "status": "active", "flowchart": "https://example.com/dhaka-flowchart.png", "longitude": 90.4125, "latitude": 23.8103 },
  { "region": "Dhaka", "district": "Faridpur", "city": "Faridpur", "covered_area": ["Goalanda", "Boalmari", "Bhanga"], "status": "active", "flowchart": "https://example.com/faridpur-flowchart.png", "longitude": 89.8333, "latitude": 23.6 },
  { "region": "Dhaka", "district": "Gazipur", "city": "Gazipur", "covered_area": ["Tongi", "Kaliakair", "Sreepur"], "status": "active", "flowchart": "https://example.com/gazipur-flowchart.png", "longitude": 90.4203, "latitude": 23.9999 },
  { "region": "Dhaka", "district": "Gopalganj", "city": "Gopalganj", "covered_area": ["Tungipara", "Kotalipara", "Kashiani"], "status": "active", "flowchart": "https://example.com/gopalganj-flowchart.png", "longitude": 89.8266, "latitude": 23.0052 },
  { "region": "Dhaka", "district": "Kishoreganj", "city": "Kishoreganj", "covered_area": ["Bajitpur", "Kuliarchar", "Pakundia"], "status": "active", "flowchart": "https://example.com/kishoreganj-flowchart.png", "longitude": 90.7829, "latitude": 24.426 },
  { "region": "Dhaka", "district": "Madaripur", "city": "Madaripur", "covered_area": ["Rajoir", "Kalkini", "Shibchar"], "status": "active", "flowchart": "https://example.com/madaripur-flowchart.png", "longitude": 90.2, "latitude": 23.17 },
  { "region": "Dhaka", "district": "Manikganj", "city": "Manikganj", "covered_area": ["Saturia", "Shivalaya", "Ghior"], "status": "active", "flowchart": "https://example.com/manikganj-flowchart.png", "longitude": 89.9767, "latitude": 23.8617 },
  { "region": "Dhaka", "district": "Munshiganj", "city": "Munshiganj", "covered_area": ["Sreenagar", "Lohajang", "Sirajdikhan"], "status": "active", "flowchart": "https://example.com/munshiganj-flowchart.png", "longitude": 90.5305, "latitude": 23.55 },
  { "region": "Dhaka", "district": "Narayanganj", "city": "Narayanganj", "covered_area": ["Fatullah", "Siddhirganj", "Rupganj"], "status": "active", "flowchart": "https://example.com/narayanganj-flowchart.png", "longitude": 90.5, "latitude": 23.62 },
  { "region": "Dhaka", "district": "Narsingdi", "city": "Narsingdi", "covered_area": ["Palash", "Belabo", "Raipura"], "status": "active", "flowchart": "https://example.com/narsingdi-flowchart.png", "longitude": 90.7156, "latitude": 23.9226 },
  { "region": "Dhaka", "district": "Rajbari", "city": "Rajbari", "covered_area": ["Pangsha", "Kalukhali", "Baliakandi"], "status": "active", "flowchart": "https://example.com/rajbari-flowchart.png", "longitude": 89.65, "latitude": 23.7576 },
  { "region": "Dhaka", "district": "Shariatpur", "city": "Shariatpur", "covered_area": ["Zajira", "Naria", "Gosairhat"], "status": "active", "flowchart": "https://example.com/shariatpur-flowchart.png", "longitude": 90.4308, "latitude": 23.22 },
  { "region": "Dhaka", "district": "Tangail", "city": "Tangail", "covered_area": ["Delduar", "Ghatail", "Kalihati"], "status": "active", "flowchart": "https://example.com/tangail-flowchart.png", "longitude": 89.92, "latitude": 24.25 },
  { "region": "Chattogram", "district": "Chattogram", "city": "Chattogram", "covered_area": ["Pahartali", "Kotwali", "Halishahar", "Panchlaish", "Agrabad", "Chandgaon"], "status": "active", "flowchart": "https://example.com/chattogram-flowchart.png", "longitude": 91.8123, "latitude": 22.3569 },
  { "region": "Chattogram", "district": "Cox's Bazar", "city": "Cox's Bazar", "covered_area": ["Teknaf", "Ukhia", "Chakaria", "Ramu"], "status": "active", "flowchart": "https://example.com/coxbazar-flowchart.png", "longitude": 92.0165, "latitude": 21.4272 },
  { "region": "Chattogram", "district": "Cumilla", "city": "Cumilla", "covered_area": ["Laksam", "Debidwar", "Chandina", "Muradnagar"], "status": "active", "flowchart": "https://example.com/cumilla-flowchart.png", "longitude": 91.1809, "latitude": 23.4573 },
  { "region": "Chattogram", "district": "Brahmanbaria", "city": "Brahmanbaria", "covered_area": ["Nabinagar", "Ashuganj", "Sarail"], "status": "active", "flowchart": "https://example.com/brahmanbaria-flowchart.png", "longitude": 91.1116, "latitude": 23.9571 },
  { "region": "Chattogram", "district": "Chandpur", "city": "Chandpur", "covered_area": ["Haimchar", "Matlab", "Shahrasti"], "status": "active", "flowchart": "https://example.com/chandpur-flowchart.png", "longitude": 90.85, "latitude": 23.2333 },
  { "region": "Chattogram", "district": "Feni", "city": "Feni", "covered_area": ["Parshuram", "Daganbhuiyan", "Chhagalnaiya"], "status": "active", "flowchart": "https://example.com/feni-flowchart.png", "longitude": 91.4, "latitude": 23.0167 },
  { "region": "Chattogram", "district": "Khagrachari", "city": "Khagrachari", "covered_area": ["Ramgarh", "Mahalchari", "Dighinala"], "status": "active", "flowchart": "https://example.com/khagrachari-flowchart.png", "longitude": 91.9667, "latitude": 23.1 },
  { "region": "Chattogram", "district": "Lakshmipur", "city": "Lakshmipur", "covered_area": ["Raipur", "Ramganj", "Kamalnagar"], "status": "active", "flowchart": "https://example.com/lakshmipur-flowchart.png", "longitude": 90.8415, "latitude": 22.9444 },
  { "region": "Chattogram", "district": "Noakhali", "city": "Noakhali", "covered_area": ["Begumganj", "Senbagh", "Chatkhil"], "status": "active", "flowchart": "https://example.com/noakhali-flowchart.png", "longitude": 91.0995, "latitude": 22.8245 },
  { "region": "Chattogram", "district": "Rangamati", "city": "Rangamati", "covered_area": ["Baghaichhari", "Kaptai", "Juraichhari"], "status": "active", "flowchart": "https://example.com/rangamati-flowchart.png", "longitude": 92.2, "latitude": 22.65 },
  { "region": "Sylhet", "district": "Sylhet", "city": "Sylhet", "covered_area": ["Zindabazar", "Ambarkhana", "Dargah Gate", "South Surma", "Subid Bazar", "Tilagor"], "status": "active", "flowchart": "https://example.com/sylhet-flowchart.png", "longitude": 91.8662, "latitude": 24.8949 },
  { "region": "Sylhet", "district": "Moulvibazar", "city": "Moulvibazar", "covered_area": ["Sreemangal", "Kamalganj", "Kulaura", "Barlekha"], "status": "active", "flowchart": "https://example.com/moulvibazar-flowchart.png", "longitude": 91.7832, "latitude": 24.4826 },
  { "region": "Sylhet", "district": "Habiganj", "city": "Habiganj", "covered_area": ["Shaistaganj", "Madhabpur", "Chunarughat", "Nabiganj"], "status": "active", "flowchart": "https://example.com/habiganj-flowchart.png", "longitude": 91.4026, "latitude": 24.3745 },
  { "region": "Sylhet", "district": "Sunamganj", "city": "Sunamganj", "covered_area": ["Jagannathpur", "Chhatak", "Tahirpur", "Dowarabazar"], "status": "active", "flowchart": "https://example.com/sunamganj-flowchart.png", "longitude": 91.395, "latitude": 25.0658 },
  { "region": "Rangpur", "district": "Rangpur", "city": "Rangpur", "covered_area": ["Jahaj Company", "Pairaband", "Mahiganj", "Satmatha", "Lalbagh"], "status": "active", "flowchart": "https://example.com/rangpur-flowchart.png", "longitude": 89.2752, "latitude": 25.746 },
  { "region": "Rangpur", "district": "Dinajpur", "city": "Dinajpur", "covered_area": ["Birampur", "Fulbari", "Parbatipur", "Nawabganj"], "status": "active", "flowchart": "https://example.com/dinajpur-flowchart.png", "longitude": 88.6414, "latitude": 25.6275 },
  { "region": "Rangpur", "district": "Thakurgaon", "city": "Thakurgaon", "covered_area": ["Pirganj", "Ranisankail", "Baliadangi"], "status": "active", "flowchart": "https://example.com/thakurgaon-flowchart.png", "longitude": 88.466, "latitude": 26.0333 },
  { "region": "Rangpur", "district": "Panchagarh", "city": "Panchagarh", "covered_area": ["Tetulia", "Boda", "Atwari"], "status": "active", "flowchart": "https://example.com/panchagarh-flowchart.png", "longitude": 88.5658, "latitude": 26.3411 },
  { "region": "Rangpur", "district": "Nilphamari", "city": "Nilphamari", "covered_area": ["Saidpur", "Domar", "Jaldhaka"], "status": "active", "flowchart": "https://example.com/nilphamari-flowchart.png", "longitude": 88.856, "latitude": 25.931 },
  { "region": "Rangpur", "district": "Lalmonirhat", "city": "Lalmonirhat", "covered_area": ["Hatibandha", "Patgram", "Aditmari"], "status": "active", "flowchart": "https://example.com/lalmonirhat-flowchart.png", "longitude": 89.1662, "latitude": 25.9167 },
  { "region": "Rangpur", "district": "Kurigram", "city": "Kurigram", "covered_area": ["Nageshwari", "Bhurungamari", "Chilmari", "Ulipur"], "status": "active", "flowchart": "https://example.com/kurigram-flowchart.png", "longitude": 89.65, "latitude": 25.8054 },
  { "region": "Rangpur", "district": "Gaibandha", "city": "Gaibandha", "covered_area": ["Gobindaganj", "Sundarganj", "Palashbari", "Phulchhari"], "status": "active", "flowchart": "https://example.com/gaibandha-flowchart.png", "longitude": 89.5418, "latitude": 25.3288 },
  { "region": "Khulna", "district": "Khulna", "city": "Khulna", "covered_area": ["Sonadanga", "Khalishpur", "Daulatpur", "Shib Bari", "Boyra"], "status": "active", "flowchart": "https://example.com/khulna-flowchart.png", "longitude": 89.5672, "latitude": 22.8456 },
  { "region": "Khulna", "district": "Jessore", "city": "Jessore", "covered_area": ["Chowgachha", "Bagharpara", "Manirampur", "Abhaynagar"], "status": "active", "flowchart": "https://example.com/jessore-flowchart.png", "longitude": 89.2167, "latitude": 23.17 },
  { "region": "Khulna", "district": "Satkhira", "city": "Satkhira", "covered_area": ["Tala", "Assasuni", "Kalaroa", "Debhata"], "status": "active", "flowchart": "https://example.com/satkhira-flowchart.png", "longitude": 89.0809, "latitude": 22.7085 },
  { "region": "Khulna", "district": "Bagerhat", "city": "Bagerhat", "covered_area": ["Mongla", "Rampal", "Fakirhat", "Kachua"], "status": "active", "flowchart": "https://example.com/bagerhat-flowchart.png", "longitude": 89.7926, "latitude": 22.6516 },
  { "region": "Khulna", "district": "Magura", "city": "Magura", "covered_area": ["Sreepur", "Mohammadpur", "Shalikha"], "status": "active", "flowchart": "https://example.com/magura-flowchart.png", "longitude": 89.4194, "latitude": 23.4853 },
  { "region": "Khulna", "district": "Narail", "city": "Narail", "covered_area": ["Lohagara", "Kalia", "Narail Sadar"], "status": "active", "flowchart": "https://example.com/narail-flowchart.png", "longitude": 89.5, "latitude": 23.1667 },
  { "region": "Khulna", "district": "Jhenaidah", "city": "Jhenaidah", "covered_area": ["Harinakunda", "Shailkupa", "Kaliganj"], "status": "active", "flowchart": "https://example.com/jhenaidah-flowchart.png", "longitude": 89.1833, "latitude": 23.5333 },
  { "region": "Khulna", "district": "Chuadanga", "city": "Chuadanga", "covered_area": ["Alamdanga", "Damurhuda", "Jibannagar"], "status": "active", "flowchart": "https://example.com/chuadanga-flowchart.png", "longitude": 88.85, "latitude": 23.64 },
  { "region": "Khulna", "district": "Meherpur", "city": "Meherpur", "covered_area": ["Mujibnagar", "Gangni"], "status": "active", "flowchart": "https://example.com/meherpur-flowchart.png", "longitude": 88.6318, "latitude": 23.7623 },
  { "region": "Rajshahi", "district": "Rajshahi", "city": "Rajshahi", "covered_area": ["Boalia", "Rajpara", "Motihar", "Shah Makhdum", "Paba"], "status": "active", "flowchart": "https://example.com/rajshahi-flowchart.png", "longitude": 88.6087, "latitude": 24.3745 },
  { "region": "Rajshahi", "district": "Natore", "city": "Natore", "covered_area": ["Baraigram", "Bagatipara", "Lalpur", "Singra"], "status": "active", "flowchart": "https://example.com/natore-flowchart.png", "longitude": 89, "latitude": 24.4167 },
  { "region": "Rajshahi", "district": "Naogaon", "city": "Naogaon", "covered_area": ["Manda", "Sapahar", "Porsha", "Patnitala"], "status": "active", "flowchart": "https://example.com/naogaon-flowchart.png", "longitude": 88.93, "latitude": 24.8236 },
  { "region": "Rajshahi", "district": "Chapainawabganj", "city": "Chapainawabganj", "covered_area": ["Shibganj", "Bholahat", "Gomostapur"], "status": "active", "flowchart": "https://example.com/chapai-flowchart.png", "longitude": 88.27, "latitude": 24.5962 },
  { "region": "Rajshahi", "district": "Pabna", "city": "Pabna", "covered_area": ["Ishwardi", "Bera", "Chatmohar", "Atgharia"], "status": "active", "flowchart": "https://example.com/pabna-flowchart.png", "longitude": 89.2331, "latitude": 24.0037 },
  { "region": "Rajshahi", "district": "Sirajganj", "city": "Sirajganj", "covered_area": ["Ullapara", "Kazipur", "Shahjadpur", "Belkuchi"], "status": "active", "flowchart": "https://example.com/sirajganj-flowchart.png", "longitude": 89.7167, "latitude": 24.45 },
  { "region": "Rajshahi", "district": "Joypurhat", "city": "Joypurhat", "covered_area": ["Akkelpur", "Kalai", "Panchbibi"], "status": "active", "flowchart": "https://example.com/joypurhat-flowchart.png", "longitude": 89.0412, "latitude": 25.0953 },
  { "region": "Rajshahi", "district": "Bogura", "city": "Bogura", "covered_area": ["Sariakandi", "Sonatola", "Gabtali", "Sherpur", "Shajahanpur"], "status": "active", "flowchart": "https://example.com/bogura-flowchart.png", "longitude": 89.37, "latitude": 24.85 },
  { "region": "Barisal", "district": "Barisal", "city": "Barisal", "covered_area": ["Band Road", "Cox’s Road", "Kawnia", "Rupatali", "Nathullabad"], "status": "active", "flowchart": "https://example.com/barisal-flowchart.png", "longitude": 90.3667, "latitude": 22.7 },
  { "region": "Barisal", "district": "Bhola", "city": "Bhola", "covered_area": ["Borhanuddin", "Tazumuddin", "Daulatkhan", "Char Fasson"], "status": "active", "flowchart": "https://example.com/bhola-flowchart.png", "longitude": 90.6311, "latitude": 22.685 },
  { "region": "Barisal", "district": "Patuakhali", "city": "Patuakhali", "covered_area": ["Kalapara", "Mirzaganj", "Dashmina", "Galachipa"], "status": "active", "flowchart": "https://example.com/patuakhali-flowchart.png", "longitude": 90.3333, "latitude": 22.35 },
  { "region": "Barisal", "district": "Pirojpur", "city": "Pirojpur", "covered_area": ["Mathbaria", "Bhandaria", "Kawkhali", "Nazirpur"], "status": "active", "flowchart": "https://example.com/pirojpur-flowchart.png", "longitude": 89.975, "latitude": 22.5833 },
  { "region": "Barisal", "district": "Barguna", "city": "Barguna", "covered_area": ["Amtali", "Patharghata", "Betagi", "Bamna"], "status": "active", "flowchart": "https://example.com/barguna-flowchart.png", "longitude": 90.1167, "latitude": 22.1667 },
  { "region": "Barisal", "district": "Jhalokati", "city": "Jhalokati", "covered_area": ["Nalchity", "Rajapur", "Kathalia"], "status": "active", "flowchart": "https://example.com/jhalokati-flowchart.png", "longitude": 90.2167, "latitude": 22.6417 },
  { "region": "Mymensingh", "district": "Mymensingh", "city": "Mymensingh", "covered_area": ["Trishal", "Muktagachha", "Bhaluka", "Phulpur", "Haluaghat"], "status": "active", "flowchart": "https://example.com/mymensingh-flowchart.png", "longitude": 90.3987, "latitude": 24.7539 },
  { "region": "Mymensingh", "district": "Netrokona", "city": "Netrokona", "covered_area": ["Khaliajuri", "Mohanganj", "Durgapur", "Barhatta"], "status": "active", "flowchart": "https://example.com/netrokona-flowchart.png", "longitude": 90.7333, "latitude": 24.8833 },
  { "region": "Mymensingh", "district": "Jamalpur", "city": "Jamalpur", "covered_area": ["Madarganj", "Islampur", "Sarishabari", "Baksiganj"], "status": "active", "flowchart": "https://example.com/jamalpur-flowchart.png", "longitude": 89.9333, "latitude": 24.9167 },
  { "region": "Mymensingh", "district": "Sherpur", "city": "Sherpur", "covered_area": ["Nakla", "Nalitabari", "Jhenaigati", "Sreebardi"], "status": "active", "flowchart": "https://example.com/sherpur-flowchart.png", "longitude": 90.0333, "latitude": 25.0333 },
  { "region": "Chattogram", "district": "Bandarban", "city": "Bandarban", "covered_area": ["Bandarban Sadar", "Thanchi", "Lama", "Rowangchhari"], "status": "active", "flowchart": "https://example.com/bandarban-flowchart.png", "longitude": 92.2186, "latitude": 22.1958 },
  { "region": "Khulna", "district": "Kushtia", "city": "Kushtia", "covered_area": ["Kushtia Sadar", "Kumarkhali", "Khoksa", "Mirpur", "Bheramara", "Daulatpur"], "status": "active", "flowchart": "https://example.com/kushtia-flowchart.png", "longitude": 89.122, "latitude": 23.9013 }
];


// --- Custom Hook to Load Leaflet ---
function useLeafletLoader() {
  const [loaded, setLoaded] = useState(!!window.L);

  useEffect(() => {
    if (window.L) {
      setLoaded(true);
      return;
    }
    const cssLink = document.createElement('link');
    cssLink.id = 'leaflet-css';
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    if (!document.getElementById('leaflet-css')) {
        document.head.appendChild(cssLink);
    }

    const script = document.createElement('script');
    script.id = 'leaflet-js';
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    
    const onScriptLoad = () => setLoaded(true);
    script.addEventListener('load', onScriptLoad);
    
    if (!document.getElementById('leaflet-js')) {
        document.body.appendChild(script);
    } else if (window.L) {
        onScriptLoad();
    }

    return () => {
      script.removeEventListener('load', onScriptLoad);
    };
  }, []);

  return loaded;
}

// --- Search Icon SVG ---
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <path d="m21 21-4.3-4.3"></path>
        <circle cx="10.5" cy="10.5" r="7.5"></circle>
    </svg>
);

// --- The Merged Coverage Component ---
const Coverage = () => {
  const leafletLoaded = useLeafletLoader();
  const [searchTerm, setSearchTerm] = useState('');
  
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersLayerRef = useRef(null);

  const filteredDistricts = coverageData.filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      item.district.toLowerCase().includes(term) ||
      item.region.toLowerCase().includes(term) ||
      item.city.toLowerCase().includes(term)
    );
  });

  // Initialize map
  useEffect(() => {
    if (leafletLoaded && mapContainerRef.current && !mapRef.current) {
      mapRef.current = window.L.map(mapContainerRef.current, {
        center: [23.6850, 90.3563],
        zoom: 7,
        scrollWheelZoom: false,
      });
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(mapRef.current);
      markersLayerRef.current = window.L.layerGroup().addTo(mapRef.current);
    }
  }, [leafletLoaded]);

  // Update markers based on search
  useEffect(() => {
    if (mapRef.current && markersLayerRef.current) {
      markersLayerRef.current.clearLayers();
      
      const locationsToDisplay = searchTerm ? filteredDistricts : coverageData;

      locationsToDisplay.forEach(item => {
        const marker = window.L.marker([item.latitude, item.longitude]);
        const popupContent = `
            <div class="font-sans p-1 max-w-xs">
                <h3 class="font-bold text-md mb-1 text-teal-600">${item.district}</h3>
                <p class="text-gray-600 m-0 text-sm"><strong>City:</strong> ${item.city}</p>
                <div class="mt-2">
                    <h4 class="font-semibold text-gray-800 text-sm">Covered Areas:</h4>
                    <ul class="list-disc list-inside text-gray-600 text-xs mt-1">
                        ${item.covered_area.map(area => `<li>${area}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        marker.bindPopup(popupContent);
        markersLayerRef.current.addLayer(marker);
      });

      if (searchTerm && filteredDistricts.length > 0) {
        const bounds = window.L.latLngBounds(filteredDistricts.map(item => [item.latitude, item.longitude]));
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      } else {
         mapRef.current.setView([23.6850, 90.3563], 7);
      }
    }
  }, [searchTerm, filteredDistricts, leafletLoaded]);


  return (
    <div className="relative z-0 bg-white font-sans text-gray-800 p-8 md:p-12 rounded-2xl shadow-lg">
        <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl sm:text-4xl font-bold text-teal-800">We are available in {coverageData.length} districts</h1>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="relative my-8 flex items-center gap-4"
        >
            <div className="relative flex-grow">
                <SearchIcon />
                <input
                    type="text" placeholder="Search here" value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border-2 border-gray-200 text-gray-700 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                />
            </div>
            <button 
                onClick={() => { /* Search is real-time */ }}
                className="px-8 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all"
            >
                Search
            </button>
        </motion.div>

        <motion.div
             initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
        >
            <h2 className="text-2xl font-semibold mb-4">We deliver almost all over Bangladesh</h2>
        </motion.div>
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="h-[50vh] w-full rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-gray-200"
        >
            {leafletLoaded ? (
                <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }}></div>
            ) : (
                <div className="text-gray-500 flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading Map...
                </div>
            )}
        </motion.div>
    </div>
  );
};
