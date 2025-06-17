
"use client"
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import TopNavbar from './TopNavbar';

type MenuItem = {
    title: string;
    dropdown: { name: string, href: string }[] | null;
    href?: string;
};

const menuItems: MenuItem[] = [
    { title: 'HOME', href: '/', dropdown: null },
    { title: 'ABOUT US', href: '/about', dropdown: null },
    {
        title: 'PUBLICATION',
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
        title: 'RESEARCH AREAS',
        dropdown: [
            { name: 'Defense & Security', href: '/research/defense' },
            { name: 'Politics & Governance', href: '/research/politics' },
            { name: 'Economics & Trade', href: '/research/economics' }
        ]
    },
    { title: 'WEB ARCHIVE', href: '/archive', dropdown: null },
    {
        title: 'EVENTS', href: '/events', dropdown: [
            { name: 'Seminars', href: '/events/seminars' },
            { name: 'Webinars', href: '/events/webinars' }
        ]
    },
    { title: 'PROMEX', href: '/promex', dropdown: null },
    { title: 'CAREERS', href: '/careers', dropdown: null },
    { title: 'CONTACT', href: '/contact', dropdown: null },
];

const Header = () => {
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

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

    const isActivePage = (item: MenuItem) => {
        if (item.href === '/') {
            return pathname === '/';
        }
        if (item.href) {
            return item.href !== '/' && pathname.startsWith(item.href);
        }
        return item.dropdown?.some(drop => pathname === drop.href) || false;
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
                className="p-2 text-gray-200 focus:outline-none"
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
            {/* Top section with background image - scrolls normally */}
            <TopNavbar />
            <div
                className="max-w-[100vw] w-6xl mx-auto bg-cover bg-center 
                bg-[image:url('/headerbanner.png')] 
                md:bg-[image:url('/BannerNew.png')]"
            >
                <div className="container mx-auto px-4 md:w-6xl py-5 md:py-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {/* Hamburger button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden p-2 text-gray-200"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            {/* Logo */}
                            <Link href="/" className="flex items-center md:invisible">
                                <Image
                                    src="/wcrt-logo2.png"
                                    width={180}
                                    height={60}
                                    alt="Logo"
                                    className="h-12 md:h-24 w-auto"
                                />
                            </Link>
                        </div>

                        {/* Mobile search */}
                        <div className="md:hidden">
                            {renderMobileSearch()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky navigation bar - stays fixed at top when scrolling */}
            <div className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="container mx-auto px-4 md:w-6xl">
                    <nav className="hidden md:block border-t border-gray-200">
                        <ul className="flex justify-between items-center py-2">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="relative group"
                                    onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <div className="flex items-center">
                                        <Link
                                            href={item.href || '#'}
                                            className={`text-sm font-semibold text-black px-3 py-2 relative transition-colors duration-200
                                                ${isActivePage(item) ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'}
                                            `}
                                        >
                                            {item.title}
                                            <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 transform origin-left transition-transform duration-300 ease-out
                                                ${isActivePage(item) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                                            `}></div>
                                        </Link>
                                        {item.dropdown && (
                                            <svg
                                                className={`w-4 h-4 ml-1 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180 text-pink-600' : 'text-gray-400'
                                                    }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </div>

                                    {/* Dropdown */}
                                    {item.dropdown && activeDropdown === index && (
                                        <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 z-50 transform transition-all duration-200">
                                            {item.dropdown.map((dropItem, dropIndex) => (
                                                <Link
                                                    key={dropIndex}
                                                    href={dropItem.href}
                                                    className={`block px-4 py-2 text-sm transition-colors duration-200
                                                        ${pathname === dropItem.href
                                                            ? 'text-pink-600 bg-pink-50'
                                                            : 'text-gray-700 hover:text-pink-600 hover:bg-gray-50'
                                                        }
                                                    `}
                                                >
                                                    {dropItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
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
                        <div className="w-6"></div>
                    </div>

                    <nav className="p-4">
                        <ul className="space-y-2">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={item.href || '#'}
                                            className={`block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded flex-grow
                                                ${isActivePage(item) ? 'text-pink-600 bg-pink-50' : ''}
                                            `}
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
                                                        className={`block py-1 px-4 text-sm text-gray-600 hover:bg-gray-100 rounded
                                                            ${pathname === subItem.href ? 'text-pink-600 bg-pink-50' : ''}
                                                        `}
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

            {/* Overlay when mobile menu is open */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"></div>
            )}
        </>
    );
};

export default Header;
