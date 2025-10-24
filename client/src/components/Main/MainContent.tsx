import React, { useState, useEffect } from "react";
import { Info, MessageSquare, Settings } from "lucide-react";
import type { StudyRoom } from "@/config/schema/StudyRoom";
import { RoomInfoPanel } from "@/components/Room/RoomInfoPanel";
import { WelcomePlaceholder } from "@/components/common/WelcomePlaceHolder";
import { PublicRoomPreview } from "../Room/PublicRoomPreview";
import { EditRoomModal } from "../Room/EditRoomModal";
import ChatPanel from "../chat/ChatPanel";

interface MainContentProps {
  selectedRoom: StudyRoom | null;
  userName: string;
  userData: any;
  sidebarTab: "myRooms" | "findRooms";
  onJoinRoom: (room: StudyRoom) => Promise<void>;
}

export function MainContent({
  selectedRoom,
  userName,
  userData,
  sidebarTab,
  onJoinRoom,
}: MainContentProps) {
  const [mainContentTab, setMainContentTab] = useState<"chat" | "info">("chat");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    setMainContentTab("chat");
  }, [selectedRoom?._id]);

  if (!selectedRoom) {
    return (
      <div className="flex-1 flex items-center justify-center bg-base-200/30">
        <WelcomePlaceholder userName={userName} />
      </div>
    );
  }

  // Determine if current user can edit the selected room
  const isOwner = selectedRoom.owner._id === userData?._id;
  const currentUserMemberInfo = selectedRoom.members.find(
    (m) => m.user._id === userData?._id
  );
  const isAdmin = currentUserMemberInfo?.isAdmin || false;
  const canEdit = isOwner || isAdmin;

  const openEditModal = () => {
    if (canEdit) {
      setIsEditModalOpen(true);
    }
  };

  if (sidebarTab === "findRooms") {
    return (
      <div className="flex-1 flex flex-col bg-base-200/30">
        <PublicRoomPreview room={selectedRoom} onJoinRoom={onJoinRoom} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-base-200/30">
      <MainContentHeader
        roomName={selectedRoom.name}
        mainContentTab={mainContentTab}
        setMainContentTab={setMainContentTab}
        canEdit={canEdit}
        onEditClick={openEditModal}
      />

      <div className="flex-1 overflow-y-auto">
        {mainContentTab === "chat" && <ChatPanel />}
        {mainContentTab === "info" && userData && (
          <RoomInfoPanel room={selectedRoom} userId={userData._id} />
        )}
      </div>

      <EditRoomModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        room={selectedRoom}
      />
    </div>
  );
}

function MainContentHeader({
  roomName,
  mainContentTab,
  setMainContentTab,
  canEdit,
  onEditClick,
}: {
  roomName: string;
  mainContentTab: "chat" | "info";
  setMainContentTab: (tab: "chat" | "info") => void;
  canEdit: boolean;
  onEditClick: () => void;
}) {
  return (
    <div className="px-6 py-4 bg-base-100 border-b border-base-300 flex justify-between items-center flex-shrink-0 min-h-[72px]">
      <h2 className="font-bold text-xl truncate flex-1 mr-6">{roomName}</h2>

      <div className="flex items-center gap-3">
        {/* Tab Switcher */}
        <div className="inline-flex items-center gap-1 p-1 bg-base-200 rounded-lg">
          <button
            type="button"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              mainContentTab === "chat"
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content/70 hover:text-base-content hover:bg-base-300"
            }`}
            onClick={() => setMainContentTab("chat")}
          >
            <MessageSquare className="size-4" />
            <span>Chat</span>
          </button>

          <button
            type="button"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              mainContentTab === "info"
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content/70 hover:text-base-content hover:bg-base-300"
            }`}
            onClick={() => setMainContentTab("info")}
          >
            <Info className="size-4" />
            <span>Info</span>
          </button>
        </div>

        {/* Settings Button */}
        {canEdit && (
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-square hover:bg-base-200"
            title="Edit Room Settings"
            onClick={onEditClick}
          >
            <Settings className="size-5" />
          </button>
        )}
      </div>
    </div>
  );
}
