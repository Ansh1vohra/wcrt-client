'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-white py-16 w-full relative">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* About Us Section with Logo */}
        <div className="space-y-6">
          <Link href="/" className="block mb-4">
            <Image
              src="/wrctlogo.png"
              alt="Women & Child Right Trust"
              width={250}
              height={100}
              className="object-contain"
              priority
            />
          </Link>
          <h3 className="text-[#FF1493] font-semibold text-xl">About us</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
             The Women & Child Rights Trust (WRCT) is a dedicated organization working towards protecting and promoting the rights of women and children in India. Our mandate encompasses advocacy for gender equality, child protection, education rights, and supporting initiatives that empower women and ensure child welfare through research, policy recommendations, and community engagement.
          </p>
        </div>

        {/* Browse by Category Section */}
        <div className="md:ml-8 lg:ml-12">
          <h3 className="text-[#FF1493] font-semibold text-xl mb-8">Browse by Category</h3>
          <div className="grid grid-cols-2 gap-8">
            <ul className="space-y-4">
              <li><Link href="/articles" className="hover:text-[#FF1493]">Articles</Link></li>
              <li><Link href="/autumn-2019" className="hover:text-[#FF1493]">Autumn 2019</Link></li>
              <li><Link href="/autumn-2020" className="hover:text-[#FF1493]">Autumn 2020</Link></li>
              <li><Link href="/books" className="hover:text-[#FF1493]">Books</Link></li>
              <li><Link href="/claws-focus" className="hover:text-[#FF1493]">WRCT Focus</Link></li>
              <li><Link href="/claws-journal" className="hover:text-[#FF1493]">WRCT Journal</Link></li>
              <li><Link href="/essay" className="hover:text-[#FF1493]">Essay</Link></li>
              <li><Link href="/events" className="hover:text-[#FF1493]">Events</Link></li>
            </ul>
            <ul className="space-y-4">
              <li><Link href="/external-publications" className="hover:text-[#FF1493]">External Publications</Link></li>
              <li><Link href="/fmmec" className="hover:text-[#FF1493]">FMMEC</Link></li>
              <li><Link href="/intern-articles" className="hover:text-[#FF1493]">Intern Articles</Link></li>
              <li><Link href="/issue-briefs" className="hover:text-[#FF1493]">Issue Briefs</Link></li>
              <li><Link href="/director-general" className="hover:text-[#FF1493]">Jottings By Director General Emiritus</Link></li>
              <li><Link href="/manekshaw" className="hover:text-[#FF1493]">Manekshaw Papers</Link></li>
            </ul>
          </div>
        </div>

        {/* Recent News Section */}
        <div className="md:ml-8 lg:ml-12">
          <h3 className="text-[#FF1493] font-semibold text-xl mb-8">Recent News</h3>
          <ul className="space-y-4">
            <li><Link href="/newsletter" className="hover:text-[#FF1493]">Newsletter</Link></li>
            <li><Link href="/round-tables" className="hover:text-[#FF1493]">Round Tables</Link></li>
            <li><Link href="/scholar-warrior" className="hover:text-[#FF1493]">Scholar Warrior</Link></li>
            <li><Link href="/seminars" className="hover:text-[#FF1493]">Seminars</Link></li>
            <li><Link href="/uncategorized" className="hover:text-[#FF1493]">Uncategorized</Link></li>
            <li><Link href="/web-updates" className="hover:text-[#FF1493]">Web Updates</Link></li>
            <li><Link href="/winter-2019" className="hover:text-[#FF1493]">Winter 2019</Link></li>
            <li><Link href="/youtube-podcast" className="hover:text-[#FF1493]">YouTube Podcast</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 mt-16 pt-8 border-t border-gray-700">
        <div className="flex flex-wrap justify-between items-center gap-8">
          <div className="text-sm text-gray-400">
            © 2008-2024 Centre for Land Warfare Studies (wrct).
          </div>
          <div className="flex flex-wrap gap-8 text-sm text-gray-400">
            <Link href="/site-map" className="hover:text-[#FF1493]">Site Map</Link>
            <span>|</span>
            <Link href="/tenders" className="hover:text-[#FF1493]">Tenders</Link>
            <span>|</span>
            <Link href="/advertise" className="hover:text-[#FF1493]">Advertise With Us</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-[#FF1493]">Terms of use</Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-[#FF1493]">Privacy Policy</Link>
            <span>|</span>
            <Link href="/think-tanks" className="hover:text-[#FF1493]">Other Think Tanks</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}