import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/redux/slices/roomSlice";
import { socket } from "@/config/socket";
import type { RootState } from "@/redux/store";

export const useSocketMessages = () => {
  const dispatch = useDispatch();
  const selectedRoom = useSelector(
    (state: RootState) => state.room.selectedRoom
  );

  useEffect(() => {
    const handleNewMessage = (message: any) => {
      dispatch(addMessage(message));
    };

    const handleMessageError = (error: { message: string }) => {
      console.error("Message error:", error.message);
    };

    const handleUserJoined = () => {
      
    };

    const handleUserLeft = () => {
      
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("messageError", handleMessageError);
    socket.on("user-joined", handleUserJoined);
    socket.on("user-left", handleUserLeft);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messageError", handleMessageError);
      socket.off("user-joined", handleUserJoined);
      socket.off("user-left", handleUserLeft);
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedRoom) {
      socket.emit("join-room", selectedRoom._id);

      return () => {
        socket.emit("leave-room", selectedRoom._id);
      };
    }
  }, [selectedRoom]);
};
