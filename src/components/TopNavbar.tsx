import { useState, useEffect } from "react";
import Link from "next/link";

export default function TopNavbar() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [formattedDateTime, setFormattedDateTime] = useState<string>('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const dateOptions: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            const timeOptions: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            const date = now.toLocaleDateString('en-US', dateOptions);
            const time = now.toLocaleTimeString('en-US', timeOptions);
            setFormattedDateTime(`${date}, ${time}`);
        };

        updateDateTime(); // Initial call
        const interval = setInterval(updateDateTime, 1000); // Update every second

        return () => clearInterval(interval); // Clean up
    }, []);

    return (
        <div className="bg-neutral-100">
            <div className="max-w-6xl mx-auto p-2 flex items-center justify-between hidden text-xs md:flex">
                <div className="flex items-center md:max-w-6xl">
                    <span className="text-gray-600">{formattedDateTime}</span>
                    <span className="mx-3 text-gray-400">|</span>
                    <Link href="/advertise" className="text-gray-600 hover:text-gray-900">
                        ADVERTISE WITH US
                    </Link>
                    <span className="mx-3 text-gray-400">|</span>
                    <Link href="/donate" className="text-gray-600 hover:text-gray-900">
                        SUPPORT US (DONATE)
                    </Link>
                    <span className="mx-3 text-gray-400">|</span>
                    <Link href="/writeforus" className="text-gray-600 hover:text-gray-900">
                        WRITE FOR US
                    </Link>
                    <span className="mx-3 text-gray-400">|</span>
                    <Link href="/shop" className="text-gray-600 hover:text-gray-900">
                        SHOP(FUND RAISER)
                    </Link>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        spellCheck={false}
                        className="pl-10 pr-4 py-2"
                    />
                    <div className="absolute left-3 top-2.5 text-gray-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
