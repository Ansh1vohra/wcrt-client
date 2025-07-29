'use client'

import { useState } from 'react'
import Image from "next/image"
import Link from 'next/link'

// Import animations
import './about-animations.css'

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState('mission')
    
    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scale-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
                .animate-scale-in {
                    animation: scale-in 0.6s ease-out forwards;
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .bg-wcrt-gradient {
                    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffcc02 100%);
                }
                .bg-wcrt-circle {
                    background: linear-gradient(135deg, #fff5f0 0%, #ffe8d6 100%);
                }
                .text-transparent {
                    color: transparent;
                }
                .bg-clip-text {
                    background-clip: text;
                    -webkit-background-clip: text;
                }
                .shadow-warm {
                    box-shadow: 0 4px 20px rgba(255, 107, 53, 0.1);
                }
                .shadow-glow {
                    box-shadow: 0 8px 32px rgba(255, 107, 53, 0.2);
                }
            `}</style>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-4 lg:py-4">
                {/* Header Section */}
                <div className="text-left mb-12 lg:mb-10 animate-fade-in">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-pink-500 bg-clip-text text-transparent leading-tight">
                        Empowering Voices. Protecting Rights. Building Futures.
                    </h1>
                    <div className="mx-auto text-base text-justify sm:text-lg text-gray-700 leading-relaxed space-y-4 lg:space-y-6">
                        <p className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                            The Women and Child Rights Trust (WCRT) is a future-focused think tank dedicated to the rights and empowerment of women and children across India. We blend law, policy, education, and digital activism to create real impact—especially for those who are vulnerable or unheard.
                        </p>
                        <p className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                            Driven by Gen Z and Gen Alpha values, WCRT harnesses the creativity, digital fluency, and social consciousness of young changemakers. Our team of lawyers, educators, researchers, social workers, and youth volunteers works together to challenge injustice, promote equality, and build a more inclusive world.
                        </p>
                    </div>
                </div>

                {/* Mission, Vision, Values Section with Arrow Diagram */}
                <div className="mb-16 lg:mb-24">
                    <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                        {/* Mission Card with Arrow - Top/Left */}
                        <div className="relative animate-scale-in">
                            <div className="bg-white border-none shadow-warm hover:shadow-glow transition-all duration-300 w-80 rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-xl sm:text-2xl font-bold text-pink-500 mb-3 sm:mb-4">Mission</h3>
                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                        To help women and children thrive through education, healthcare, legal support, and real opportunities—working hand-in-hand with government and community partners.
                                    </p>
                                </div>
                            </div>
                            {/* Arrow pointing to center */}
                            <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                                <svg className="w-16 h-8 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"/>
                                </svg>
                            </div>
                        </div>

                        {/* Central Circle with WCRT Logo */}
                        <div className="flex justify-center relative z-10">
                            <div className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-pink-100 rounded-full flex items-center justify-center shadow-glow animate-float">
                                <Image src="/wcrt-logo.png" alt="WCRT Logo" width={128} height={128} />
                            </div>
                        </div>

                        {/* Vision and Values Cards - Right/Bottom side */}
                        <div className="flex flex-col gap-6">
                            {/* Vision Card with Arrow */}
                            <div className="relative animate-scale-in" style={{ animationDelay: "0.2s" }}>
                                <div className="bg-white border-none shadow-warm hover:shadow-glow transition-all duration-300 w-80 rounded-lg">
                                    <div className="p-6">
                                        <h3 className="text-xl sm:text-2xl font-bold text-pink-500 mb-3 sm:mb-4">Vision</h3>
                                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                            A safer, fairer world where every woman and child is empowered to grow and succeed.
                                        </p>
                                    </div>
                                </div>
                                {/* Arrow pointing to center */}
                                <div className="hidden lg:block absolute top-1/2 -left-8 transform -translate-y-1/2">
                                    <svg className="w-16 h-8 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
                                    </svg>
                                </div>
                            </div>

                            {/* Values Card with Arrow */}
                            <div className="relative animate-scale-in" style={{ animationDelay: "0.4s" }}>
                                <div className="bg-white border-none shadow-warm hover:shadow-glow transition-all duration-300 w-80 rounded-lg">
                                    <div className="p-6">
                                        <h3 className="text-xl sm:text-2xl font-bold text-pink-500 mb-3 sm:mb-4">Values</h3>
                                        <ul className="text-sm sm:text-base text-gray-700 space-y-2 leading-relaxed">
                                            <li>• Value our donors</li>
                                            <li>• Value our partners</li>
                                            <li>• Teamwork and collaboration</li>
                                            <li>• Value our staff and volunteers</li>
                                            <li>• Work with humility and respect</li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Arrow pointing to center */}
                                <div className="hidden lg:block absolute top-1/2 -left-8 transform -translate-y-1/2">
                                    <svg className="w-16 h-8 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Core Focus Areas */}
                <div className="mb-16 lg:mb-24">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 lg:mb-12 text-pink-500 animate-fade-in">Core Focus Areas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        <div className="bg-white border-none shadow-warm hover:shadow-glow transition-all duration-300 hover:scale-105 animate-scale-in rounded-lg">
                            <div className="p-6">
                                <div className="w-12 h-12 bg-pink-500 rounded-full mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L13.09 8.26L20 9.27L15.18 13.97L16.18 21L12 18.27L7.82 21L8.82 13.97L4 9.27L10.91 8.26L12 2Z"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-pink-500 mb-3 sm:mb-4">Legal Advocacy</h3>
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                    Free legal aid and support in cases of domestic violence, child abuse, trafficking, and gender discrimination.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border-none shadow-warm hover:shadow-glow transition-all duration-300 hover:scale-105 animate-scale-in rounded-lg" style={{ animationDelay: "0.2s" }}>
                            <div className="p-6">
                                <div className="w-12 h-12 bg-pink-500 rounded-full mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2Z"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-pink-500 mb-3 sm:mb-4">Education & Awareness</h3>
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                    Workshops and campaigns—both on-ground and online—covering safety, health, digital rights, and gender sensitivity for today's youth.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border-none shadow-warm hover:shadow-glow transition-all duration-300 hover:scale-105 animate-scale-in md:col-span-2 lg:col-span-1 rounded-lg" style={{ animationDelay: "0.4s" }}>
                            <div className="p-6">
                                <div className="w-12 h-12 bg-pink-500 rounded-full mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20Z"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-pink-500 mb-3 sm:mb-4">Research & Policy</h3>
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                    Actionable research and digital publications to shape better laws and governance for women and children.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Six Pillars Section */}
                <div className="mb-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-pink-500 animate-fade-in">Our Approach: Six Pillars for the Next Generation</h2>
                    <p className="text-center text-sm sm:text-base text-gray-700 mb-12 lg:mb-16 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
                        We build our impact on six dynamic pillars designed for today's realities—empowering children, women, families, and educators to thrive in a fast-changing, tech-driven world. These pillars address the unique challenges and opportunities facing Gen Alpha and Gen Z, guiding everything we do.
                    </p>

                    {/* Responsive Six Pillars Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Other pillars */}
                        {/* Repeat similar structure for other pillars */}
                    </div>

                    {/* Adding aboutus.png below the section */}
                    <div className="mt-12 text-center">
                        <Image src="/aboutus.png" alt="About Us" width={800} height={400} className="mx-auto rounded-lg shadow-lg" />
                    </div>
                </div>

                {/* Closing Statement */}
                <div className="text-center bg-pink-500 text-white p-6 sm:p-8 lg:p-12 rounded-2xl shadow-glow animate-scale-in">
                    <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-4xl mx-auto">
                        We believe real change happens when knowledge meets compassion—and when new generations lead the way. At WCRT, we're not just spreading awareness, we're inspiring a movement where every woman and child can live with dignity and equal opportunity.
                    </p>
                </div>
            </div>
        </div>
    )
}
