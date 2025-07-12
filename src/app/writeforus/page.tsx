import Link from 'next/link';

export default function WriteForUsPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 via-pink-50 to-white p-8">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-pink-700 mb-4 drop-shadow-lg">Write For Us</h1>
        <p className="text-gray-700 text-lg mb-6">
          Are you passionate about women's and children's rights, social justice, or community development? Share your voice and expertise with our audience!<br /><br />
          We welcome articles, stories, research, and creative content from writers, activists, students, and professionals. Your contribution can inspire change and awareness.
        </p>
        <ul className="text-left text-gray-600 mb-6 list-disc list-inside mx-auto max-w-md">
          <li>Original, unpublished work only</li>
          <li>800–1500 words preferred</li>
          <li>Attach relevant images (with credits)</li>
          <li>Include a short author bio</li>
        </ul>
        <p className="text-gray-700 mb-8">Ready to contribute or have questions? Reach out to us!</p>
        <Link href="/contact">
          <button className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  );
}
