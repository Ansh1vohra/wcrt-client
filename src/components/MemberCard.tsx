import Image from "next/image";

type Member = {
  name: string;
  role?: string;
  image: string;
  info: string;
};



const MemberCard = ({ name, role, image, info }: Member) => (
  <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-xl transition duration-300 max-w-sm text-center">
    <Image
      src={image}
      alt={name}
      width={150}
      height={150}
      className="rounded-full mx-auto mb-3 object-cover"
    />
    <h3 className="text-lg font-bold">{name}</h3>
    {role && <p className="text-sm text-gray-500">{role}</p>}
    <p className="text-sm mt-2">{info}</p>
  </div>
);
export default MemberCard;
