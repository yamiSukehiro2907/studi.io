import type { Message } from "@/config/schema/Message";
import { User } from "lucide-react"; // Import User icon for placeholder
import React from "react";

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
}) => {
  const alignment = isOwnMessage ? "chat-end" : "chat-start";
  const bubbleColor = isOwnMessage ? "chat-bubble-primary" : "chat-bubble";
  const senderName = isOwnMessage
    ? "You"
    : message.sender?.name || message.sender?.username || "Unknown";
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const profileImage = message.sender?.profileImage;

  return (
    <div className={`chat ${alignment}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          {!isOwnMessage && profileImage ? (
            <img alt={`${senderName}'s avatar`} src={profileImage} />
          ) : !isOwnMessage ? (
            <div className="flex items-center justify-center h-full w-full bg-neutral text-neutral-content">
              <span className="text-xl">
                {senderName?.[0]?.toUpperCase() || <User size={18} />}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="chat-header text-xs opacity-50 mb-1">
        {senderName}
        <time className="ml-2">{time}</time>
      </div>
      <div className={`chat-bubble ${bubbleColor} break-words`}>
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;
