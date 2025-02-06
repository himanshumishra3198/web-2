import { Users } from "lucide-react";

interface RoomCardProps {
  slug: string;
  memberCount: number;
  description: string;
}

export const RoomCard = ({ slug, memberCount, description }: RoomCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-700">
      <h3 className="text-lg font-semibold text-gray-100">{slug}</h3>
      <p className="text-gray-400 mt-2 text-sm">{description}</p>
      <div className="flex items-center mt-4 text-gray-400">
        <Users className="w-4 h-4 mr-2" />
        <span className="text-sm">{memberCount} members</span>
      </div>
    </div>
  );
};
