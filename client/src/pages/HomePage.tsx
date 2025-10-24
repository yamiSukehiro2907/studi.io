import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import ChatPanel from "../components/ChatPanel";
import { socket } from "@/config/socket";
import { RoomListItem } from "@/components/RoomListItem";
import { CreateRoomModal } from "@/components/CreateRoomModal";
import { WelcomePlaceholder } from "@/components/WelcomePlaceHolder";
import { getUserRooms } from "@/api/room";
import { setRooms, setSelectedRoom } from "@/redux/slices/roomSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.user);
  const { rooms, selectedRoom } = useSelector((state: RootState) => state.room);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);

  useEffect(() => {
    const fetchUserRooms = async () => {
      try {
        setIsLoadingRooms(true);
        const response = await getUserRooms();
        dispatch(setRooms(response));
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setIsLoadingRooms(false);
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
    if (selectedRoom?._id) {
      socket.emit("join-room", selectedRoom._id);
      console.log(`Emitted join-room for ${selectedRoom._id}`);
    }
  }, [selectedRoom]);

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userName = userData ? userData.name.split(" ")[0] : "Student";

  const handleRoomSelect = (room: any) => {
    dispatch(setSelectedRoom(room));
  };

  return (
    <div className="flex h-[calc(100vh-64px)] border-t border-base-300">
      <div className="w-full md:w-[350px] lg:w-[400px] flex flex-col bg-base-100 flex-shrink-0 border-r border-base-300">
        <div className="p-4 flex justify-between items-center border-b border-base-300 h-[69px]">
          <h2 className="text-xl font-bold">Study Rooms</h2>
          <button
            className="btn btn-primary btn-sm btn-circle"
            title="Create New Room"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="size-5" />
          </button>
        </div>

        <div className="p-4 border-b border-base-300">
          <input
            type="text"
            placeholder="Search rooms..."
            className="input input-bordered w-full h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoadingRooms ? (
            <div className="flex items-center justify-center p-6">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <RoomListItem
                key={room._id}
                room={room}
                isSelected={selectedRoom?._id === room._id}
                onClick={() => handleRoomSelect(room)}
              />
            ))
          ) : (
            <div className="text-center p-6 text-base-content/60">
              {searchQuery ? (
                <p>No rooms found matching "{searchQuery}"</p>
              ) : (
                <>
                  <p>No study rooms found.</p>
                  <button
                    className="btn btn-primary btn-sm mt-4"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Create one
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-base-200/50">
        {selectedRoom ? (
          <ChatPanel roomId={selectedRoom._id} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <WelcomePlaceholder userName={userName} />
          </div>
        )}
      </div>

      <CreateRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
