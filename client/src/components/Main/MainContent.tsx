import { useState, useEffect } from "react";
import type { StudyRoom } from "@/config/schema/StudyRoom";
import { RoomInfoPanel } from "@/components/Room/RoomInfoPanel";
import { WelcomePlaceholder } from "@/components/common/WelcomePlaceHolder";
import { PublicRoomPreview } from "../Room/PublicRoomPreview";
import { EditRoomPanel } from "../Room/EditRoomModal";
import ChatPanel from "../chat/ChatPanel";
import { MainContentHeader } from "./MainContentHeader";
import Whiteboard from "../whiteboard/Whiteboard";
import { useSocketMessages } from "@/hooks/useSocketMessages";
import ResourceHubPanel from "../resourcehub/ResourceHubPanel";

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
  const [mainContentTab, setMainContentTab] = useState<
    "chat" | "info" | "whiteboard" | "resourceHub" | "settings"
  >("chat");

  useSocketMessages();

  useEffect(() => {
    setMainContentTab("chat");
  }, [selectedRoom?._id]);

  if (!selectedRoom) {
    return (
      <div className="flex-1 flex items-center justify-center bg-neutral-950">
        <WelcomePlaceholder userName={userName} />
      </div>
    );
  }

  const isOwner = selectedRoom.owner._id === userData?._id;
  const currentUserMemberInfo = selectedRoom.members.find(
    (m) => m.user._id === userData?._id
  );
  const isAdmin = currentUserMemberInfo?.isAdmin || false;
  const canEdit = isOwner || isAdmin;

  if (sidebarTab === "findRooms") {
    return (
      <div className="flex-1 flex flex-col bg-neutral-950">
        <PublicRoomPreview room={selectedRoom} onJoinRoom={onJoinRoom} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-neutral-950 text-emerald-100">
      <MainContentHeader
        roomName={selectedRoom.name}
        roomImage={selectedRoom.roomImage}
        mainContentTab={mainContentTab}
        setMainContentTab={setMainContentTab}
        canEdit={canEdit}
      />

      <div className="flex-1 overflow-hidden">
        {mainContentTab === "chat" && <ChatPanel />}
        {mainContentTab === "info" && userData && (
          <RoomInfoPanel room={selectedRoom} userId={userData._id} />
        )}
        {mainContentTab === "whiteboard" && (
          <div className="w-full h-full">
            <Whiteboard roomId={selectedRoom._id} />
          </div>
        )}
        {mainContentTab === "resourceHub" && <ResourceHubPanel />}
        {mainContentTab === "settings" && canEdit && (
          <div className="p-6 bg-neutral-900 shadow-md rounded-xl border border-emerald-800/40">
            <EditRoomPanel room={selectedRoom} />
          </div>
        )}
      </div>
    </div>
  );
}
