// src/components/ChatPanel.tsx
import React, { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { Message } from "@/config/schema/Message";
import api from "@/config/axiosConfig";
import { socket } from "@/config/socket";

interface ChatPanelProps {
  roomId: string | null;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useSelector((state: RootState) => state.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roomId) {
      setMessages([]);
      return;
    }

    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/messages/${roomId}`);
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [roomId]);
  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {};

    socket.on("newMessage", handleNewMessage);

    // Cleanup listener on component unmount or when roomId changes
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [roomId]); // Re-subscribe if roomId changes

  // --- 3. Scroll to Bottom when new messages arrive ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- 4. Function to Send Messages ---
  const handleSendMessage = (content: string) => {
    if (!roomId || !content) return;

    // Emit the message via socket
    socket.emit("sendMessage", {
      roomId: roomId,
      content: content,
      // Sender info is attached on the backend using socket.user
    });
  };

  if (!roomId) {
    // Optionally return a placeholder if no room is selected
    return (
      <div className="flex-1 flex items-center justify-center">
        Select a room to start chatting.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Optional Header for the Chat Panel */}
      <div className="p-4 border-b border-base-300 h-[69px] flex items-center">
        <h2 className="font-semibold">Chat</h2>{" "}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading && <p className="text-center">Loading messages...</p>}
        {!isLoading && messages.length === 0 && (
          <p className="text-center text-base-content/60">
            No messages yet. Start the conversation!
          </p>
        )}
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isOwnMessage={msg.sender._id === userData?._id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPanel;
