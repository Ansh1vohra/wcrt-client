import PresidentCard from "@/components/PresidentCart";
import { ReactNode } from 'react';

interface Member {
  name: string;
  role: string;
  image: string;
  info: ReactNode;
}

const vicePresidentData: Member = {
  name: "Shri Jagdeep Dhankhar",
  role: "Vice President",
  image: "/assets/Shri Jagdeep Dhankhar.jpg",
  info: (
    <>
      Shri Jagdeep Dhankhar is the 14th and current Vice-President of India, having assumed office on August 11, 2022. Born on May 18, 1951, in Kithana village of Rajasthan Jhunjhunu district
      <br /><br />
       he comes from a humble farming background. A lawyer by profession, Dhankhar graduated in law from the University of Rajasthan and built a successful legal career, practicing in the Supreme Court and various High Courts
      <br /><br />
      Before his election as Vice-President, he served as the Governor of West Bengal from July 2019 to July 2021. Known for his strong stance on constitutional values and governance, Dhankhar has been an advocate for the rights of farmers and rural communities.
    </>
  )
};
export default function VicePresidentPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Vice President</h1>
      <PresidentCard {...vicePresidentData} />
    </div>
  );
}