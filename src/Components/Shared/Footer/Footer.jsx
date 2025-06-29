import React from "react";
import { Link } from "react-router";
import {
    FaInstagram,
    FaLinkedin,
    FaFacebook,
    FaTwitter,
    FaGithub,
} from "react-icons/fa";
import YuzanLogo from "../YuzanLogo/YuzanLogo";

const Footer = () => {
    return (
        <footer className=" text-sm">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between gap-12">

                    {/* Logo & Description */}
                    <div className="flex flex-col items-start max-w-xs">
                        {/* Logo */}
                        <YuzanLogo />

                        {/* Description */}
                        <p className="">
                            A freelance marketplace for small tasks where users can post jobs, bid, and connect based on skills, budget, and deadlines.
                        </p>
                    </div>

                    {/* Links Sections */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-1">
                        {/* Categories */}
                        <div>
                            <h3 className="font-semibold mb-4 text-indigo-500 dark:text-purple-500">Categories</h3>
                            <ul className="space-y-2">
                                {[
                                    { path: "/categories/web-development", label: "Web Development & Tech" },
                                    { path: "/categories/graphics-design", label: "Graphics & Design" },
                                    { path: "/categories/digital-marketing", label: "Digital Marketing" },
                                    { path: "/categories/writing-translation", label: "Writing & Translation" },
                                    { path: "/categories/video-animation", label: "Video & Animation" },
                                ].map(({ path, label }) => (
                                    <li key={path}>
                                        <Link
                                            to={path}
                                            className="hover:underline hover:text-indigo-500 dark:hover:text-purple-400 transition-colors duration-200 cursor-pointer"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social Icons with names */}
                        <div>
                            <h3 className="font-semibold mb-4 text-indigo-500 dark:text-purple-500">Social Links</h3>
                            <div className="flex flex-wrap items-center gap-4 text-base font-semibold ">
                                {[
                                    { href: "https://www.facebook.com/yousufali156", icon: <FaFacebook className="text-2xl" />, label: "Facebook" },
                                    { href: "https://www.linkedin.com/in/yousufali156/", icon: <FaLinkedin className="text-2xl" />, label: "LinkedIn" },
                                    { href: "https://www.instagram.com/mdyousufali001", icon: <FaInstagram className="text-2xl" />, label: "Instagram" },
                                    { href: "https://twitter.com", icon: <FaTwitter className="text-2xl" />, label: "Twitter" },
                                    { href: "https://github.com/yousufali156", icon: <FaGithub className="text-2xl" />, label: "GitHub" },
                                ].map(({ href, icon, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 hover:underline hover:text-indigo-500 dark:hover:text-purple-500 transition-colors duration-200 cursor-pointer"
                                    >
                                        {icon}
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="font-semibold mb-4 text-indigo-500 dark:text-purple-500">Contact Us</h3>
                            <ul className="space-y-3">
                                <li>
                                    📧{" "}
                                    <a
                                        href="mailto:support@taskmatch.com"
                                        className="hover:underline hover:text-indigo-600 dark:hover:text-purple-400 transition-colors duration-200 cursor-pointer"
                                    >
                                        support@taskmatch.com
                                    </a>
                                </li>
                                <li>
                                    📞{" "}
                                    <a
                                        href="tel:+8800123456789"
                                        className="hover:underline hover:text-indigo-600 dark:hover:text-purple-400 transition-colors duration-200 cursor-pointer"
                                    >
                                        +880 (012) 345-6789
                                    </a>
                                </li>
                                <li>📍 Bogura, Rajshahi, BD 5800</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t py-4 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* Left: Logo and copyright */}
                    <div className="flex items-center gap-2">

                        
                       <YuzanLogo />
                        <span>© Grapes Market Ltd. {new Date().getFullYear()}</span>
                    </div>

                    {/* Newsletter Sign-up */}
                    <div className="w-full md:w-1/2">
                        <h3 className="font-semibold text-center mb-1">Subscribe to Our Newsletter</h3>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-md hover:brightness-110 transition"
                            >
                                Subscribe
                            </button>

                        </form>
                    </div>

                    {/* Right: Social Icons */}
                    <div className="flex items-center gap-4 text-xl">
                        <a
                            href="https://github.com/yousufali156"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="hover:text-blue-400 transition"
                        >
                            <FaGithub />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/yousufali156/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="hover:text-blue-400 transition"
                        >
                            <FaLinkedin />
                        </a>

                        <a
                            href="https://www.facebook.com/yousufali156"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="hover:text-blue-400 transition"
                        >
                            <FaFacebook />
                        </a>

                        <a
                            href="https://www.instagram.com/mdyousufali001"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="hover:text-blue-400 transition"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="hover:text-blue-400 transition"
                        >
                            <FaTwitter />
                        </a>
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;