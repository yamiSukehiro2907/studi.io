import { useState } from "react";
import { Plus, Users, X } from "lucide-react";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RoomListItem = ({
  room,
  isSelected,
  onClick,
}: {
  room: { id: string; title: string; lastMessage: string };
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`p-4 flex items-center gap-4 cursor-pointer border-l-4 ${
        isSelected
          ? "bg-base-300 border-primary"
          : "border-transparent hover:bg-base-200"
      }`}
      onClick={onClick}
    >
      <div className="avatar placeholder flex-shrink-0">
        <div className="bg-primary/20 text-primary-content rounded-full w-12">
          <span className="text-sm">
            {room.title.substring(0, 2).toUpperCase()}
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <h3 className="font-semibold truncate">{room.title}</h3>
        <p className="text-sm text-base-content/70 truncate">
          {room.lastMessage}
        </p>
      </div>
    </div>
  );
};

const WelcomePlaceholder = ({ userName }: { userName: string }) => {
  return (
    <div className="text-center text-base-content/60 max-w-sm mx-auto">
      <Users className="size-16 mx-auto" />
      <h2 className="text-2xl font-semibold mt-4">Welcome, {userName}!</h2>
      <p className="mt-2">
        Select a study room from the list to start collaborating, or create a
        new one.
      </p>
    </div>
  );
};

const CreateRoomModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [roomName, setRoomName] = useState("");

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating room:", roomName);
    onClose();
    setRoomName("");
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          <X className="size-5" />
        </button>
        <h3 className="font-bold text-lg">Create a New Study Room</h3>
        <p className="py-4 text-sm text-base-content/70">
          Give your room a name to get started.
        </p>
        <form onSubmit={handleCreateRoom}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Room Name</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Physics 101 Finals"
              className="input input-bordered w-full"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
            />
          </div>
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default function HomePage() {
  // @ts-ignore
  const { user } = useSelector((state: RootState) => state.user);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rooms = [
    {
      id: "1",
      title: "Physics 101 Finals Prep",
      members: 4,
      lastMessage: "Let's review chapter 3.",
    },
    {
      id: "2",
      title: "Data Structures & Algos",
      members: 8,
      lastMessage: "See you at 5.",
    },
    {
      id: "3",
      title: "History of Art",
      members: 2,
      lastMessage: "Just uploaded the slides.",
    },
  ];

  const userName = user ? user.name.split(" ")[0] : "Student";

  return (
    <div className="flex h-full border-t border-base-300">
      <div className="w-full md:w-[350px] lg:w-[400px] flex flex-col bg-base-100 flex-shrink-0 border-r border-base-300">
        <div className="p-4 flex justify-between items-center border-b border-base-300 h-[69px]">
          <h2 className="text-xl font-bold">Study Rooms</h2>
          <button
            className="btn btn-primary btn-sm btn-circle"
            title="Create New Room"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="size-5" />
          </button>
        </div>

        <div className="p-4 border-b border-base-300">
          <input
            type="text"
            placeholder="Search rooms..."
            className="input input-bordered w-full h-10"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <RoomListItem
                key={room.id}
                room={room}
                isSelected={selectedRoomId === room.id}
                onClick={() => setSelectedRoomId(room.id)}
              />
            ))
          ) : (
            <div className="text-center p-6 text-base-content/60">
              <p>No study rooms found.</p>
              <button
                className="btn btn-primary btn-sm mt-4"
                onClick={() => setIsModalOpen(true)}
              >
                Create one
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-base-200/50 p-4">
        {selectedRoomId ? (
          <div>
            <h1 className="text-2xl font-bold">
              Room: {rooms.find((r) => r.id === selectedRoomId)?.title}
            </h1>
            <p className="mt-4">
              (Here you would render the Chat, Whiteboard, and Resource Hub)
            </p>
            <Link
              to={`/room/${selectedRoomId}`}
              className="btn btn-primary mt-4"
            >
              Open Room
            </Link>
          </div>
        ) : (
          <WelcomePlaceholder userName={userName} />
        )}
      </div>

      <CreateRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
