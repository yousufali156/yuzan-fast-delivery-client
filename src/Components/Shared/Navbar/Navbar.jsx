import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import YuzanLogo from '../YuzanLogo/YuzanLogo';
import useAuth from '../../../Hooks/useAuth';
// import ThemeToggle from './ThemeToggle';

function Navbar() {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(result => { console.log(result) })
      .catch(error => console.log(error))
  }
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinkClass = ({ isActive }) =>
    isActive ? 'text-blue-600 font-semibold' : 'text-gray-700';

  return (
    <nav className="bg-base-100 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <YuzanLogo />

        {/* Mobile Toggle & Theme */}
        <div className="md:hidden flex items-center gap-3">
          {/* <ThemeToggle /> */}
          <button onClick={toggleMobileMenu} aria-label="Toggle menu" className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium items-center">
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/coverage" className={navLinkClass}>Coverage</NavLink></li>
          <li><NavLink to="/send-parcel" className={navLinkClass}>Send Parcel</NavLink></li>
          {
            user && <>
              <li><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink></li>

            </>
          }
          <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>

          {
            user ?
              <button onClick={handleLogOut} className='btn btn-primary'>Log Out</button>
              :
              <li><NavLink to="/login" className={navLinkClass}>Login</NavLink></li>

          }

          <li><NavLink to="/register" className={navLinkClass}>Register</NavLink></li>

          {/* <ThemeToggle /> */}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-base-300">
          <ul className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium">
            <li><NavLink to="/" onClick={toggleMobileMenu}>Home</NavLink></li>
            <li><NavLink to="/send-parcel" onClick={toggleMobileMenu}>Send Parcel</NavLink></li>
            {
              user && <>
                <li><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink></li>

              </>
            }
            <li><NavLink to="/about" onClick={toggleMobileMenu}>About</NavLink></li>
            {
              user ?
                <button onClick={handleLogOut} className='btn btn-primary'>Log Out</button>
                :
                <li><NavLink to="/login" className={navLinkClass}>Login</NavLink></li>

            }
            <li><NavLink to="/register" className={navLinkClass}>Register</NavLink></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
