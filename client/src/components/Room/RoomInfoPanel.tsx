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
    <div className="p-6 h-full overflow-y-auto space-y-8 bg-neutral-950">
      {/* --- Description --- */}
      <div className="bg-neutral-900 rounded-xl border border-emerald-800/40 p-5">
        <h4 className="font-semibold text-emerald-500 mb-2 flex items-center gap-2">
          📝 Description
        </h4>
        <p className="text-sm text-emerald-400/70 leading-relaxed">
          {room.description || (
            <span className="italic text-emerald-400/50">
              No description provided.
            </span>
          )}
        </p>
      </div>

      {/* --- Owner --- */}
      <div className="bg-neutral-900 rounded-xl border border-emerald-800/40 p-5">
        <h4 className="font-semibold text-emerald-500 mb-3 flex items-center gap-2">
          👑 Owner
        </h4>
        <div className="flex items-center gap-4 p-3 bg-neutral-950 rounded-lg border border-emerald-800/40 hover:bg-neutral-900/50 transition-colors">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-emerald-600/50 ring-offset-neutral-950 ring-offset-2">
              {room.owner.profileImage ? (
                <img src={room.owner.profileImage} alt={room.owner.name} />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-neutral-900 text-emerald-500">
                  <span className="text-sm font-semibold">
                    {room.owner.name?.[0]?.toUpperCase() || <User size={14} />}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-emerald-500">
              {room.owner.name}
            </span>
            <span className="text-xs text-emerald-400/70">Room Owner</span>
          </div>
          <Crown className="ml-auto text-emerald-500 size-5" />
        </div>
      </div>

      {/* --- Members --- */}
      <div className="bg-neutral-900 rounded-xl border border-emerald-800/40 p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-emerald-500 flex items-center gap-2">
            <Users className="size-4 text-emerald-500" />
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
                key={member.user._id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  isCurrentUser
                    ? "bg-emerald-800/10 border-emerald-600/30"
                    : "bg-neutral-950 border-emerald-800/40 hover:bg-neutral-900/50"
                }`}
              >
                <div className="avatar">
                  <div className="w-9 rounded-full overflow-hidden">
                    {member.user.profileImage ? (
                      <img
                        src={member.user.profileImage}
                        alt={member.user.name}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full bg-neutral-900 text-emerald-500">
                        <span className="text-sm font-semibold">
                          {member.user.name?.[0]?.toUpperCase() || (
                            <User size={14} />
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <span
                    className={`font-medium flex items-center gap-1 ${
                      isCurrentUser ? "text-emerald-500" : "text-emerald-400"
                    }`}
                  >
                    {member.user.name}
                    {isCurrentUser && (
                      <span className="text-xs text-emerald-500/70 font-medium">
                        (You)
                      </span>
                    )}
                  </span>

                  {isMemberOwner && (
                    <span className="text-xs text-emerald-500 font-medium">
                      Owner
                    </span>
                  )}
                  {isMemberAdmin && (
                    <span className="text-xs text-emerald-400 font-medium">
                      Admin
                    </span>
                  )}
                </div>

                {isMemberOwner && (
                  <Crown className="size-4 text-emerald-500 ml-auto" />
                )}
                {isMemberAdmin && (
                  <ShieldCheck className="size-4 text-emerald-400 ml-auto" />
                )}

                {canEdit && member.user._id !== userId && (
                  <button className="btn btn-xs btn-ghost ml-auto px-2 text-emerald-400 hover:text-emerald-500">
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
