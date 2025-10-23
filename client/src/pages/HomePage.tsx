import { Plus } from "lucide-react";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { StudyRoomCard } from "@/components/StudyRoomCard";

export default function HomePage() {
  // @ts-ignore
  const { user } = useSelector((state: RootState) => state.user);

  const rooms = [
    { id: "1", title: "Physics 101 Finals Prep", members: 4 },
    { id: "2", title: "Data Structures & Algos", members: 8 },
    { id: "3", title: "History of Art", members: 2 },
  ];

  return (
    <div className="container mx-auto p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user ? user.name.split(" ")[0] : "Student"}!
          </h1>
          <p className="text-base-content/70 mt-2">
            Here are your active study rooms.
          </p>
        </div>
        <button className="btn btn-primary btn-md mt-4 sm:mt-0">
          <Plus className="size-5 mr-2" />
          Create New Room
        </button>
      </div>

      {/* Study Rooms Grid */}
      {rooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <StudyRoomCard
              key={room.id}
              title={room.title}
              members={room.members}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-base-100 rounded-2xl border border-dashed border-base-content/30">
          <h2 className="text-2xl font-semibold">No Rooms Yet!</h2>
          <p className="text-base-content/60 mt-2 mb-6">
            Get started by creating a new study room for you and your friends.
          </p>
          <button className="btn btn-primary">
            <Plus className="size-5 mr-2" />
            Create Your First Room
          </button>
        </div>
      )}
    </div>
  );
}
