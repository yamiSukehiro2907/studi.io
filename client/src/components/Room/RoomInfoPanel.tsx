import type { StudyRoom } from "@/config/schema/StudyRoom";
import { Crown, ShieldCheck, User, Users } from "lucide-react";

export const RoomInfoPanel = ({
  room,
  userId,
}: {
  room: StudyRoom;
  userId: string;
}) => {
  const isOwner = room.owner._id === userId;
  const currentUserMemberInfo = room.members.find((m) => m.user._id === userId);
  const isAdmin = currentUserMemberInfo?.isAdmin || false;
  const canEdit = isOwner || isAdmin;

  return (
    <div className="p-6 h-full overflow-y-auto space-y-8 bg-base-100">
      {/* --- Description Card --- */}
      <div className="card bg-base-200 shadow-sm rounded-xl p-5">
        <h4 className="font-semibold text-base-content/80 mb-2 flex items-center gap-2">
          📝 Description
        </h4>
        <p className="text-sm text-base-content/70 leading-relaxed">
          {room.description || (
            <span className="italic text-base-content/50">
              No description provided.
            </span>
          )}
        </p>
      </div>

      {/* --- Owner Card --- */}
      <div className="card bg-base-200 shadow-sm rounded-xl p-5">
        <h4 className="font-semibold text-base-content/80 mb-3 flex items-center gap-2">
          👑 Owner
        </h4>
        <div className="flex items-center gap-4 p-3 bg-base-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-warning ring-offset-base-100 ring-offset-2">
              {room.owner.profileImage ? (
                <img src={room.owner.profileImage} alt={room.owner.name} />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-neutral text-neutral-content">
                  <span className="text-sm font-semibold">
                    {room.owner.name?.[0]?.toUpperCase() || <User size={14} />}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-base-content">
              {room.owner.name}
            </span>
            <span className="text-xs text-base-content/60">Room Owner</span>
          </div>
          <Crown className="ml-auto text-warning size-5" />
        </div>
      </div>

      {/* --- Members List --- */}
      <div className="card bg-base-200 shadow-sm rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-base-content/80 flex items-center gap-2">
            <Users className="size-4 text-primary" />
            Members ({room.members.length})
          </h4>
        </div>

        <ul className="space-y-2">
          {room.members.map((member) => {
            const isCurrentUser = member.user._id === userId;
            const isMemberOwner = member.user._id === room.owner._id;
            const isMemberAdmin = member.isAdmin && !isMemberOwner;

            return (
              <li
                key={member._id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-150 border border-transparent hover:border-base-300 ${
                  isCurrentUser
                    ? "bg-primary/10 border-primary/20"
                    : "bg-base-100 hover:bg-base-200"
                }`}
              >
                {/* Avatar */}
                <div className="avatar">
                  <div className="w-9 rounded-full">
                    {member.user.profileImage ? (
                      <img
                        src={member.user.profileImage}
                        alt={member.user.name}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full bg-neutral text-neutral-content">
                        <span className="text-sm font-semibold">
                          {member.user.name?.[0]?.toUpperCase() || (
                            <User size={14} />
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Member Info */}
                <div className="flex flex-col">
                  <span
                    className={`font-medium flex items-center gap-1 ${
                      isCurrentUser ? "text-primary" : "text-base-content"
                    }`}
                  >
                    {member.user.name}
                    {isCurrentUser && (
                      <span className="text-xs text-primary/70 font-medium">
                        (You)
                      </span>
                    )}
                  </span>

                  {isMemberOwner && (
                    <span className="text-xs text-warning font-medium">
                      Owner
                    </span>
                  )}
                  {isMemberAdmin && (
                    <span className="text-xs text-info font-medium">Admin</span>
                  )}
                </div>

                {/* Role Icons */}
                {isMemberOwner && (
                  <Crown className="size-4 text-warning ml-auto" />
                )}
                {isMemberAdmin && (
                  <ShieldCheck className="size-4 text-info ml-auto" />
                )}

                {/* Context Menu Placeholder */}
                {canEdit && member.user._id !== userId && (
                  <button className="btn btn-xs btn-ghost ml-auto px-2">
                    ...
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
