import MemberCard from "@/components/MemberCard";

const FacultyofPOSH =[{
  name: "Shri Jagdeep Dhankhar",
  role: "Advisor",
  image: "/vicepresident.jpg",
  info: "Supports the President and oversees awareness programs.",
},{
    name: "Droupadi Murmu",
    role: "Advisor",
    image: "/president.jpg",
    info: "Head of the POSH committee. Leads initiatives and supervises policy implementations.",
},{
    name: "Shri Narendra Modi",
    role: "Advisor",
    image: "/president.jpg",
    info: "Prime Minister of India. Provides strategic direction and support for the POSH committee.",
},{
    name: "Shri Amit Shah",
    role: "Advisor",
    image: "/president.jpg",
    info: "Home Minister of India. Ensures the implementation of POSH policies across the country.",
},{
    name: "Shri Rajnath Singh",
    role: "Advisor",
    image: "/president.jpg",
    info: "Defence Minister of India. Advocates for POSH initiatives within the armed forces.",
},{
    name: "Smt. Nirmala Sitharaman",
    role: "Advisor",
    image: "/president.jpg",
    info: "Finance Minister of India. Supports funding and resources for POSH programs.",
}];

export default function FacultyofPOSHPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Faculty of POSH</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FacultyofPOSH.map((advisor, index) => (
          <MemberCard key={index} {...advisor} />
        ))}
      </div>
    </div>
  );
}