import type { Message } from "@/config/schema/Message";
import React from "react";
import { User } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
}) => {
  const alignment = isOwnMessage ? "chat-end" : "chat-start";
  const bubbleColor = isOwnMessage
    ? "chat-bubble-primary" // keep same for own messages
    : "bg-base-200 text-base-content"; // match background for opponent

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
      {/* Avatar (only for received messages) */}
      {!isOwnMessage && (
        <div className="chat-image avatar">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            {profileImage ? (
              <img alt={`${senderName}'s avatar`} src={profileImage} />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-neutral text-neutral-content">
                <span className="font-medium">
                  {senderName[0]?.toUpperCase() || <User className="size-4" />}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      {!isOwnMessage && (
        <div className="chat-header opacity-70 text-xs mb-0.5">
          {senderName}
          <time className="ml-2 text-[10px] opacity-50">{time}</time>
        </div>
      )}

      {/* Bubble */}
      <div
        className={`chat-bubble ${bubbleColor} break-words text-sm whitespace-pre-wrap leading-relaxed`}
      >
        {message.content}
      </div>

      {/* Footer Time (for own messages) */}
      {isOwnMessage && (
        <div className="chat-footer opacity-60 text-[10px] mt-1">{time}</div>
      )}
    </div>
  );
};

export default MessageBubble;
