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
      <div className="card bg-base-100 shadow-xl max-w-2xl w-full border border-base-300 hover:shadow-2xl transition-all duration-300 rounded-2xl">
        <div className="card-body space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="card-title text-2xl font-bold mb-1">
                {room.name}
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                {room.isPrivate ? (
                  <div className="badge badge-warning gap-1">
                    <Lock className="size-3" />
                    Private
                  </div>
                ) : (
                  <div className="badge badge-success gap-1">
                    <Globe className="size-3" />
                    Public
                  </div>
                )}
                {room.createdAt && (
                  <span className="text-xs text-base-content/60">
                    Created {new Date(room.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {room.description && (
            <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
              {room.description}
            </p>
          )}

          <div className="divider my-3"></div>

          {/* Owner */}
          {room.owner && (
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Crown className="size-4 text-warning" />
                Room Owner
              </h3>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring ring-warning ring-offset-base-100 ring-offset-2 overflow-hidden">
                    {room.owner.profileImage ? (
                      <img
                        src={room.owner.profileImage}
                        alt={room.owner.name}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-warning/60 to-error/60 text-base-content font-bold">
                        {room.owner.name?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                  </div>
                </div>
                <span className="font-medium">{room.owner.name}</span>
              </div>
            </div>
          )}

          {/* Members */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Users className="size-4 text-primary" />
              Members ({room.members?.length || 0})
            </h3>

            {membersToShow.length > 0 ? (
              <div className="space-y-2">
                {membersToShow.map((member: any) => (
                  <div
                    key={member._id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200/60 transition-colors duration-200"
                  >
                    <div className="avatar">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-base-300">
                        {member.user.profileImage ? (
                          <img
                            src={member.user.profileImage}
                            alt={member.user.name}
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-primary/40 to-secondary/40 text-base-content/80 font-semibold">
                            {member.user.name?.[0]?.toUpperCase() || "?"}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {member.user.name}
                      </p>
                      {member.isAdmin && (
                        <span className="text-xs text-warning font-medium">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {remainingCount > 0 && (
                  <div className="flex items-center gap-3 p-2 opacity-80">
                    <div className="avatar placeholder">
                      <div className="w-9 h-9 rounded-full bg-base-300 text-sm flex items-center justify-center">
                        +{remainingCount}
                      </div>
                    </div>
                    <span className="text-sm text-base-content/60">
                      and {remainingCount} more member
                      {remainingCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-base-content/60 italic">
                No members yet
              </p>
            )}
          </div>

          {/* Join Button */}
          <div className="card-actions justify-end mt-4">
            <button
              type="button"
              className={`btn btn-primary btn-lg w-full transition-transform duration-200 ${
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
