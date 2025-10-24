import React, { useState, useEffect } from "react";
import {
  Info,
  MessageSquare,
  Settings,
  BookOpen,
  LayoutGrid,
} from "lucide-react";
import type { StudyRoom } from "@/config/schema/StudyRoom";
import { RoomInfoPanel } from "@/components/Room/RoomInfoPanel";
import { WelcomePlaceholder } from "@/components/common/WelcomePlaceHolder";
import { PublicRoomPreview } from "../Room/PublicRoomPreview";
import { EditRoomPanel } from "../Room/EditRoomModal"; // reuse component but render inline
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
  const [mainContentTab, setMainContentTab] = useState<
    "chat" | "info" | "whiteboard" | "resourceHub" | "settings"
  >("chat");

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

  const isOwner = selectedRoom.owner._id === userData?._id;
  const currentUserMemberInfo = selectedRoom.members.find(
    (m) => m.user._id === userData?._id
  );
  const isAdmin = currentUserMemberInfo?.isAdmin || false;
  const canEdit = isOwner || isAdmin;

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
        roomImage={selectedRoom.roomImage}
        mainContentTab={mainContentTab}
        setMainContentTab={setMainContentTab}
        canEdit={canEdit}
      />

      <div className="flex-1 overflow-y-auto">
        {mainContentTab === "chat" && <ChatPanel />}
        {mainContentTab === "info" && userData && (
          <RoomInfoPanel room={selectedRoom} userId={userData._id} />
        )}
        {mainContentTab === "whiteboard" && (
          <Placeholder
            icon={<LayoutGrid className="mx-auto size-10 text-primary mb-3" />}
            title="Whiteboard Space"
            description="Collaborative workspace area will appear here soon."
          />
        )}
        {mainContentTab === "resourceHub" && (
          <Placeholder
            icon={<BookOpen className="mx-auto size-10 text-primary mb-3" />}
            title="Resource Hub"
            description="All uploaded study materials and shared links will show up here."
          />
        )}
        {mainContentTab === "settings" && canEdit && (
          <div className="p-6">
            {/* Render edit room panel inline (not as modal) */}
            <EditRoomPanel room={selectedRoom} />
          </div>
        )}
      </div>
    </div>
  );
}

function MainContentHeader({
  roomName,
  roomImage,
  mainContentTab,
  setMainContentTab,
  canEdit,
}: {
  roomName: string;
  roomImage?: string;
  mainContentTab: "chat" | "info" | "whiteboard" | "resourceHub" | "settings";
  setMainContentTab: (
    tab: "chat" | "info" | "whiteboard" | "resourceHub" | "settings"
  ) => void;
  canEdit: boolean;
}) {
  const tabs = [
    { key: "chat", label: "Chat", icon: <MessageSquare className="size-4" /> },
    {
      key: "whiteboard",
      label: "Whiteboard",
      icon: <LayoutGrid className="size-4" />,
    },
    {
      key: "resourceHub",
      label: "Resources",
      icon: <BookOpen className="size-4" />,
    },
    { key: "info", label: "Info", icon: <Info className="size-4" /> },
  ];

  if (canEdit) {
    tabs.push({
      key: "settings",
      label: "Settings",
      icon: <Settings className="size-4" />,
    });
  }

  return (
    <div className="px-6 py-4 bg-base-100 border-b border-base-300 flex justify-between items-center flex-shrink-0 min-h-[72px]">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="avatar">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-base-300 ring-1 ring-base-300">
            {roomImage ? (
              <img
                src={roomImage}
                alt={roomName}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-primary/20 text-primary-content text-sm font-semibold">
                {roomName.substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>
        </div>
        <h2 className="font-bold text-xl truncate text-base-content">
          {roomName}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-1 p-1 bg-base-200 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                mainContentTab === tab.key
                  ? "bg-primary text-primary-content shadow-sm"
                  : "text-base-content/70 hover:text-base-content hover:bg-base-300"
              }`}
              onClick={() =>
                setMainContentTab(
                  tab.key as
                    | "chat"
                    | "info"
                    | "whiteboard"
                    | "resourceHub"
                    | "settings"
                )
              }
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Placeholder({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 text-base-content/70 flex items-center justify-center h-full">
      <div className="text-center">
        {icon}
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
