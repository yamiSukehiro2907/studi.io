import React, { useState, useEffect, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import type { StudyRoom } from "@/config/schema/StudyRoom";
import { getPublicRooms } from "@/api/room";
import toast from "react-hot-toast";
import { RoomListItem } from "@/components/Room/RoomListItem";
import { RoomList } from "./RoomList";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarTabs } from "./SidebarTabs";
import { SearchBar } from "./Searchbar";

interface SidebarProps {
  rooms: StudyRoom[];
  selectedRoom: StudyRoom | null;
  sidebarTab: "myRooms" | "findRooms";
  setSidebarTab: (tab: "myRooms" | "findRooms") => void;
  onRoomSelect: (room: StudyRoom) => void;
  onCreateRoom: () => void;
  isLoadingMyRooms: boolean;
}

export function Sidebar({
  rooms,
  selectedRoom,
  sidebarTab,
  setSidebarTab,
  onRoomSelect,
  onCreateRoom,
  isLoadingMyRooms,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<StudyRoom[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (sidebarTab !== "findRooms" || !searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const handler = setTimeout(async () => {
      try {
        const results = await getPublicRooms(searchQuery.trim());
        const userRoomIds = new Set(rooms.map((r) => r._id));
        const filteredResults = results.filter((r) => !userRoomIds.has(r._id));
        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Failed to search rooms:", error);
        toast.error("Failed to search rooms.");
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, sidebarTab, rooms]);

  const filteredMyRooms = useMemo(
    () =>
      rooms.filter((room) =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [rooms, searchQuery]
  );

  const listToDisplay =
    sidebarTab === "myRooms" ? filteredMyRooms : searchResults;
  const isLoadingList =
    sidebarTab === "myRooms" ? isLoadingMyRooms : isSearching;

  return (
    <div className="w-full md:w-[350px] lg:w-[400px] flex flex-col bg-base-100 flex-shrink-0 border-r border-base-300">
      <SidebarHeader onCreateRoom={onCreateRoom} />

      <SidebarTabs sidebarTab={sidebarTab} setSidebarTab={setSidebarTab} />

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sidebarTab={sidebarTab}
      />

      <RoomList
        isLoading={isLoadingList}
        rooms={listToDisplay}
        selectedRoom={selectedRoom}
        onRoomSelect={onRoomSelect}
        sidebarTab={sidebarTab}
        searchQuery={searchQuery}
        setSidebarTab={setSidebarTab}
        onCreateRoom={onCreateRoom}
      />
    </div>
  );
}
