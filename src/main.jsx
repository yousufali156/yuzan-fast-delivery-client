import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { router } from './router/router.jsx';

import AOS from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './Context/AuthContext/AuthProvider.jsx';

// ✅ Create a wrapper component to use useEffect
const AppWrapper = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, 
      once: true
    });
  }, []);

  return (
     <div className="urbanist-font max-w-7xl mx-auto">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
   
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
);

