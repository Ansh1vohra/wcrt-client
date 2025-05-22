'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type MenuItem = {
    title: string;
    dropdown: { name: string, href: string }[] | null;
    href?: string;
};

const Header = () => {
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const menuItems: MenuItem[] = [
        { title: "HOME", dropdown: null, href: "/" },
        { title: "ABOUT US", dropdown: null, href: "/about" },
         {
            title: "PUBLICATION",
            dropdown: [
                { name: "Web Articles", href: "/publication/web-articles" },
                { name: "Issue Briefs", href: "/publication/issue-briefs" },
                { name: "Research reports", href: "/publication/research-reports" },
                { name: "Newsletters", href: "/publication/newsletters" },
                { name: "WRCT Journal", href: "/publication/wrct-journal" },
                { name: "Scholar Warrior", href: "/publication/scholar-warrior" },
                { name: "Books", href: "/publication/books" },
                { name: "Essays", href: "/publication/essays" }
            ]
        },
        { title: "RESEARCH AREAS", dropdown: null, href: "/research" },
        { title: "WEB ARCHIVE", dropdown: null, href: "/archive" },
        { title: "EVENTS", dropdown: null, href: "/events" },
        { title: "PROMEX", dropdown: null, href: "/promex" },
        { title: "UNIVERSITY CELL", dropdown: null, href: "/university" },
        { title: "CAREERS", dropdown: null, href: "/careers" },
        { title: "CONTACT", dropdown: null, href: "/contact" }
    ];

    return (
        <div ref={headerRef} className="w-full max-w-6xl mx-auto">
            {/* Top Bar */}
            <div className="bg-white border-b">
                <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="text-gray-600 text-sm">{getCurrentDate()}</div>
                    <div className="hidden md:flex gap-6">
                        <Link href="/advertise" className="text-gray-600 hover:text-gray-900 text-sm">
                            ADVERTISE WITH US
                        </Link>
                        <Link href="/support" className="text-gray-600 hover:text-gray-900 text-sm">
                            SUPPORT US
                        </Link>
                        <Link href="/write" className="text-gray-600 hover:text-gray-900 text-sm">
                            WRITE FOR US
                        </Link>
                    </div>
                    <div className="relative hidden md:block">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 pr-3 py-1 border border-gray-300 rounded w-48 text-sm"
                        />
                        <svg 
                            className="w-4 h-4 text-gray-400 absolute left-2 top-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-[#8B0000]">
                <div className="max-w-5xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-6">
                        <div className="bg-white rounded-full p-2">
                            <Image
                                src="/wrctlogo.png"
                                alt="WRCT Logo"
                                width={80}
                                height={80}
                                className="rounded-full"
                            />
                        </div>
                        <div className="text-white">
                            <h1 className="text-4xl font-serif mb-1">WRCT</h1>
                            <h2 className="text-xl font-serif">Women & Child Rights Trust</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="bg-white border-b shadow-lg">
                <div className="max-w-5xl mx-auto">
                    <div className="hidden md:block">
                        <ul className="flex justify-between items-center py-3 px-4">
                            {menuItems.map((item, index) => (
                                <li 
                                    key={index}
                                    className="relative"
                                    onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <Link 
                                        href={item.href || '#'}
                                        className="text-sm text-gray-700 hover:text-[#8B0000] font-medium px-2"
                                    >
                                        {item.title}
                                    </Link>
                                    {item.dropdown && activeDropdown === index && (
                                        <div className="absolute left-0 mt-1 w-44 bg-white rounded-md shadow-lg z-50">
                                            <ul className="py-1">
                                                {item.dropdown.map((subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link
                                                            href={subItem.href}
                                                            className="block px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden p-3">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden">
                            <ul className="px-2 pt-2 pb-3">
                                {menuItems.map((item, index) => (
                                    <li key={index} className="mb-1">
                                        <Link
                                            href={item.href || '#'}
                                            className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:text-[#8B0000] hover:bg-gray-50"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Header;