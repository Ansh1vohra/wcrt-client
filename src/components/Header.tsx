'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)

    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const publicationMenu = [
        { name: "Web Articles", href: "/publication/web-articles" },
        { name: "Issue Briefs", href: "/publication/issue-briefs" },
        { name: "Research Reports", href: "/publication/research-reports" },
        { name: "Newsletters", href: "/publication/newsletters" },
        { name: "WRCT Journal", href: "/publication/wrct-journal" },
        { name: "Scholar Warrior", href: "/publication/scholar-warrior" },
        { name: "Books", href: "/publication/books" },
        { name: "Essays", href: "/publication/essays" }
    ]

    return (
        <header className="w-full">
            {/* Top Bar */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="text-gray-600 text-sm">{getCurrentDate()}</div>
                    <div className="flex items-center gap-8">
                        <Link href="/advertise" className="text-gray-600 hover:text-gray-900">
                            ADVERTISE WITH US
                        </Link>
                        <Link href="/support" className="text-gray-600 hover:text-gray-900">
                            SUPPORT US
                        </Link>
                        <Link href="/write" className="text-gray-600 hover:text-gray-900">
                            WRITE FOR US
                        </Link>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 pr-2 py-1 border border-gray-300 rounded w-64"
                            />
                            <svg 
                                className="w-4 h-4 absolute left-2 top-2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header with Logo and Title */}
            <div className="bg-[#8B0000] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-8">
                        <div className="bg-white p-2 rounded-full">
                            <Image
                                src="/wrctlogo.png"
                                alt="CLAWS Logo"
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
                        </div>
                        <div className="text-white">
                            <h1 className="text-6xl font-serif mb-2">WCRT</h1>
                            <h2 className="text-2xl font-serif">Womens and Child Right Trust</h2>
                        </div>
                    </div>
                </div>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <pattern id="pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 10 M 15 -5 L 5 5 M 20 -10 L 10 0" strokeWidth="1" stroke="white" fill="none"/>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#pattern)"/>
                    </svg>
                </div>
            </div>

            {/* Navigation */}
            <nav className="bg-white border-b">
                <div className="max-w-7xl mx-auto">
                    <ul className="flex justify-between items-center px-4 py-4 relative">
                        <li><Link href="/" className="hover:text-[#8B0000]">HOME</Link></li>
                        <li><Link href="/about" className="hover:text-[#8B0000]">ABOUT US</Link></li>

                        {/* Publication Dropdown */}
                        <li
                            className="relative group"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <div className="flex items-center gap-1 cursor-pointer hover:text-[#8B0000]">
                                <span>PUBLICATION</span>
                                <ChevronDown size={16} />
                            </div>
                            {showDropdown && (
                                <ul className="absolute top-full left-0 bg-white border mt-2 shadow-lg z-50 w-56 rounded">
                                    {publicationMenu.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="block px-4 py-2 text-sm hover:bg-gray-100"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        <li><Link href="/research" className="hover:text-[#8B0000]">RESEARCH AREAS</Link></li>
                        <li><Link href="/archive" className="hover:text-[#8B0000]">WEB ARCHIVE</Link></li>
                        <li><Link href="/events" className="hover:text-[#8B0000]">EVENTS</Link></li>
                        <li><Link href="/promex" className="hover:text-[#8B0000]">PROMEX</Link></li>
                        <li><Link href="/university" className="hover:text-[#8B0000]">UNIVERSITY CELL</Link></li>
                        <li><Link href="/careers" className="hover:text-[#8B0000]">CAREERS</Link></li>
                        <li><Link href="/contact" className="hover:text-[#8B0000]">CONTACT</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header
