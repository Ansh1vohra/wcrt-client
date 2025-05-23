import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {/* About us */}
        <div className="col-span-1">
          <h2 className="text-pink-500 font-semibold mb-4">About us</h2>
          <img
            src="/wcrtl2.jpeg"
            alt="WCRT Logo"
            className="w-34 mb-4"
          />
          <p className="text-sm leading-relaxed text-gray-300">
            WCRT - Women & Child Right Trust.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 bg-gray-700 rounded">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-gray-700 rounded">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 bg-gray-700 rounded">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 bg-gray-700 rounded">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Browse by Category */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-pink-500 font-semibold mb-4">Browse by Category</h2>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>Articles</li>
              <li>Autumn 2019</li>
              <li>Autumn 2020</li>
              <li>Books</li>
              <li>wrct Focus</li>
              <li>wrct Journal</li>
              <li>Essay</li>
              <li>Events</li>
            </ul>
          </div>
          <div>
            <ul className="mt-8 md:mt-0 space-y-1 text-sm text-gray-300">
              <li>External Publications</li>
              <li>FMMEC</li>
              <li>Intern Articles</li>
              <li>Issue Briefs</li>
              <li>Jottings By Director General Emeritus</li>
              <li>Manekshaw Papers</li>
              <li>Newsletter</li>
              <li>Round Tables</li>
              <li>Scholar Warrior</li>
              <li>Seminars</li>
              <li>Uncategorized</li>
              <li>Web Updates</li>
              <li>Winter 2019</li>
              <li>YouTube Podcast</li>
            </ul>
          </div>
        </div>

        {/* Recent News */}
        <div className="col-span-1">
          <h2 className="text-pink-500 font-semibold mb-4">Recent News</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              {/* <img
                src="/path-to-img1.jpg"
                alt="News 1"
                className="w-20 h-14 object-cover"
              /> */}
              <div>
                <p className="text-sm font-medium text-white">
                  Rise of Barelvi Islam in Pakistan & Its Implications for India
                </p>
                <p className="text-xs text-gray-400 mt-1">🕒 May 19, 2025</p>
              </div>
            </div>
            <div className="flex gap-4">
              {/* <img
                src="/path-to-img2.jpg"
                alt="News 2"
                className="w-20 h-14 object-cover"
              /> */}
              <div>
                <p className="text-sm font-medium text-white">
                  Democracy in Limbo : The Awami League Ban under Bangladesh’s Interim Rule
                </p>
                <p className="text-xs text-gray-400 mt-1">🕒 May 14, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-600 pt-6 text-sm text-gray-400 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© WCRT - Women & Child Right Trust.</p>
        <div className="flex flex-wrap gap-4 text-xs">
          <a href="#">Site Map</a>
          <a href="#">Tenders</a>
          <a href="#">Advertise With Us</a>
          <a href="#">Terms of use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Other Think Tanks</a>
        </div>
      </div>
    </footer>
  );
}
