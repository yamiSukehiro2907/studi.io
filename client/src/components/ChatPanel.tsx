import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatInput from "./ChatInput";
import MessageBubble from "@/components/MessageBubble";
import type { RootState } from "@/redux/store";
import { useSocketMessages } from "@/hooks/useSocketMessages";
import { getMessagesOfRoom } from "@/api/message";
import { setInitialMessages } from "../redux/slices/roomSlice";
import type { Message } from "@/config/schema/Message";

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
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center text-base-content/50">
          <div className="text-center">
            <p className="text-lg mb-2">No room selected</p>
            <p className="text-sm">Select a room to start chatting</p>
          </div>
        </div>
        <ChatInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-base-200 border-b border-base-300">
        <h2 className="font-semibold text-lg">
          {selectedRoom?.name || "Loading..."}
        </h2>
        {selectedRoom && (
          <p className="text-sm text-base-content/70">
            {selectedRoom.members.length} member
            {selectedRoom.members.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {" "}
        {/* Reduced space-y */}
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        )}
        {!isLoading && error && (
          <div className="flex items-center justify-center h-full text-error">
            <p>{error}</p>
          </div>
        )}
        {!isLoading && !error && messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-base-content/50">
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
