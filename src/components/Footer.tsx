'use client';

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main Footer Content */}
      <div className="px-8 py-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo and About */}
        <div className="col-span-1">
          <Image
            src="/wcrt-logo.png"
            width={180}
            height={60}
            alt="WCRT Logo"
            className="h-16 w-auto mb-4"
          />
          <p className="text-gray-300 text-sm mb-4">
            WCRT - Women & Child Rights Trust. Committed to advancing rights and development for women and children.
          </p>
          <div className="flex gap-3">
            <a href="#" className="p-2 bg-gray-700 rounded hover:bg-pink-600 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-gray-700 rounded hover:bg-pink-600 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 bg-gray-700 rounded hover:bg-pink-600 transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 bg-gray-700 rounded hover:bg-pink-600 transition-colors">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h3 className="text-pink-500 font-semibold mb-4 text-lg">QUICK LINKS</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/about" className="hover:text-pink-500 transition-colors">About Us</Link></li>
            <li><Link href="/archive" className="hover:text-pink-500 transition-colors">Archive</Link></li>
            <li><Link href="/career" className="hover:text-pink-500 transition-colors">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-pink-500 transition-colors">Contact Us</Link></li>
            <li><Link href="/exam" className="hover:text-pink-500 transition-colors">Exam</Link></li>
            <li><Link href="/policy/privacy-policy" className="hover:text-pink-500 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/policy/refund-policy" className="hover:text-pink-500 transition-colors">Refund Policy</Link></li>
            <li><Link href="/policy/return-policy" className="hover:text-pink-500 transition-colors">Return Policy</Link></li>
            <li><Link href="/policy/terms-and-conditions" className="hover:text-pink-500 transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/policy/shipping-policy" className="hover:text-pink-500 transition-colors">Shipping Policy</Link></li>
          </ul>
        </div>

        {/* Research Areas */}
        <div className="col-span-1">
          <h3 className="text-pink-500 font-semibold mb-4 text-lg">RESEARCH AREAS</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/research/women-rights-development" className="hover:text-pink-500 transition-colors">Women Rights & Development</Link></li>
            <li><Link href="/research/child-rights-development" className="hover:text-pink-500 transition-colors">Child Rights & Development</Link></li>
            <li><Link href="/research/national-data-atrocities-women" className="hover:text-pink-500 transition-colors">National Data for Atrocities on Women</Link></li>
            <li><Link href="/research/child-development-malnutrition" className="hover:text-pink-500 transition-colors">Child Development & Malnutrition</Link></li>
          </ul>
        </div>


        {/* Publication Categories */}
        <div className="col-span-1">
          <h3 className="text-pink-500 font-semibold mb-4 text-lg">PUBLICATIONS</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/publication/web-articles" className="hover:text-pink-500 transition-colors">Web Articles</Link></li>
            <li><Link href="/publication/issue-briefs" className="hover:text-pink-500 transition-colors">Issue Briefs</Link></li>
            <li><Link href="/publication/anna-chandy-papers" className="hover:text-pink-500 transition-colors">Anna Chandy Papers</Link></li>
            <li><Link href="/publication/newsletters" className="hover:text-pink-500 transition-colors">Newsletters</Link></li>
            <li><Link href="/publication/wcrt-journal" className="hover:text-pink-500 transition-colors">WCRT Journal</Link></li>
            <li><Link href="/publication/books" className="hover:text-pink-500 transition-colors">Books</Link></li>
          </ul>
        </div>
        
        {/* Events */}
        <div className="col-span-1">
          <h3 className="text-pink-500 font-semibold mb-4 text-lg">EVENTS</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/events/seminars" className="hover:text-pink-500 transition-colors">Seminars</Link></li>
            <li><Link href="/events/webinars" className="hover:text-pink-500 transition-colors">Webinars</Link></li>
          </ul>
        </div>
      </div>

      {/* Horizontal line with pink background */}
      <hr className="border-t border-grey-300" />

      {/* Support/Advertise Links Section */}
      <div className="py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4">
          <Link href="/advertise" className="text-white hover:text-gray-200 text-sm">
            ADVERTISE WITH US
          </Link>
          <span className="text-white">|</span>
          <Link href="/donate" className="text-white hover:text-gray-200 text-sm">
            SUPPORT US (Donate)
          </Link>
          <span className="text-white">|</span>
          <Link href="/writeforus" className="text-white hover:text-gray-200 text-sm">
            WRITE FOR US
          </Link>
          <span className="text-white">|</span>
          <Link href="/shop" className="text-white hover:text-gray-200 text-sm">
            SHOP (FUND RAISER)
          </Link>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} WCRT - Women & Child Rights Trust. All rights reserved.</p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-pink-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-pink-500 transition-colors">Terms of Use</Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-pink-500 transition-colors">Sitemap</Link>
            <Link href="/accessibility" className="text-gray-400 hover:text-pink-500 transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}