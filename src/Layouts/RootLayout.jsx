import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Shared/Navbar/Navbar';
import Footer from '../Components/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-screen container mx-auto mt-20 mb-20 ">
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
               <Footer />
            </footer>
        </div>
    );
};

export default RootLayout;