import MemberCard from "@/components/MemberCard";

const poshadvocates =[{
  name: "Shri Jagdeep Dhankhar",
  role: "Advisor",
  image: "/assets/Shri Jagdeep Dhankhar.jpg",
  info: "Supports the President and oversees awareness programs.",
},{
    name: "Droupadi Murmu",
    role: "Advisor",
    image: "/assets/droupadi-murmu.jpg",
    info: "Head of the POSH committee. Leads initiatives and supervises policy implementations.",
},{
    name: "Shri Narendra Modi",
    role: "Advisor",
    image: "/assets/The_Prime_Minister_of_India,_Shri_Narendra_Modi.jpg",
    info: "Prime Minister of India. Provides strategic direction and support for the POSH committee.",
},{
    name: "Shri Amit Shah",
    role: "Advisor",
    image: "/assets/Amit Shah.jpg",
    info: "Home Minister of India. Ensures the implementation of POSH policies across the country.",
},{
    name: "Shri Rajnath Singh",
    role: "Advisor",
    image: "/assets/The_official_portrait_of_Defence_Minister_Shri_Rajnath_Singh.jpg",
    info: "Defence Minister of India. Advocates for POSH initiatives within the armed forces.",
},{
    name: "Smt. Nirmala Sitharaman",
    role: "Advisor",
    image: "/assets/Smt._Nirmala_Sitharaman_in_February_2023.jpg",
    info: "Finance Minister of India. Supports funding and resources for POSH programs.",
}];

export default function PoshAdvocatesPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">POSH Advocates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {poshadvocates.map((advocate, index) => (
          <MemberCard key={index} {...advocate} />
        ))}
      </div>
    </div>
  );
}