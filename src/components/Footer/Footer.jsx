import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <img src="/path/to/logo.png" alt="Website Logo" className="w-8 h-8 mb-4" />
                        <p className="text-white font-bold text-lg">Toy Shop</p>
                        <p>&copy; {new Date().getFullYear()} Toy Shop. All rights reserved.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Contact Us</h4>
                        <p>123 Street, City, Country</p>
                        <p>Phone: 123-456-7890</p>
                        <p>Email: info@toyshop.com</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/about" className="text-gray-300 hover:text-white">About</a>
                            </li>
                            <li>
                                <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
                            </li>
                            <li>
                                <a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                <FaTwitter></FaTwitter>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                <FaFacebook></FaFacebook>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                                <FaInstagram></FaInstagram>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
