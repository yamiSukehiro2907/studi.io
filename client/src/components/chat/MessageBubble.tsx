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

  const bubbleStyle = isOwnMessage
    ? "bg-emerald-500 text-white px-4 py-2 max-w-xs break-words rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-md"
    : "bg-emerald-200 text-emerald-900 px-4 py-2 max-w-xs break-words rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-md";

  const senderName = isOwnMessage
    ? "You"
    : message.sender?.name || message.sender?.username || "Unknown";

  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const profileImage = message.sender?.profileImage;

  return (
    <div className={`chat ${alignment} mb-1`}>
      {/* Avatar for others */}
      {!isOwnMessage && (
        <div className="chat-image avatar">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-300 border border-neutral-300">
            {profileImage ? (
              <img alt={`${senderName}'s avatar`} src={profileImage} />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-neutral-700 font-medium">
                {senderName[0]?.toUpperCase() || <User className="size-4" />}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header for others */}
      {!isOwnMessage && (
        <div className="chat-header opacity-70 text-xs mb-1 text-neutral-600">
          {senderName}
          <time className="ml-2 text-[10px] opacity-50">{time}</time>
        </div>
      )}

      {/* Bubble */}
      <div className={bubbleStyle}>{message.content}</div>

      {/* Footer for own messages */}
      {isOwnMessage && (
        <div className="chat-footer opacity-60 text-[10px] mt-1 text-emerald-400">
          {time}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
