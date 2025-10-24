import React, { useState, useEffect, useMemo } from "react";
import { Plus, Search, Info, MessageSquare } from "lucide-react";
import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import ChatPanel from "../components/ChatPanel";
import { socket } from "@/config/socket";
import { RoomListItem } from "@/components/RoomListItem";
import { CreateRoomModal } from "@/components/CreateRoomModal";
import { WelcomePlaceholder } from "@/components/WelcomePlaceHolder";
import { getPublicRooms, getUserRooms, joinPublicRoom } from "@/api/room";
import { setRooms, setSelectedRoom, addRoom } from "@/redux/slices/roomSlice";
import toast from "react-hot-toast";
import type { StudyRoom } from "@/config/schema/StudyRoom";
import { RoomInfoPanel } from "@/components/RoomInfoPanel";

export default function HomePage() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.user);
  const { rooms, selectedRoom } = useSelector((state: RootState) => state.room);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<"myRooms" | "findRooms">(
    "myRooms"
  );
  const [mainContentTab, setMainContentTab] = useState<"chat" | "info">("chat");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<StudyRoom[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingMyRooms, setIsLoadingMyRooms] = useState(true);

  useEffect(() => {
    const fetchUserRooms = async () => {
      try {
        setIsLoadingMyRooms(true);
        const userRooms = await getUserRooms();
        dispatch(setRooms(userRooms));
      } catch (error) {
        console.error("Failed to fetch user rooms:", error);
        toast.error("Failed to load your rooms.");
      } finally {
        setIsLoadingMyRooms(false);
      }
    };
    fetchUserRooms();
  }, [dispatch]);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    let previousRoomId: string | null = null;
    if (selectedRoom?._id) {
      previousRoomId = selectedRoom._id;
      socket.emit("join-room", selectedRoom._id);
      console.log(`Emitted join-room for ${selectedRoom._id}`);
    }

    return () => {
      if (previousRoomId) {
        socket.emit("leave-room", previousRoomId);
        console.log(`Emitted leave-room for ${previousRoomId}`);
      }
    };
  }, [selectedRoom]);

  useEffect(() => {
    if (sidebarTab !== "findRooms" || !searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const handler = setTimeout(async () => {
      try {
        console.log("Searching for:", searchQuery);
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

  const userName = userData ? userData.name.split(" ")[0] : "Student";

  const handleRoomSelect = (room: StudyRoom) => {
    dispatch(setSelectedRoom(room));
    setMainContentTab("chat");
  };

  const handleJoinRoom = async (room: StudyRoom) => {
    const loadingToastId = toast.loading("Joining room...");
    try {
      const joinedRoomData = await joinPublicRoom(room._id);
      dispatch(addRoom(joinedRoomData));
      dispatch(setSelectedRoom(joinedRoomData));
      setSidebarTab("myRooms");
      setSearchQuery("");
      setSearchResults([]);
      toast.success("Successfully joined room!", { id: loadingToastId });
    } catch (error: any) {
      console.error("Failed to join room:", error);
      toast.error(error.response?.data?.message || "Failed to join room.", {
        id: loadingToastId,
      });
    }
  };

  const handleRoomClick = (room: StudyRoom) => {
    if (sidebarTab === "findRooms") {
      handleJoinRoom(room);
    } else {
      handleRoomSelect(room);
    }
  };

  const listToDisplay =
    sidebarTab === "myRooms" ? filteredMyRooms : searchResults;
  const isLoadingList =
    sidebarTab === "myRooms" ? isLoadingMyRooms : isSearching;

  return (
    <div className="flex h-[calc(100vh-64px)] border-t border-base-300">
      <div className="w-full md:w-[350px] lg:w-[400px] flex flex-col bg-base-100 flex-shrink-0 border-r border-base-300">
        <div className="p-4 flex justify-between items-center border-b border-base-300 h-[69px] flex-shrink-0">
          <h2 className="text-xl font-bold">Study Rooms</h2>
          <button
            className="btn btn-primary btn-sm btn-circle"
            title="Create New Room"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="size-5" />
          </button>
        </div>

        <div className="tabs tabs-boxed p-2 bg-base-200 flex-shrink-0">
          <button
            type="button"
            className={`tab flex-1 ${
              sidebarTab === "myRooms"
                ? "tab-active !bg-primary text-primary-content"
                : ""
            }`}
            onClick={() => setSidebarTab("myRooms")}
          >
            My Rooms
          </button>
          <button
            type="button"
            className={`tab flex-1 ${
              sidebarTab === "findRooms"
                ? "tab-active !bg-primary text-primary-content"
                : ""
            }`}
            onClick={() => setSidebarTab("findRooms")}
          >
            Find Rooms
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-base-300 flex-shrink-0 relative">
          <input
            type="text"
            placeholder={
              sidebarTab === "myRooms"
                ? "Search your rooms..."
                : "Search public rooms..."
            }
            className="input input-bordered w-full h-10 pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="size-5 absolute left-7 top-1/2 transform -translate-y-1/2 text-base-content/40 pointer-events-none" />
        </div>

        {/* Room List */}
        <div className="flex-1 overflow-y-auto">
          {isLoadingList ? (
            <div className="flex items-center justify-center p-6">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : listToDisplay.length > 0 ? (
            listToDisplay.map((room) => (
              <RoomListItem
                key={room._id}
                room={room}
                isSelected={selectedRoom?._id === room._id}
                onClick={() => handleRoomClick(room)}
              />
            ))
          ) : (
            <div className="text-center p-6 text-base-content/60">
              {searchQuery ? (
                <p>No rooms found matching "{searchQuery}"</p>
              ) : sidebarTab === "myRooms" ? (
                <>
                  <p>You haven't joined any study rooms yet.</p>
                  <button
                    type="button"
                    className="btn btn-link btn-sm mt-2 normal-case"
                    onClick={() => setSidebarTab("findRooms")}
                  >
                    Find a room to join
                  </button>
                  <span className="mx-2">or</span>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm mt-2"
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    Create one
                  </button>
                </>
              ) : (
                <p>Search for public rooms above.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-base-200/50">
        {selectedRoom ? (
          <>
            {/* Main Content Header with Tabs */}
            <div className="p-4 bg-base-200 border-b border-base-300 flex justify-between items-center flex-shrink-0">
              <h2 className="font-semibold text-lg truncate pr-4">
                {selectedRoom.name}
              </h2>
              <div className="tabs tabs-boxed tabs-sm">
                <button
                  type="button"
                  className={`tab gap-1 ${
                    mainContentTab === "chat"
                      ? "tab-active !bg-primary text-primary-content"
                      : ""
                  }`}
                  onClick={() => setMainContentTab("chat")}
                >
                  <MessageSquare className="size-4" /> Chat
                </button>
                <button
                  type="button"
                  className={`tab gap-1 ${
                    mainContentTab === "info"
                      ? "tab-active !bg-primary text-primary-content"
                      : ""
                  }`}
                  onClick={() => setMainContentTab("info")}
                >
                  <Info className="size-4" /> Info
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {mainContentTab === "chat" && <ChatPanel />}
              {mainContentTab === "info" && userData && (
                <RoomInfoPanel room={selectedRoom} userId={userData._id} />
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <WelcomePlaceholder userName={userName} />
          </div>
        )}
      </div>

      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
