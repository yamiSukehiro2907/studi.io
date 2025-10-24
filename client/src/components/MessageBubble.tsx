import type { Message } from "@/config/schema/Message";
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
  const senderName = isOwnMessage ? "You" : message.sender.name;
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`chat ${alignment}`}>
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
