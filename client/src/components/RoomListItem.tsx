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
    if (room.members.length === 0) {
      return "No members yet";
    }
    if (room.members.length === 1) {
      return "1 member";
    }
    return `${room.members.length} members`;
  };

  const getOwnerName = () => {
    if (typeof room.owner === "string") {
      return "Owner";
    }
    return room.owner.name;
  };

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
            {roomName.substring(0, 2).toUpperCase()}
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold truncate">{roomName}</h3>
          {room.isPrivate && (
            <span className="badge badge-sm badge-ghost">Private</span>
          )}
        </div>
        <p className="text-sm text-base-content/70 truncate">
          {getLastMessage()} • {getOwnerName()}
        </p>
      </div>
    </div>
  );
};
