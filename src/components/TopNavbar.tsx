import { useState, useEffect } from "react";
import Link from "next/link";

export default function TopNavbar(){
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [formattedDate, setFormattedDate] = useState<string>('');

    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            const date = now.toLocaleDateString('en-US', options);
            setFormattedDate(date);
        };

        updateDate(); // Initial call
        const interval = setInterval(updateDate, 60000); // Optional: update every minute

        return () => clearInterval(interval); // Clean up interval
    }, []);

    return (
        <div className="bg-neutral-100 py-2 flex items-center justify-around hidden text-xs md:flex">
            <div className="flex gap-6 md:max-w-6xl">
                <div>{formattedDate}</div>
                <Link href="/advertise" className="text-gray-600 hover:text-gray-900">
                    ADVERTISE WITH US
                </Link>
                <Link href="/support" className="text-gray-600 hover:text-gray-900">
                    SUPPORT US
                </Link>
                <Link href="/write" className="text-gray-600 hover:text-gray-900">
                    WRITE FOR US
                </Link>
                <Link href="/write" className="text-gray-600 hover:text-gray-900">
                    SHOP(FUND RAISER)
                </Link>
                <Link href="/donate" className="text-gray-600 hover:text-gray-900">
                    DONATE
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
    );
}