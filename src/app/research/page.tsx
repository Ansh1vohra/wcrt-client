import Link from "next/link";

const researchCategories = [
  {
    slug: "women-rights-development",
    name: "Women Rights & Development",
  },
  {
    slug: "child-rights-development",
    name: "Child Rights & Development",
  },
  {
    slug: "national-data-atrocities-women",
    name: "National Data: Atrocities Against Women",
  },
  {
    slug: "child-development-malnutrition",
    name: "Child Development & Malnutrition",
  },
  // Add more categories as needed
];

export default function ResearchLanding() {
  return (
    <main className="container mx-auto px-4 max-w-full">
      <div className="max-w-[750px] mt-[30px] p-8">
        <h1 className="text-4xl font-bold text-pink-700 mb-6">Research & Reports</h1>
        <p className="mb-8 text-lg text-gray-700">Explore our research categories and access the latest articles, data, and reports on women and child rights, development, and more.</p>
        <ul className="space-y-4">
          {researchCategories.map((cat) => (
            <li key={cat.slug}>
              <Link href={`/research/${cat.slug}`} className="text-xl text-pink-600 font-semibold hover:underline">
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
