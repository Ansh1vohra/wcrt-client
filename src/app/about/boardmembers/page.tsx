import MemberCard from "@/components/MemberCard";

const BoardmembersData =[{
  name: "Shri Jagdeep Dhankhar",
  role: "Board Member",
  image: "/vicepresident.jpg",
  info: "Supports the President and oversees awareness programs.",
},{
    name: "Droupadi Murmu",
    role: "Board Member",
    image: "/president.jpg",
    info: "Head of the POSH committee. Leads initiatives and supervises policy implementations.",
},{
    name: "Shri Narendra Modi",
    role: "Board Member",
    image: "/president.jpg",
    info: "Prime Minister of India. Provides strategic direction and support for the POSH committee.",
},{
    name: "Shri Amit Shah",
    role: "Board Member",
    image: "/president.jpg",
    info: "Home Minister of India. Ensures the implementation of POSH policies across the country.",
},{
    name: "Shri Rajnath Singh",
    role: "Board Member",
    image: "/president.jpg",
    info: "Defence Minister of India. Advocates for POSH initiatives within the armed forces.",
},{
    name: "Smt. Nirmala Sitharaman",
    role: "Board Member",
    image: "/president.jpg",
    info: "Finance Minister of India. Supports funding and resources for POSH programs.",
}];

export default function BoardmemberPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Board members</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BoardmembersData.map((member, index) => (
          <MemberCard key={index} {...member} />
        ))}
      </div>
    </div>
  );
}