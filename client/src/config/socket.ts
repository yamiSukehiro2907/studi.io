import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:8000/";

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});
