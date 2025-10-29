import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/redux/slices/roomSlice";
import { socket } from "@/config/socket";
import type { RootState } from "@/redux/store";
import type { Message } from "@/config/schema/Message";
import toast from "react-hot-toast";

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
      toast.error(error.message);
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

    if (newRoomId !== currentRoomIdRef.current) {
      if (currentRoomIdRef.current) {
        socket.emit("leave-room", currentRoomIdRef.current);
      }

      if (newRoomId) {
        socket.emit("join-room", newRoomId);
        currentRoomIdRef.current = newRoomId;
      } else {
        currentRoomIdRef.current = null;
      }
    }
  }, [selectedRoom?._id]);

  useEffect(() => {
    return () => {
      if (currentRoomIdRef.current) {
        socket.emit("leave-room", currentRoomIdRef.current);
        currentRoomIdRef.current = null;
      }
    };
  }, []);
};
