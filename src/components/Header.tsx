"use client"
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type MenuItem = {
    title: string;
    dropdown: { name: string, href: string }[] | null;
    href?: string;
};

const Header = () => {
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Add useEffect to handle client-side mounting
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Focus search input when mobile search is shown
    useEffect(() => {
        if (showMobileSearch && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showMobileSearch]);

    const toggleDropdown = (dropdown: number) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleMobileSearch = () => {
        setShowMobileSearch(!showMobileSearch);
    };

    const menuItems: MenuItem[] = [
        {
            title: "HOME",
            dropdown: null,
            href: "/"
        },
        {
            title: "ABOUT US",
            dropdown: null,
            href: "/about"
        },
        {
            title: "PUBLICATION",
            dropdown: [
                { name: "Web Articles", href: "/publication/web-articles" },
                { name: "Issue Briefs", href: "/publication/issue-briefs" },
                { name: "Research reports", href: "/publication/research-reports" },
                { name: "Newsletters", href: "/publication/newsletters" },
                { name: "WCRT Journal", href: "/publication/wcrt-journal" },
                { name: "Scholar Warrior", href: "/publication/scholar-warrior" },
                { name: "Books", href: "/publication/books" },
                { name: "Essays", href: "/publication/essays" }
            ]
        },
        {
            title: "RESEARCH AREAS",
            dropdown: null,
            href: "/research"
        },
        {
            title: "WEB ARCHIVE",
            dropdown: null,
            href: "/archive"
        },
        {
            title: "EVENTS",
            dropdown: null,
            href: "/events"
        },
        {
            title: "PROMEX",
            dropdown: null,
            href: "/promex"
        },
        {
            title: "UNIVERSITY CELL",
            dropdown: null,
            href: "/university"
        },
        {
            title: "CAREERS",
            dropdown: null,
            href: "/careers"
        },
        {
            title: "CONTACT",
            dropdown: null,
            href: "/contact"
        }
    ];

    // Desktop search input section
    const renderDesktopSearch = () => {
        if (!isClient) return null;
        
        return (
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    spellCheck={false}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
        );
    };

    const renderMobileSearch = () => {
        if (!isClient) return null;

        return showMobileSearch ? (
            <div className="relative ml-2">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-40"
                />
                <div className="absolute left-2 top-1.5 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <button
                    onClick={() => setShowMobileSearch(false)}
                    className="absolute right-2 top-1.5 text-gray-400"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        ) : (
            <button
                onClick={toggleMobileSearch}
                className="p-2 text-gray-700 focus:outline-none"
                aria-label="Search"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        );
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <div className="container mx-auto px-8 py-2">
                    {/* Top Bar - Mobile */}
                    <div className="flex items-center justify-between md:hidden">
                        {/* Hamburger Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 text-gray-700 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* Logo - Centered on mobile */}
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <Image
                                    src="/wrctlogo.png"
                                    width={150}
                                    height={50}
                                    alt="Logo"
                                    className="h-12 w-auto"
                                />
                            </Link>
                        </div>

                        {/* Search Icon - Mobile */}
                        <div className="flex items-center">
                            {renderMobileSearch()}
                        </div>
                    </div>

                    {/* Top Bar - Desktop */}
                    <div className="hidden md:flex items-center justify-between border-b-2 border-gray-200 pb-2">
                        <div className="flex items-center">
                            <Link href="/">
                                <Image
                                    src="/wrctlogo.png"
                                    width={200}
                                    height={200}
                                    alt="Logo"
                                    className="h-16 w-auto"
                                />
                            </Link>
                        </div>

                        {/* Search Input - Desktop */}
                        {renderDesktopSearch()}
                    </div>

                    {/* Main Navigation - Desktop */}
                    <nav className="hidden md:block mt-2">
                        <ul className="flex flex-wrap justify-evenly gap-4">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="relative group"
                                    onMouseEnter={() => item.dropdown && toggleDropdown(index)}
                                    onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                                >
                                    <div className="flex items-center">
                                        <Link
                                            href={item.href || '#'}
                                            className="text-gray-700 hover:text-gray-900 font-medium py-2"
                                        >
                                            {item.title}
                                        </Link>
                                        {item.dropdown && (
                                            <span className="ml-1">
                                                <svg
                                                    className={`w-4 h-4 text-gray-500 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>

                                    {/* Dropdown Menu */}
                                    {item.dropdown && activeDropdown === index && (
                                        <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg z-10">
                                            <ul className="py-1">
                                                {item.dropdown.map((subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link
                                                            href={subItem.href}
                                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                    </nav>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div
                        ref={mobileMenuRef}
                        className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 overflow-y-auto md:hidden"
                    >
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 text-gray-700 focus:outline-none"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h3 className="text-lg font-medium">Menu</h3>
                            <div className="w-6"></div> {/* Spacer for alignment */}
                        </div>

                        <nav className="p-4">
                            <ul className="space-y-2">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <div className="flex items-center justify-between">
                                            <Link
                                                href={item.href || '#'}
                                                className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded flex-grow"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {item.title}
                                            </Link>
                                            {item.dropdown && (
                                                <button
                                                    onClick={() => toggleDropdown(index)}
                                                    className="p-2 text-gray-500"
                                                >
                                                    <svg
                                                        className={`w-4 h-4 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>

                                        {item.dropdown && activeDropdown === index && (
                                            <ul className="pl-6 mt-1 space-y-1">
                                                {item.dropdown.map((subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link
                                                            href={subItem.href}
                                                            className="block py-1 px-4 text-sm text-gray-600 hover:bg-gray-100 rounded"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )}
            </header>

            {/* Overlay when mobile menu is open */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"></div>
            )}
        </>
    );
};

export default Header;