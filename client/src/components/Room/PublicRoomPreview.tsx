import { useState } from "react";
import { Users, Lock, Globe, Crown } from "lucide-react";
import type { StudyRoom } from "@/config/schema/StudyRoom";

interface PublicRoomPreviewProps {
  room: StudyRoom;
  onJoinRoom: (room: StudyRoom) => Promise<void>;
}

export function PublicRoomPreview({
  room,
  onJoinRoom,
}: PublicRoomPreviewProps) {
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async () => {
    setIsJoining(true);
    try {
      await onJoinRoom(room);
    } finally {
      setIsJoining(false);
    }
  };

  const membersToShow = room.members?.slice(0, 5) || [];
  const remainingCount = (room.members?.length || 0) - 5;

  return (
    <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
      <div className="card bg-neutral-950 shadow-xl max-w-2xl w-full border border-neutral-800 hover:shadow-2xl transition-all duration-300 rounded-2xl">
        <div className="card-body space-y-4 text-emerald-400">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="card-title text-2xl font-bold mb-1 text-emerald-300">
                {room.name}
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                {room.isPrivate ? (
                  <div className="badge badge-warning gap-1 bg-amber-600/30 text-amber-300 border-none">
                    <Lock className="size-3" />
                    Private
                  </div>
                ) : (
                  <div className="badge badge-success gap-1 bg-emerald-600/30 text-emerald-300 border-none">
                    <Globe className="size-3" />
                    Public
                  </div>
                )}
                {room.createdAt && (
                  <span className="text-xs text-emerald-400/60">
                    Created {new Date(room.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {room.description && (
            <p className="text-emerald-400/70 text-sm sm:text-base leading-relaxed">
              {room.description}
            </p>
          )}

          <div className="divider my-3 border-emerald-700"></div>

          {/* Owner */}
          {room.owner && (
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-emerald-300">
                <Crown className="size-4 text-amber-400" />
                Room Owner
              </h3>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring ring-amber-400 ring-offset-neutral-950 ring-offset-2 overflow-hidden">
                    {room.owner.profileImage ? (
                      <img
                        src={room.owner.profileImage}
                        alt={room.owner.name}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-emerald-800 text-emerald-200 font-bold">
                        {room.owner.name?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                  </div>
                </div>
                <span className="font-medium text-emerald-300">
                  {room.owner.name}
                </span>
              </div>
            </div>
          )}

          {/* Members */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-emerald-300">
              <Users className="size-4 text-emerald-400" />
              Members ({room.members?.length || 0})
            </h3>

            {membersToShow.length > 0 ? (
              <div className="space-y-2">
                {membersToShow.map((member: any) => (
                  <div
                    key={member._id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800 transition-colors duration-200"
                  >
                    <div className="avatar">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-800">
                        {member.user.profileImage ? (
                          <img
                            src={member.user.profileImage}
                            alt={member.user.name}
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full bg-emerald-700 text-emerald-200 font-semibold">
                            {member.user.name?.[0]?.toUpperCase() || "?"}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-emerald-300">
                        {member.user.name}
                      </p>
                      {member.isAdmin && (
                        <span className="text-xs text-amber-400 font-medium">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {remainingCount > 0 && (
                  <div className="flex items-center gap-3 p-2 opacity-80">
                    <div className="avatar placeholder">
                      <div className="w-9 h-9 rounded-full bg-neutral-800 text-sm flex items-center justify-center text-emerald-400">
                        +{remainingCount}
                      </div>
                    </div>
                    <span className="text-sm text-emerald-400/60">
                      and {remainingCount} more member
                      {remainingCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-emerald-400/60 italic">
                No members yet
              </p>
            )}
          </div>

          {/* Join Button */}
          <div className="card-actions justify-end mt-4">
            <button
              type="button"
              className={`btn bg-emerald-500 text-white btn-lg w-full hover:bg-emerald-600 transition-transform duration-200 ${
                !isJoining ? "hover:scale-[1.02]" : ""
              }`}
              onClick={handleJoin}
              disabled={isJoining}
            >
              {isJoining ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Joining...
                </>
              ) : (
                <>
                  <Users className="size-5" />
                  Join Room
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
