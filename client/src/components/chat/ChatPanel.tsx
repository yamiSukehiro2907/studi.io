import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MessageBubble from "./MessageBubble";
import type { RootState } from "@/redux/store";
import { useSocketMessages } from "@/hooks/useSocketMessages";
import { getMessagesOfRoom } from "@/api/message";
import type { Message } from "@/config/schema/Message";
import { setInitialMessages } from "@/redux/slices/roomSlice";
import ChatInput from "./ChatInput";
import bg from "../../assets/bg.jpg";

const ChatPanel: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useSocketMessages();

  const selectedRoom = useSelector(
    (state: RootState) => state.room.selectedRoom
  );
  const messages: Message[] = useSelector((state: RootState) =>
    selectedRoom ? state.room.messages[selectedRoom._id] || [] : []
  );
  const { userData } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (selectedRoom) {
      const fetchInitialMessages = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const fetchedMessages = await getMessagesOfRoom(selectedRoom._id);
          dispatch(
            setInitialMessages({
              roomId: selectedRoom._id,
              messages: fetchedMessages,
            })
          );
        } catch (err) {
          console.error("Failed to fetch initial messages:", err);
          setError("Failed to load messages.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchInitialMessages();
    }
  }, [selectedRoom, dispatch]);

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  if (!selectedRoom && !isLoading) {
    return (
      <div
        className="flex flex-col h-full text-emerald-400"
        style={{
          backgroundImage:
            "url('https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundColor: "#111827",
        }}
      >
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg mb-2 text-emerald-500">No room selected</p>
            <p className="text-sm text-emerald-400/70">
              Select a room to start chatting
            </p>
          </div>
        </div>
        <ChatInput />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-full text-emerald-400"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundPosition: "center",
        backgroundColor: "#111827",
      }}
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <span className="loading loading-spinner text-emerald-500"></span>
          </div>
        )}
        {!isLoading && error && (
          <div className="flex items-center justify-center h-full text-emerald-600">
            <p>{error}</p>
          </div>
        )}
        {!isLoading && !error && messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-emerald-400/50">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
        {!isLoading &&
          !error &&
          messages.length > 0 &&
          messages.map((msg) => {
            const isOwnMessage = msg.sender._id === userData?._id;
            const messageKey =
              msg._id || `temp-${msg.createdAt}-${msg.sender._id}`;

            return (
              <MessageBubble
                key={messageKey}
                message={msg}
                isOwnMessage={isOwnMessage}
              />
            );
          })}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatPanel;
