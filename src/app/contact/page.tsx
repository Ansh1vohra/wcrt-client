"use client";

export default function Contact() {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-blue-50 min-h-screen py-16 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full text-center mb-12">
        <h1 className="text-5xl font-extrabold text-pink-700 mb-4 tracking-tight drop-shadow-lg">Contact WCRT</h1>
        <p className="text-lg text-gray-700 mb-8">We'd love to hear from you. Whether you have questions, want to collaborate, or need support, reach out to us!</p>
      </div>
      <div className="w-full max-w-xl bg-white/80 rounded-3xl shadow-2xl p-10 border border-pink-100">
        <div className="flex flex-col items-center mb-8">
          <img src="/wcrt-logo.png" alt="WCRT Logo" className="h-20 w-auto mb-4 rounded-full shadow" />
          <h2 className="text-2xl font-bold text-pink-600 mb-2">Women & Child Rights Trust (WCRT)</h2>
        </div>
        <ul className="text-base text-gray-800 space-y-3 mb-6">
          <li><span className="font-semibold">Address:</span> C-84, Sector 2, Noida, Uttar Pradesh, India</li>
          <li><span className="font-semibold">Phone:</span> <a href="tel:01120893146" className="text-blue-700 underline">011-20893146</a></li>
          <li><span className="font-semibold">Email:</span> <a href="mailto:info@wcrt.in" className="text-blue-700 underline">info@wcrt.in</a></li>
          <li><span className="font-semibold">Website:</span> <a href="https://www.wcrt.in" className="text-blue-700 underline">www.wcrt.in</a></li>
        </ul>
        <div className="flex justify-center gap-6 mt-6">
          <a href="#" className="text-gray-400 hover:text-pink-600 text-3xl transition"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-gray-400 hover:text-pink-600 text-3xl transition"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-gray-400 hover:text-pink-600 text-3xl transition"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-gray-400 hover:text-pink-600 text-3xl transition"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
    </div>
  );
}