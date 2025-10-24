import  { useState } from "react";
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
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="card bg-base-100 shadow-xl max-w-2xl w-full">
        <div className="card-body">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="card-title text-2xl mb-2">{room.name}</h2>
              <div className="flex items-center gap-2">
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

          {room.description && (
            <p className="text-base-content/70 mb-6">{room.description}</p>
          )}

          <div className="divider my-2"></div>

          {/* Owner Section */}
          {room.owner && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Crown className="size-4 text-warning" />
                Room Owner
              </h3>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring ring-warning ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        room.owner.profileImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          room.owner.name
                        )}`
                      }
                      alt={room.owner.name}
                    />
                  </div>
                </div>
                <span className="font-medium">{room.owner.name}</span>
              </div>
            </div>
          )}

          {/* Members Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Users className="size-4 text-primary" />
              Members ({room.members?.length || 0})
            </h3>

            {membersToShow.length > 0 ? (
              <div className="space-y-2">
                {membersToShow.map((member: any) => (
                  <div
                    key={member._id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200/50 transition-colors"
                  >
                    <div className="avatar">
                      <div className="w-9 h-9 rounded-full">
                        <img
                          src={
                            member.user.profileImage ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              member.user.name
                            )}`
                          }
                          alt={member.user.name}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {member.user.name}
                      </p>
                      {member.isAdmin && (
                        <span className="text-xs text-warning">Admin</span>
                      )}
                    </div>
                  </div>
                ))}

                {remainingCount > 0 && (
                  <div className="flex items-center gap-3 p-2">
                    <div className="avatar placeholder">
                      <div className="w-9 h-9 rounded-full bg-base-300">
                        <span className="text-xs">+{remainingCount}</span>
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
              <p className="text-sm text-base-content/60">No members yet</p>
            )}
          </div>

          <div className="card-actions justify-end">
            <button
              type="button"
              className="btn btn-primary btn-lg w-full"
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
