// app/components/PresidentCard.tsx
import Image from "next/image";
import { ReactNode } from 'react';

type Member = {
  name: string;
  role?: string;
  image: string;
  info: ReactNode;
};

export default function PresidentCard({ name, role, image, info }: Member) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col lg:flex-row items-center gap-6 w-full mx-auto">
      <Image
        src={image}
        alt={name}
        width={180}
        height={180}
        className="rounded-full object-cover"
      />
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-bold">{name}</h3>
        {role && <p className="text-lg text-gray-500 mt-1">{role}</p>}
        <div className="text-base mt-3">{info}</div>
      </div>
    </div>
  );
}