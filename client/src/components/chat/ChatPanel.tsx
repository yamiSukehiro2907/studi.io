import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MessageBubble from "./MessageBubble";
import type { RootState } from "@/redux/store";
import { getMessagesOfRoom } from "@/api/message";
import { setMessages } from "@/redux/slices/roomSlice";
import ChatInput from "./ChatInput";
import type { Message } from "@/config/schema/Message";

const EMPTY_MESSAGES: Message[] = [];

const ChatPanel: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [isFetchingInitial, setIsFetchingInitial] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedRoom = useSelector(
    (state: RootState) => state.room.selectedRoom
  );

  const messages: Message[] = useSelector(
    () => selectedRoom?.messages || EMPTY_MESSAGES
  );

  const { userData } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (selectedRoom) {
      const hasMessages =
        selectedRoom.messages && selectedRoom.messages.length > 0;

      if (!hasMessages) {
        setIsFetchingInitial(true);
      }

      const fetchMessages = async () => {
        setError(null);
        try {
          const fetchedMessages = await getMessagesOfRoom(selectedRoom._id);
          dispatch(
            setMessages({
              roomId: selectedRoom._id,
              messages: fetchedMessages,
            })
          );
        } catch {
          setError("Failed to load messages.");
        } finally {
          setIsFetchingInitial(false);
        }
      };

      fetchMessages();
    }
  }, [selectedRoom, dispatch]);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  if (!selectedRoom && !isFetchingInitial) {
    return (
      <div className="flex flex-col h-full text-emerald-400 bg-gray-900">
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
    <div className="flex flex-col h-full text-emerald-400 bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {isFetchingInitial && messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <span className="loading loading-spinner text-emerald-500"></span>
          </div>
        )}
        {!isFetchingInitial && error && messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-emerald-600">
            <p>{error}</p>
          </div>
        )}
        {!isFetchingInitial && !error && messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-emerald-400/50">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
        {messages.length > 0 &&
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
