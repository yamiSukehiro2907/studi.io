import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { socket } from "@/config/socket";

interface ChatInputProps {
  onSendMessage?: (content: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const selectedRoom = useSelector(
    (state: RootState) => state.room.selectedRoom
  );

  const isDisabled = !selectedRoom;

  // Auto-resize textarea height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    if (onSendMessage) {
      onSendMessage(trimmedMessage);
    } else if (selectedRoom) {
      socket.emit("sendMessage", {
        content: trimmedMessage,
        roomId: selectedRoom._id,
      });
    } else {
      console.warn("Cannot send message: No room selected.");
    }

    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-base-100 border-t border-base-300"
    >
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            placeholder={
              isDisabled
                ? "Select a room to start chatting..."
                : "Type a message..."
            }
            className={`pt-2 pl-2 textarea textarea-bordered w-full resize-none min-h-[42px] max-h-[120px] rounded-xl pr-12 leading-relaxed ${
              isDisabled ? "opacity-60 cursor-not-allowed" : ""
            }`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
          />

          {/* Send button (inside input) */}
          <button
            type="submit"
            className={`absolute right-2 bottom-2 btn btn-sm btn-circle btn-primary transition-transform duration-200 ${
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
