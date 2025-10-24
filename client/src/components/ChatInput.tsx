import React, { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-base-100 border-t border-base-300"
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1 h-10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-square">
          <Send className="size-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
