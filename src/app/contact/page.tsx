"use client";

import { useState, useEffect } from 'react';

export default function Contact() {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const handleDropdownToggle = (dropdown: string) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const handleBackdropClick = () => {
        setActiveDropdown(null);
    };

    useEffect(() => {
        if (activeDropdown) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [activeDropdown]);

    return (
        <div className="bg-gradient-to-br from-pink-50 to-blue-50 min-h-screen py-16 px-4 flex flex-col items-center">
            <div className="max-w-2xl w-full text-center mb-12">
                <h1 className="text-5xl font-extrabold text-pink-700 mb-4 tracking-tight drop-shadow-lg">Contact WCRT</h1>
                <p className="text-lg text-gray-700 mb-8">We'd love to hear from you. Whether you have questions, want to collaborate, or need support, reach out to us!</p>
            </div>
            <div className="w-full max-w-xl bg-white/80 rounded-3xl shadow-2xl p-10 border border-pink-100">
                <div className="flex flex-col items-center mb-8">
                    <img src="/wcrt-logo.png" alt="WCRT Logo" className="h-20 w-auto mb-4 rounded-full shadow" />
                    <h2 className="text-2xl font-bold text-pink-600 mb-2">Women & Child Rights Trust (WCRT)</h2>
                </div>
                <ul className="text-base text-gray-800 space-y-3 mb-6">
                    <li><span className="font-semibold">Address:</span> C-84, Sector 2, Noida, Uttar Pradesh, India</li>
                    <li><span className="font-semibold">Phone:</span> <a href="tel:01120893146" className="text-blue-700 underline">011-20893146</a></li>
                    <li><span className="font-semibold">Email:</span> <a href="mailto:info@wcrt.in" className="text-blue-700 underline">info@wcrt.in</a></li>
                    <li><span className="font-semibold">Website:</span> <a href="https://www.wcrt.in" className="text-blue-700 underline">www.wcrt.in</a></li>
                </ul>
                <div className="flex justify-center gap-6 mt-6">
                    <a href="#" className="text-gray-400 hover:text-pink-600 text-3xl transition"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="text-gray-400 hover:text-pink-600 text-3xl transition"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="text-gray-400 hover:text-pink-600 text-3xl transition"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="text-gray-400 hover:text-pink-600 text-3xl transition"><i className="fab fa-youtube"></i></a>
                </div>
            </div>

            <div className="px-8">
                <h1 className="text-4xl font-bold mb-6 text-pink-700">Contact Us</h1>
                <p className="mb-4 text-lg">We are here to assist you. Feel free to reach out to us for any inquiries or support.</p>

                {/* Backdrop */}
                {activeDropdown && (
                    <div 
                        className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-40"
                        onClick={handleBackdropClick}
                    />
                )}

                {/* Join Us Dropdown */}
                {activeDropdown === 'join' && (
                    <div className="fixed top-[73px] left-0 w-full h-[50vh] z-50 flex">
                        <div className="w-1/3 bg-white p-12 flex flex-col justify-center">
                            <h2 className="text-4xl font-light mb-6 leading-tight text-pink-700">
                                Join us
                            </h2>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Seeking creative collaborators to push us in exciting, new directions.
                            </p>
                        </div>
                        <div className="w-2/3 bg-gray-100 p-12 flex items-center">
                            <div className="max-w-2xl">
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <a href="#" className="block text-xl font-light mb-4 underline hover:no-underline transition-all">
                                            Current opportunities
                                        </a>
                                        <a href="#" className="block text-xl font-light mb-4 underline hover:no-underline transition-all">
                                            Inclusion & belonging
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#" className="block text-xl font-light mb-4 underline hover:no-underline transition-all">
                                            Work at Weber
                                        </a>
                                        <a href="#" className="block text-xl font-light mb-4 underline hover:no-underline transition-all">
                                            Employee stories
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Connect Dropdown */}
                {activeDropdown === 'connect' && (
                    <div className="fixed top-[73px] left-0 w-full h-[50vh] z-50 flex">
                        <div className="w-1/3 bg-white p-8 flex flex-col justify-center">
                            <h2 className="text-3xl font-light mb-4 leading-tight text-pink-700">
                                Connect
                            </h2>
                            <p className="text-base text-gray-700 leading-relaxed">
                                Ready to join us? Explore opportunities today.
                            </p>
                        </div>
                        <div className="w-2/3 bg-gray-100 p-8 flex items-center overflow-y-auto">
                            {/* Form content here */}
                        </div>
                    </div>
                )}

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-pink-600">Reach Out</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <button 
                                onClick={() => handleDropdownToggle('join')}
                                className="text-blue-700 underline"
                            >
                                Join Us Dropdown
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => handleDropdownToggle('connect')}
                                className="text-blue-700 underline"
                            >
                                Connect Dropdown
                            </button>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}