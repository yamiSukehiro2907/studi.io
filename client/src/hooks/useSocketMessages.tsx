import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/redux/slices/roomSlice";
import { socket } from "@/config/socket";
import type { RootState } from "@/redux/store";
import type { Message } from "@/config/schema/Message";

export const useSocketMessages = () => {
  const dispatch = useDispatch();
  const currentRoomIdRef = useRef<string | null>(null);

  const { userData } = useSelector((state: RootState) => state.user);
  const selectedRoom = useSelector(
    (state: RootState) => state.room.selectedRoom
  );

  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      dispatch(
        addMessage({
          message,
          currentUserId: userData?._id,
        })
      );
    };

    const handleMessageError = (error: { message: string }) => {
      console.error("Message error:", error.message);
    };

    const handleUserJoined = () => {};

    const handleUserLeft = () => {};

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
  }, [dispatch, userData?._id]);

  useEffect(() => {
    const newRoomId = selectedRoom?._id;

    if (newRoomId && newRoomId !== currentRoomIdRef.current) {
      if (currentRoomIdRef.current) {
        console.log("Leaving previous room:", currentRoomIdRef.current);
        socket.emit("leave-room", currentRoomIdRef.current);
      }

      console.log("Joining new room:", newRoomId);
      socket.emit("join-room", newRoomId);
      currentRoomIdRef.current = newRoomId;
    }
  }, [selectedRoom?._id]);

  useEffect(() => {
    return () => {
      if (currentRoomIdRef.current) {
        console.log(
          "Component unmounting: Leaving room:",
          currentRoomIdRef.current
        );
        socket.emit("leave-room", currentRoomIdRef.current);
      }
    };
  }, []);
};
