import React, { useState } from "react";
import { Send } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { socket } from "@/config/socket";

interface ChatInputProps {
  onSendMessage?: (content: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const selectedRoom = useSelector(
    (state: RootState) => state.room.selectedRoom
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    if (onSendMessage) {
      onSendMessage(trimmedMessage);
      setMessage("");
      return;
    }

    if (selectedRoom) {
      socket.emit("sendMessage", {
        content: trimmedMessage,
        roomId: selectedRoom._id,
      });
      setMessage("");
    } else {
      console.warn("Cannot send message: No room selected.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        handleSubmit(e as React.FormEvent);
      }
    }
  };

  const isDisabled = !selectedRoom;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-base-100 border-t border-base-300"
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder={
            isDisabled ? "Select a room to chat" : "Type a message..."
          }
          className="input input-bordered flex-1 h-10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
        />
        <button
          type="submit"
          className="btn btn-primary btn-square"
          disabled={!message.trim() || isDisabled}
        >
          <Send className="size-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
