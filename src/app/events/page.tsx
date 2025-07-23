import Link from "next/link";

const eventCategories = [
  {
    slug: "seminar",
    name: "Seminar",
  },
  {
    slug: "webinar",
    name: "Webinar",
  },
];

export default function EventsLanding() {
  return (
    <main className="container mx-auto px-4 max-w-full">
      <div className="max-w-[750px] mt-[30px] p-8">
        <h1 className="text-4xl font-bold text-pink-700 mb-6">Events</h1>
        <p className="mb-8 text-lg text-gray-700">Explore our events including seminars and webinars on various topics related to women and child rights.</p>
        <ul className="space-y-4">
          {eventCategories.map((cat) => (
            <li key={cat.slug}>
              <Link href={`/events/${cat.slug}`} className="text-xl text-pink-600 font-semibold hover:underline">
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
