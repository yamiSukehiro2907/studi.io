import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/redux/slices/roomSlice";
import { socket } from "@/config/socket";
import type { RootState } from "@/redux/store";

export const useSocketMessages = () => {
  const dispatch = useDispatch();
  const selectedRoom = useSelector(
    (state: RootState) => state.room.selectedRoom
  );

  useEffect(() => {
    const handleNewMessage = (message: any) => {
      dispatch(addMessage(message));
    };

    const handleMessageError = (error: { message: string }) => {
      console.error("Message error:", error.message);
    };

    const handleUserJoined = (data: any) => {
      console.log(`${data.userName} joined the room`);
    };

    const handleUserLeft = (data: any) => {
      console.log(`${data.userName} left the room`);
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("messageError", handleMessageError);
    socket.on("user-joined", handleUserJoined);
    socket.on("user-left", handleUserLeft);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messageError", handleMessageError);
      socket.off("user-joined", handleUserJoined);
      socket.off("user-left", handleUserLeft);
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedRoom) {
      console.log(`Joining room: ${selectedRoom._id}`);
      socket.emit("join-room", selectedRoom._id);

      return () => {
        console.log(`Leaving room: ${selectedRoom._id}`);
        socket.emit("leave-room", selectedRoom._id);
      };
    }
  }, [selectedRoom]);
};

/*
import React, { useEffect, useRef } from "react";

import { useSelector } from "react-redux";

import ChatInput from "./ChatInput";

import type { RootState } from "@/redux/store";

import { useSocketMessages } from "@/hooks/useSocketMessages";



const ChatPanel: React.FC = () => {

  const messagesEndRef = useRef<HTMLDivElement>(null);



  useSocketMessages();



  const selectedRoom = useSelector(

    (state: RootState) => state.room.selectedRoom

  );

  const messages = useSelector((state: RootState) =>

    selectedRoom ? state.room.messages[selectedRoom._id] || [] : []

  );

  const { userData } = useSelector((state: RootState) => state.user);



  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  }, [messages]);



  const formatTime = (timestamp: string) => {

    const date = new Date(timestamp);

    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  };

  const getSenderInfo = (sender: any) => {

    if (typeof sender === "string") {

      return { _id: sender, name: "Unknown", profileImage: undefined };

    }

    return sender;

  };



  if (!selectedRoom) {

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

        <h2 className="font-semibold text-lg">{selectedRoom.name}</h2>

        <p className="text-sm text-base-content/70">

          {selectedRoom.members.length} member

          {selectedRoom.members.length !== 1 ? "s" : ""}

        </p>

      </div>





      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.length === 0 ? (

          <div className="flex items-center justify-center h-full text-base-content/50">

            <p>No messages yet. Start the conversation!</p>

          </div>

        ) : (

          messages.map((msg) => {

            const senderInfo = getSenderInfo(msg.sender);

            const isOwnMessage = senderInfo._id === userData?._id;



            return (

              <div

                key={msg._id}

                className={`flex ${

                  isOwnMessage ? "justify-end" : "justify-start"

                }`}

              >

                <div

                  className={`flex gap-2 max-w-[70%] ${

                    isOwnMessage ? "flex-row-reverse" : ""

                  }`}

                >



                  {!isOwnMessage && (

                    <div className="avatar placeholder">

                      <div className="bg-neutral text-neutral-content rounded-full w-8 h-8">

                        {senderInfo.profileImage ? (

                          <img

                            src={senderInfo.profileImage}

                            alt={senderInfo.name}

                          />

                        ) : (

                          <span className="text-xs">

                            {senderInfo.name[0]?.toUpperCase() || "?"}

                          </span>

                        )}

                      </div>

                    </div>

                  )}



  

                  <div>

                    {!isOwnMessage && (

                      <p className="text-xs text-base-content/70 mb-1 px-1">

                        {senderInfo.name}

                      </p>

                    )}

                    <div

                      className={`px-4 py-2 rounded-lg ${

                        isOwnMessage

                          ? "bg-primary text-primary-content"

                          : "bg-base-200"

                      }`}

                    >

                      <p className="break-words">{msg.content}</p>

                    </div>

                    <p

                      className={`text-xs text-base-content/50 mt-1 px-1 ${

                        isOwnMessage ? "text-right" : ""

                      }`}

                    >

                      {formatTime(msg.createdAt)}

                    </p>

                  </div>

                </div>

              </div>

            );

          })

        )}

        <div ref={messagesEndRef} />

      </div>




      <ChatInput />

    </div>

  );

};



export default ChatPanel;



The messages are being not loaded correctly

use MessageBublle

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






 */
