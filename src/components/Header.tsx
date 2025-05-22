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
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

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
                            {showMobileSearch ? (
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
                            )}
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

                        {/* Search Input - Desktop */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                spellCheck="false"
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="absolute left-3 top-2.5 text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
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