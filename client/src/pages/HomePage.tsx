import { useState, useEffect } from "react";
import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "@/config/socket";
import { getUserRooms, joinPublicRoom } from "@/api/room";
import { setRooms, setSelectedRoom, addRoom } from "@/redux/slices/roomSlice";
import toast from "react-hot-toast";
import type { StudyRoom } from "@/config/schema/StudyRoom";
import { CreateRoomModal } from "@/components/Room/CreateRoomModal";
import { Sidebar } from "@/components/SideBar/Sidebar";
import { MainContent } from "@/components/Main/MainContent";

export default function HomePage() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.user);
  const { rooms, selectedRoom } = useSelector((state: RootState) => state.room);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<"myRooms" | "findRooms">(
    "myRooms"
  );
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
    }

    return () => {
      if (previousRoomId) {
        socket.emit("leave-room", previousRoomId);
      }
    };
  }, [selectedRoom]);

  const handleRoomSelect = (room: StudyRoom) => {
    dispatch(setSelectedRoom(room));
  };

  const handleJoinRoom = async (room: StudyRoom) => {
    const loadingToastId = toast.loading("Joining room...");
    try {
      const joinedRoomData = await joinPublicRoom(room._id);

      dispatch(addRoom(joinedRoomData));
      dispatch(setSelectedRoom(joinedRoomData));
      setSidebarTab("myRooms");
      toast.success("Successfully joined room!", { id: loadingToastId });
    } catch (error: any) {
      console.error("Failed to join room:", error);
      toast.error(error.response?.data?.message || "Failed to join room.", {
        id: loadingToastId,
      });
    }
  };

  const userName = userData ? userData.name.split(" ")[0] : "Student";

  return (
    <div className="flex h-[calc(100vh-64px)] border-t border-base-300">
      <Sidebar
        rooms={rooms}
        selectedRoom={selectedRoom}
        sidebarTab={sidebarTab}
        setSidebarTab={setSidebarTab}
        onRoomSelect={handleRoomSelect}
        onCreateRoom={() => setIsCreateModalOpen(true)}
        isLoadingMyRooms={isLoadingMyRooms}
      />

      <MainContent
        selectedRoom={selectedRoom}
        userName={userName}
        userData={userData}
        sidebarTab={sidebarTab}
        onJoinRoom={handleJoinRoom}
      />

      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
