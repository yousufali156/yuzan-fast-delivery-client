import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { router } from './router/router.jsx';

import AOS from 'aos';
import 'aos/dist/aos.css';

// ✅ Create a wrapper component to use useEffect
const AppWrapper = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);

  return (
    <div className="urbanist-font">
      <RouterProvider router={router} />
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
);

