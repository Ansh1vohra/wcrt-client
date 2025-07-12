import Image from "next/image";
import Link from "next/link";

const AdvertisementPage = () => {
  return (
    <div className="p-6 md:p-12 bg-gradient-to-b from-yellow-50 via-pink-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-pink-700 drop-shadow-lg tracking-tight">
        Advertise With Us
      </h1>

      <div className="space-y-12 max-w-5xl mx-auto">
        {/* Magazine Section */}
        <section className="group bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-yellow-200 flex flex-col md:flex-row items-center">
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-yellow-600 mb-3">Magazine Advertising</h2>
            <p className="text-gray-700 mb-4 text-lg">
              Advertise in our visually rich, high-quality magazine. Choose between full-page, half-page, and custom spots crafted to boost your brand.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-2">
              <li>Quarterly digital + print issues</li>
              <li>Custom design support</li>
              <li>High-impact industry reach</li>
            </ul>
          </div>
          <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-yellow-100 to-yellow-300 h-56" />
        </section>

        {/* Event & Seminar Section */}
        <section className="group bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-pink-200 flex flex-col md:flex-row-reverse items-center">
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-pink-600 mb-3">Event & Seminar Sponsorship</h2>
            <p className="text-gray-700 mb-4 text-lg">
              Sponsor our popular events and seminars to directly engage with industry professionals, boost your brand recognition, and demonstrate leadership.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-2">
              <li>Brand booths and stalls</li>
              <li>Live demos and speaking slots</li>
              <li>On-site and online exposure</li>
            </ul>
          </div>
          <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-pink-100 to-pink-300 h-56" />
        </section>

        {/* Website Advertising Section */}
        <section className="group bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-yellow-100 flex flex-col md:flex-row items-center">
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-yellow-700 mb-3">Website Advertising</h2>
            <p className="text-gray-700 mb-4 text-lg">
              Get featured on our website through banner ads, sponsored posts, and email campaigns. A perfect way to connect with a digital-first audience.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-2">
              <li>Prime banner placements</li>
              <li>Blog post sponsorship</li>
              <li>Email newsletter promotions</li>
            </ul>
          </div>
          <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-yellow-100 to-pink-100 h-56" />
        </section>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold mb-4 text-pink-700">Ready to Promote with Us?</h3>
        <Link href="/contact">
          <button className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Contact Us for Advertising
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdvertisementPage;
