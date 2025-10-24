import type { StudyRoom } from "@/config/schema/StudyRoom";
import { EmptyState } from "./EmptyState";
import { RoomListItem } from "../Room/RoomListItem";

export function RoomList({
  isLoading,
  rooms,
  selectedRoom,
  onRoomSelect,
  sidebarTab,
  searchQuery,
  setSidebarTab,
  onCreateRoom,
}: {
  isLoading: boolean;
  rooms: StudyRoom[];
  selectedRoom: StudyRoom | null;
  onRoomSelect: (room: StudyRoom) => void;
  sidebarTab: "myRooms" | "findRooms";
  searchQuery: string;
  setSidebarTab: (tab: "myRooms" | "findRooms") => void;
  onCreateRoom: () => void;
}) {
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <EmptyState
          searchQuery={searchQuery}
          sidebarTab={sidebarTab}
          setSidebarTab={setSidebarTab}
          onCreateRoom={onCreateRoom}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {rooms.map((room) => (
        <RoomListItem
          key={room._id}
          room={room}
          isSelected={selectedRoom?._id === room._id}
          onClick={() => onRoomSelect(room)}
        />
      ))}
    </div>
  );
}