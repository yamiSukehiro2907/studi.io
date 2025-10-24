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
      className={`p-4 flex items-center gap-4 cursor-pointer border-l-4 transition-all duration-150 ${
        isSelected
          ? "bg-base-300 border-primary"
          : "border-transparent hover:bg-base-200"
      }`}
      onClick={onClick}
    >
      {/* Room Image or Placeholder */}
      <div className="avatar flex-shrink-0">
        <div className="w-12 h-12 rounded-xl overflow-hidden ring-1 ring-base-300 bg-base-300">
          {room.roomImage ? (
            <img
              src={room.roomImage}
              alt={roomName}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-primary/20 text-primary-content">
              <span className="text-sm font-semibold">
                {roomName.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Room Info */}
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold truncate text-base-content">
            {roomName}
          </h3>
          {room.isPrivate && (
            <span className="badge badge-sm badge-ghost text-xs">Private</span>
          )}
        </div>
        <p className="text-sm text-base-content/70 truncate">
          {getLastMessage()} • {getOwnerName()}
        </p>
      </div>
    </div>
  );
};
