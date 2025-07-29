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
    { 
        title: 'ABOUT US', 
        href: '/about', 
        dropdown: [
            { name: 'PRESIDENT', href: '/about/president' },
            { name: 'ADVOCATES POSH TRAINING', href: '/about/poshAadvocates' }
        ] 
    },
    { 
        title: 'PUBLICATIONS', 
        href: '/publication', 
        dropdown: [
            { name: 'WEB ARTICLES', href: '/publication/web-articles' },
            { name: 'ISSUE BRIEFS', href: '/publication/issue-briefs' },
            { name: 'NEWSLETTERS', href: '/publication/newsletters' },
            { name: 'WCRT JOURNAL', href: '/publication/wcrt-journal' },
            { name: 'VOICE FOR HER & CHILD', href: '/publication/voice-for-her-and-child' },
            { name: 'INTERNATIONAL JOURNAL OF TRANSNATION OF GENDER EQUALITY', href: '/publication/international-journal-of-transnation-of-gender-equality' },
            { name: 'SCHOLAR WARRIOR', href: '/publication/scholar-warrior' },
            { name: 'BOOKS', href: '/publication/books' },
            { name: 'RAJKUMARI KAUL ESSAY COMPETITIONS', href: '/publication/rajkumari-kaul-essay-competitions' },
            { name: 'INTERNS WRITE UP CAPSULE', href: '/publication/interns-write-up-capsule' },
            { name: 'POLICIES', href: '/publication/policies' }
        ]
    },
    { 
        title: 'RESEARCH AREAS', 
        href: '/research', 
        dropdown: [
            { name: 'WOMEN RIGHTS & DEVELOPMENT', href: '/research/women-rights-and-development' },
            { name: 'CHILD RIGHTS & DEVELOPMENT', href: '/research/child-rights-and-development' },
            { name: 'NATIONAL DATA: ATROCITIES AGAINST WOMEN', href: '/research/national-data-atrocities-against-women' },
            { name: 'CHILD DEVELOPMENT & MALNUTRITION', href: '/research/child-development-and-malnutrition' }
        ]
    },
    { title: 'ARCHIVE', href: '/archive', dropdown: null },
    { 
        title: 'EVENTS', 
        href: '/events', 
        dropdown: [
            { name: 'SEMINAR', href: '/events/seminar' },
            { name: 'WEBINAR', href: '/events/webinar' }
        ]
    },
    { title: 'APLC(EXAM)', href: '/exam', dropdown: null },
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
    const joinUsBtnRef = useRef<HTMLButtonElement>(null);
    const connectBtnRef = useRef<HTMLButtonElement>(null);
    const [caretLeft, setCaretLeft] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobileView, setIsMobileView] = useState<boolean>(false);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);
        setIsMobileView(window.innerWidth < 768);
        
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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

    const [activeDropdownJoin, setActiveDropdownJoin] = useState<string | null>(null);
    const [activeDropdownConnect, setActiveDropdownConnect] = useState<string | null>(null);
    const [selectedJoinOption, setSelectedJoinOption] = useState<'volunteer' | 'intern'>('volunteer');

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

    const handleDropdownToggle = (dropdown: string) => {
        if (dropdown === 'join') {
            if (activeDropdownJoin === dropdown) {
                setActiveDropdownJoin(null);
                setCaretLeft(null);
                setSelectedJoinOption('volunteer'); // Reset selected option when dropdown closes
            } else {
                setActiveDropdownJoin(dropdown);
                setActiveDropdownConnect(null);
                setSelectedJoinOption('volunteer'); // Reset selected option when dropdown opens
                if (joinUsBtnRef.current && containerRef.current) {
                    setCaretLeft(joinUsBtnRef.current.offsetLeft + joinUsBtnRef.current.offsetWidth / 2);
                }
            }
        } else if (dropdown === 'connect') {
            if (activeDropdownConnect === dropdown) {
                setActiveDropdownConnect(null);
                setCaretLeft(null);
            } else {
                setActiveDropdownConnect(dropdown);
                setActiveDropdownJoin(null);
                if (connectBtnRef.current && containerRef.current) {
                    setCaretLeft(connectBtnRef.current.offsetLeft + connectBtnRef.current.offsetWidth / 2);
                }
            }
        }
    };

    const handleBackdropClick = () => {
        setActiveDropdownJoin(null);
        setActiveDropdownConnect(null);
        setSelectedJoinOption('volunteer'); // Reset selected option when backdrop is clicked
    };

    useEffect(() => {
        if (activeDropdownJoin || activeDropdownConnect) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [activeDropdownJoin, activeDropdownConnect]);

    const handleJoinFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);
        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.append('type', selectedJoinOption);
        if (resumeFile) {
            formData.append('resume', resumeFile);
        }
        try {
            const res = await fetch('${process.env.NEXT_PUBLIC_BACKEND}/api/applicationFormSumbit', {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                setSubmitMessage('Application submitted successfully!');
                form.reset();
                setResumeFile(null);
            } else {
                setSubmitMessage('Failed to submit application. Please try again.');
            }
        } catch (err) {
            setSubmitMessage('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <TopNavbar />
            <div
                className="max-w-[100vw] w-6xl mx-auto bg-cover bg-center 
                bg-[#d50b8b] 
                md:bg-[image:url('/BannerNew.png')]
                md:cursor-pointer"
            >
                <div className="container relative mx-auto px-3 sm:px-4 md:w-6xl py-4 md:py-10" ref={containerRef}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            {/* Hamburger button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden p-3 text-gray-200 rounded-md hover:bg-pink-700 transition-colors"
                                aria-label="Menu"
                            >
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            {/* Logo */}
                            <Link href="/" className="flex items-center md:invisible">
                                <Image
                                    src="/wcrt-logo.png"
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
                <div className="container relative mx-auto px-4 md:w-6xl">
                    <nav className="hidden md:block border-t border-gray-200">
                        <ul className="flex justify-between items-center py-2">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="relative group"
                                    onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                                    onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                                >
                                    <div className="flex items-center">
                                        <Link
                                            href={item.href || '#'}
                                            className={`text-sm font-semibold px-3 py-2 relative transition-colors duration-200
                                                ${isActivePage(item) ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'}
                                            `}
                                        >
                                            {item.title}
                                            {item.dropdown && (
                                                <svg className="w-4 h-4 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            )}
                                            <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 transform origin-left transition-transform duration-300 ease-out
                                                ${isActivePage(item) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                                            `}></div>
                                        </Link>
                                        
                                        {/* Dropdown menu */}
                                        {item.dropdown && activeDropdown === index && (
                                            <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                                <div className="py-2">
                                                    {item.dropdown.map((dropdownItem, dropIndex) => (
                                                        <Link
                                                            key={dropIndex}
                                                            href={dropdownItem.href}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200"
                                                        >
                                                            {dropdownItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                            <li>
                                <button
                                    ref={joinUsBtnRef}
                                    onClick={() => handleDropdownToggle('join')}
                                    className="text-sm font-semibold px-3 py-2 relative transition-colors duration-200 text-gray-700 hover:text-pink-600"
                                >
                                    JOIN US
                                    {activeDropdownJoin === 'join' && (
                                        <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-pink-600"></span>
                                    )}
                                </button>
                            </li>
                            <li>
                                <button
                                    ref={connectBtnRef}
                                    onClick={() => handleDropdownToggle('connect')}
                                    className="text-sm font-semibold px-3 py-2 relative transition-colors duration-200 text-gray-700 hover:text-pink-600"
                                >
                                    CONNECT
                                    {activeDropdownConnect === 'connect' && (
                                        <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-pink-600"></span>
                                    )}
                                </button>
                            </li>
                        </ul>
                    </nav>

                    {/* Join Us Dropdown */}
                    {activeDropdownJoin === 'join' && (
                        <div
                            className="absolute left-0 z-50 animate-in slide-in-from-top-4 duration-300 md:top-full"
                            style={{ top: window.innerWidth < 768 ? '0' : '100%', width: '100%', height: window.innerWidth < 768 ? '100vh' : '450px', maxHeight: window.innerWidth < 768 ? '100vh' : '80vh' }}
                        >
                            <div className="relative w-full h-full border-4 border-pink-500 border-t-yellow-400 shadow-2xl">
                                {caretLeft !== null && (
                                    <span
                                        className="absolute -top-4"
                                        style={{ left: caretLeft - 16 }}
                                    >
                                        <span className="block w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></span>
                                    </span>
                                )}
                                <div className="flex w-full h-full flex-col md:flex-row">
                                    {isMobileView && (
                                        <div className="bg-pink-600 p-4 flex justify-between items-center">
                                            <h2 className="text-xl font-semibold text-white">Join Us</h2>
                                            <button 
                                                onClick={() => handleBackdropClick()}
                                                className="text-white p-2"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    <div className="w-full md:w-1/3 bg-white p-4 md:p-8 flex flex-col justify-center">
                                        <h2 className="text-2xl md:text-3xl font-light mb-3 md:mb-4 leading-tight text-pink-700">
                                            Join us
                                        </h2>
                                        <p className="text-base text-gray-700 mb-3 md:mb-4 leading-relaxed">
                                            Seeking creative collaborators to push us in exciting, new directions.
                                        </p>
                                        
                                    </div>
                                    <div className='w-full md:w-2/3 bg-gray-100 p-4 md:p-8  overflow-y-auto'>{/* Tab Bar */}
                                        <div className="flex space-x-2 mt-4">
                                            <button
                                                className={`px-4 py-2 rounded-t-md font-semibold text-sm focus:outline-none transition-colors duration-200 ${selectedJoinOption === 'volunteer' ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-pink-100'}`}
                                                onClick={() => setSelectedJoinOption('volunteer')}
                                                type="button"
                                            >
                                                Volunteer
                                            </button>
                                            <button
                                                className={`px-4 py-2 rounded-t-md font-semibold text-sm focus:outline-none transition-colors duration-200 ${selectedJoinOption === 'intern' ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-pink-100'}`}
                                                onClick={() => setSelectedJoinOption('intern')}
                                                type="button"
                                            >
                                                Intern
                                            </button>
                                        </div>
                                    <div className="bg-gray-100 p-4 md:p-8 flex items-center justify-center overflow-y-auto">
                                    
                                        <div className="w-full h-full overflow-y-auto px-2 md:px-4">
                                            <form className="max-w-xl w-full mx-auto" onSubmit={handleJoinFormSubmit} encType="multipart/form-data">
                                                <h3 className="text-xl font-bold mb-3 md:mb-4 text-center">
                                                    {selectedJoinOption === 'volunteer' ? 'Volunteer Application' : 'Internship Application'}
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                                    <div className="mb-2 md:mb-3">
                                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            className="shadow appearance-none border rounded w-full py-2 md:py-1.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                                                            placeholder="Enter your name"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="mb-2 md:mb-3">
                                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            className="shadow appearance-none border rounded w-full py-2 md:py-1.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                                                            placeholder="Enter your email"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                                    <div className="mb-2 md:mb-3">
                                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="phone">
                                                            Phone
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            id="phone"
                                                            name="phone"
                                                            className="shadow appearance-none border rounded w-full py-2 md:py-1.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                                                            placeholder="Enter your phone number"
                                                            required
                                                        />
                                                    </div>
                                                    {selectedJoinOption === 'intern' && (
                                                        <div className="mb-2 md:mb-3">
                                                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="university">
                                                                University/College
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="university"
                                                                name="university"
                                                                className="shadow appearance-none border rounded w-full py-2 md:py-1.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                                                                placeholder="Enter your university/college"
                                                                required
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mb-3">
                                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="resume">
                                                        Upload Resume
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="resume"
                                                        name="resume"
                                                        accept=".pdf,.doc,.docx"
                                                        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                                                        onChange={e => setResumeFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="message">
                                                        {selectedJoinOption === 'volunteer' ? 'Why do you want to volunteer?' : 'Why do you want to intern with us?'}
                                                    </label>
                                                    <textarea
                                                        id="message"
                                                        name="message"
                                                        className="shadow appearance-none border rounded w-full py-2 md:py-1.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                                                        placeholder="Write your message"
                                                        rows={2}
                                                        required
                                                    ></textarea>
                                                </div>
                                                <div className="text-center mt-4">
                                                    <button
                                                        type="submit"
                                                        className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 md:py-1.5 px-6 rounded-md focus:outline-none focus:shadow-outline text-sm disabled:opacity-60"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                                    </button>
                                                </div>
                                                {submitMessage && (
                                                    <div className={`mt-3 text-center text-sm ${submitMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{submitMessage}</div>
                                                )}
                                            </form>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Connect Dropdown */}
                    {activeDropdownConnect === 'connect' && (
                        <div
                            className="absolute left-0 z-50 animate-in slide-in-from-top-4 duration-300 md:top-full"
                            style={{ top: window.innerWidth < 768 ? '0' : '100%', width: '100%', height: window.innerWidth < 768 ? '100vh' : '450px', maxHeight: window.innerWidth < 768 ? '100vh' : '80vh' }}
                        >
                            <div className="relative w-full h-full border-4 border-pink-500 border-t-yellow-400 shadow-2xl">
                                {caretLeft !== null && !isMobileView && (
                                    <span
                                        className="absolute -top-4"
                                        style={{ left: caretLeft - 16 }}
                                    >
                                        <span className="block w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></span>
                                    </span>
                                )}
                                <div className="flex w-full h-full flex-col md:flex-row">
                                    {isMobileView && (
                                        <div className="bg-pink-600 p-4 flex justify-between items-center">
                                            <h2 className="text-xl font-semibold text-white">Connect</h2>
                                            <button 
                                                onClick={() => handleBackdropClick()}
                                                className="text-white p-2"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    {/* Left: Address and Details */}
                                    <div className="w-full md:w-1/2 bg-white p-4 md:p-8 flex flex-col justify-center">
                                        <h2 className="text-2xl md:text-3xl font-light mb-3 md:mb-4 leading-tight text-pink-700">
                                            Connect
                                        </h2>
                                        <div className="mb-3">
                                            <h4 className="text-base font-medium mb-1">Address</h4>
                                            <p className="text-sm">WCRT Headquarters, New Delhi, India</p>
                                        </div>
                                        <div className="mb-3">
                                            <h4 className="text-base font-medium mb-1">Email</h4>
                                            <a href="mailto:connect@wcrt.in" className="text-pink-600 hover:underline text-sm">connect@wcrt.in</a>
                                        </div>
                                        <div className="mb-3">
                                            <h4 className="text-base font-medium mb-1">Phone</h4>
                                            <p className="text-sm">+91 120 4999484</p>
                                        </div>
                                        <div>
                                            <h4 className="text-base font-medium mb-1">Social Media</h4>
                                            <div className="flex space-x-3">
                                                <a href="#" className="text-pink-600 hover:text-pink-800 text-sm">Twitter</a>
                                                <a href="#" className="text-pink-600 hover:text-pink-800 text-sm">Facebook</a>
                                                <a href="#" className="text-pink-600 hover:text-pink-800 text-sm">Instagram</a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Right: Contact Form */}
                                    <div className="w-full md:w-1/2 bg-gray-100 p-4 md:p-6 flex items-center overflow-y-auto">
                                        <form className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md p-4 md:p-6">
                                            <h3 className="text-xl font-light mb-3 md:mb-4 text-center text-pink-700">Contact Us</h3>
                                            <div className="mb-2 md:mb-3">
                                                <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="name">Name</label>
                                                <input className="shadow appearance-none border rounded w-full py-2 md:py-1.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your Name" />
                                            </div>
                                            <div className="mb-2 md:mb-3">
                                                <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="email">Email</label>
                                                <input className="shadow appearance-none border rounded w-full py-2 md:py-1.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your Email" />
                                            </div>
                                            <div className="mb-2 md:mb-3">
                                                <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="message">Message</label>
                                                <textarea className="shadow appearance-none border rounded w-full py-2 md:py-1.5 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline resize-none" id="message" placeholder="Your Message" rows={isMobileView ? 2 : 3}></textarea>
                                            </div>
                                            <div className="flex items-center justify-center mt-3">
                                                <button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 md:py-1.5 px-6 text-sm rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200">
                                                    Send
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div
                    ref={mobileMenuRef}
                    className="fixed inset-y-0 left-0 w-72 bg-white shadow-lg z-50 overflow-y-auto md:hidden"
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
                                            className={`block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-md flex-grow text-base
                                                ${isActivePage(item) ? 'text-pink-600 bg-pink-50' : ''}
                                            `}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.title}
                                        </Link>
                                        {item.dropdown && (
                                            <button
                                                onClick={() => toggleDropdown(index)}
                                                className="p-3 text-gray-500 rounded-md"
                                            >
                                                <svg
                                                    className={`w-5 h-5 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`}
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
                                        <ul className="pl-6 mt-1 space-y-1 bg-gray-50 rounded-md py-2">
                                            {item.dropdown.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link
                                                        href={subItem.href}
                                                        className={`block py-2 px-4 text-sm text-gray-600 hover:bg-gray-100 rounded-md
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
                            
                            {/* Additional JOIN US and CONNECT options for mobile */}
                            <li className="mt-4 pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        handleDropdownToggle('join');
                                    }}
                                    className="w-full flex items-center justify-between py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                                >
                                    <span>JOIN US</span>
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        handleDropdownToggle('connect');
                                    }}
                                    className="w-full flex items-center justify-between py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                                >
                                    <span>CONNECT</span>
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}

            {/* Overlay when mobile menu is open */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"></div>
            )}

            {/* Backdrop */}
            {(activeDropdownJoin || activeDropdownConnect) && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-pink-100 z-40"
                    style={{ backgroundColor: 'rgba(252, 231, 243, 0.7)' }}
                    onClick={handleBackdropClick}
                />
            )}
        </>
    );
};

export default Header;
