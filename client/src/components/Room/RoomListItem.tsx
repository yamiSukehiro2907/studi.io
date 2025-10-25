import type { StudyRoom } from "@/config/schema/StudyRoom";

export const RoomListItem = ({
  room,
  isSelected,
  onClick,
}: {
  room: StudyRoom;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const roomName = room.name;

  const getLastMessage = () => {
    if (room.members.length === 0) return "No members yet";
    if (room.members.length === 1) return "1 member";
    return `${room.members.length} members`;
  };

  const getOwnerName = () => {
    if (typeof room.owner === "string") return "Owner";
    return room.owner.name;
  };

  return (
    <div
      className={`p-4 flex items-center gap-4 cursor-pointer border-l-4 transition-all duration-150 rounded-r-lg
        ${
          isSelected
            ? "bg-neutral-900 border-emerald-500"
            : "border-transparent hover:bg-neutral-950"
        }`}
      onClick={onClick}
    >
      {/* Room Image or Placeholder */}
      <div className="avatar flex-shrink-0">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
          {room.roomImage ? (
            <img
              src={room.roomImage}
              alt={roomName}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-neutral-800 text-emerald-500 font-semibold">
              {roomName.substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Room Info */}
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2">
          <h3
            className={`font-semibold truncate ${
              isSelected ? "text-emerald-400" : "text-neutral-100"
            }`}
          >
            {roomName}
          </h3>
          {room.isPrivate && (
            <span className="text-xs text-neutral-400/70">Private</span>
          )}
        </div>
        <p className="text-sm truncate text-neutral-400/70">
          {getLastMessage()} • {getOwnerName()}
        </p>
      </div>
    </div>
  );
};
