import Link from "next/link";

const policyPages = [
  { slug: "privacy-policy", name: "Privacy Policy" },
  { slug: "refund-policy", name: "Refund Policy" },
  { slug: "return-policy", name: "Return Policy" },
  { slug: "terms-and-conditions", name: "Terms & Conditions" },
  { slug: "shipping-policy", name: "Shipping Policy" },
];

export default function PolicyLanding() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-pink-700 mb-6">Our Policies</h1>
      <p className="mb-8 text-lg text-gray-700">Read our key policies for privacy, returns, refunds, shipping, and terms & conditions. Click below to view details.</p>
      <ul className="space-y-4">
        {policyPages.map((p) => (
          <li key={p.slug}>
            <Link href={`/policy/${p.slug}`} className="text-xl text-pink-600 font-semibold hover:underline">
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
