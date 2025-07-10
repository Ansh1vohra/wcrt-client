import PresidentCard from "@/components/PresidentCart";
import { ReactNode } from 'react';

interface Member {
  name: string;
  role: string;
  image: string;
  info: ReactNode;
}

const presidentData: Member = {
  name: "Droupadi Murmu",
  role: "President",
  image: "/assets/droupadi-murmu.jpg",
  info: (
    <>
      Droupadi Murmu is the 15th and current President of India, having assumed office on July 25, 2022. She made history by becoming the first tribal person and the second woman to hold the highest constitutional position in the country.
      <br /><br />
      Born on June 20, 1958, in Uparbeda village in the Mayurbhanj district of Odisha, she belongs to the Santhal tribal community. Murmu began her career as a teacher and later worked as a junior assistant in the Odisha government.
      <br /><br />
      Her political journey started with the Bharatiya Janata Party (BJP), and she served as an MLA from Rairangpur between 2000 and 2009, during which she held several ministerial roles in the Odisha government, including portfolios like Transport, Commerce, and Fisheries.
      <br /><br />
      In 2015, she became the first woman and tribal leader to be appointed as the Governor of Jharkhand, a position she held until 2021.
      <br /><br />
      Known for her humility, strong connection to her tribal roots, and dedication to public service, Droupadi Murmu symbolizes empowerment for women and marginalized communities across India.
    </>
  )
};

export default function PresidentPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">President</h1>
      <PresidentCard {...presidentData} />
    </div>
  );
}