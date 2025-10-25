import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { socket } from "@/config/socket";
import { useDispatch } from "react-redux";
import { addMessage } from "@/redux/slices/roomSlice";
import type { Message } from "@/config/schema/Message";

const ChatInput: React.FC<any> = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const selectedRoom = useSelector(
    (state: RootState) => state.room.selectedRoom
  );

  const dispatch = useDispatch();

  const isDisabled = !selectedRoom;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";

    const newHeight = Math.min(textarea.scrollHeight, 60);
    textarea.style.height = `${newHeight}px`;
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || !selectedRoom) return;

    let newMessage: Message = {
      _id: `temp-${Date.now()}`,
      content: trimmedMessage,
      room: selectedRoom._id,
      sender: {
        _id: userData?._id,
        username: userData?.username,
        name: userData?.name,
        profileImage: userData?.profileImage,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addMessage({ message: newMessage }));

    socket.emit("sendMessage", {
      content: trimmedMessage,
      roomId: selectedRoom._id,
    });

    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 bg-neutral-950">
      <div className="flex items-center">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            placeholder={
              isDisabled
                ? "Select a room to start chatting..."
                : "Type a message..."
            }
            className={`w-full resize-none min-h-[36px] max-h-[60px] rounded-full
              bg-neutral-900 text-white placeholder:text-neutral-500
              leading-snug outline-none
              ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}`}
            style={{
              paddingLeft: "15px", // slight right shift for placeholder/content
              paddingRight: "38px", // space for send button inside
              paddingTop: "14px", // equal vertical padding
              paddingBottom: "6px",
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
          />

          {/* Send button inside input box */}
          <button
            type="submit"
            className={`absolute right-4 top-1/2 transform -translate-y-1/2
              btn btn-sm btn-circle bg-emerald-500 text-white border-none
              hover:bg-emerald-600 transition-transform duration-200
              ${
                !message.trim() || isDisabled
                  ? "opacity-60 pointer-events-none"
                  : "hover:scale-105"
              }`}
            disabled={!message.trim() || isDisabled}
            title="Send message"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
