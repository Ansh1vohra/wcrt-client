import Image from "next/image";
import Link from "next/link";

const AdvertisementPage = () => {
  return (
    <div className="p-6 md:p-12 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-blue-900">
        WHY YOU CAN CHOOSE US FOR ADVERTISING
      </h1>

      <div className="space-y-12">

        {/* Magazine Section */}
        <section className="group bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:flex">
          <div className="md:w-1/2">
            <Image
              src="/article.jpg"
              alt="Magazine Advertising"
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Magazine </h2>
            <p className="text-gray-700 mb-4">
              Advertise in our visually rich, high-quality magazine. Choose between full-page, half-page,
              and custom spots crafted to boost your brand.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Quarterly digital + print issues</li>
              <li>Custom design support</li>
              <li>High-impact industry reach</li>
            </ul>
          </div>
        </section>

        {/* Event & Seminar Section */}
        <section className="group bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:flex md:flex-row-reverse">
          <div className="md:w-1/2">
            <Image
              src="/article.jpg"
              alt="Event Sponsorship"
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Event & Seminar Sponsorship</h2>
            <p className="text-gray-700 mb-4">
              Sponsor our popular events and seminars to directly engage with industry professionals, boost your
              brand recognition, and demonstrate leadership.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Brand booths and stalls</li>
              <li>Live demos and speaking slots</li>
              <li>On-site and online exposure</li>
            </ul>
          </div>
        </section>

        {/* Website Advertising Section */}
        <section className="group bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:flex">
          <div className="md:w-1/2">
            <Image
              src="/article.jpg"
              alt="Website Advertising"
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Website </h2>
            <p className="text-gray-700 mb-4">
              Get featured on our website through banner ads, sponsored posts, and email campaigns. A perfect way
              to connect with a digital-first audience.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Prime banner placements</li>
              <li>Blog post sponsorship</li>
              <li>Email newsletter promotions</li>
            </ul>
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold mb-4">Ready to Promote with Us?</h3>
        <Link href="/contact">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow hover:shadow-lg">
            Contact Us for Advertising
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdvertisementPage;
