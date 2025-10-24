import type { StudyRoom } from "@/config/schema/StudyRoom";

export const RoomInfoPanel = ({
  room,
  userId,
}: {
  room: StudyRoom;
  userId: string;
}) => {
  const isOwner = room.owner._id === userId;
  const currentUserMemberInfo = room.members.find((m) => m.user === userId);
  const isAdmin = currentUserMemberInfo?.isAdmin || false;
  const canEdit = isOwner || isAdmin;

  return (
    <div className="p-6 h-full overflow-y-auto">
      <h3 className="text-xl font-bold mb-4">{room.name}</h3>
      <p className="text-base-content/70 mb-6">
        {room.description || "No description provided."}
      </p>
      <div className="mb-4">
        <span className="font-semibold">Owner:</span> {room.owner.name}
      </div>
      <div className="mb-6">
        <span className="font-semibold">Members:</span> {room.members.length}
      </div>
      {canEdit && (
        <button className="btn btn-outline btn-sm">Edit Room Details</button>
      )}
    </div>
  );
};
