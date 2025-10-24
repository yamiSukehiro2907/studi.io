import type { Message } from "@/config/schema/Message";
import type { Member, StudyRoom } from "@/config/schema/StudyRoom";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RoomState {
  rooms: StudyRoom[];
  selectedRoom: StudyRoom | null;
  messages: { [roomId: string]: Message[] };
  isLoading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  rooms: [],
  selectedRoom: null,
  messages: {},
  isLoading: false,
  error: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<StudyRoom[]>) => {
      state.rooms = action.payload;
      state.error = null;
    },

    addRoom: (state, action: PayloadAction<StudyRoom>) => {
      state.rooms.unshift(action.payload);
      state.error = null;
    },

    updateRoom: (state, action: PayloadAction<StudyRoom>) => {
      const index = state.rooms.findIndex(
        (room) => room._id === action.payload._id
      );
      if (index !== -1) {
        state.rooms[index] = action.payload;
      }
      if (state.selectedRoom?._id === action.payload._id) {
        state.selectedRoom = action.payload;
      }
      state.error = null;
    },

    deleteRoom: (state, action: PayloadAction<string>) => {
      state.rooms = state.rooms.filter((room) => room._id !== action.payload);
      if (state.selectedRoom?._id === action.payload) {
        state.selectedRoom = null;
      }
      delete state.messages[action.payload];
      state.error = null;
    },

    setSelectedRoom: (state, action: PayloadAction<StudyRoom | null>) => {
      state.selectedRoom = action.payload;
    },

    addMemberToRoom: (
      state,
      action: PayloadAction<{ roomId: string; member: Member }>
    ) => {
      const room = state.rooms.find((r) => r._id === action.payload.roomId);
      if (room) {
        room.members.push(action.payload.member);
      }
      if (state.selectedRoom?._id === action.payload.roomId) {
        state.selectedRoom.members.push(action.payload.member);
      }
    },

    removeMemberFromRoom: (
      state,
      action: PayloadAction<{ roomId: string; userId: string }>
    ) => {
      const room = state.rooms.find((r) => r._id === action.payload.roomId);
      if (room) {
        room.members = room.members.filter(
          (m) => m.user._id !== action.payload.userId
        );
      }
      if (state.selectedRoom?._id === action.payload.roomId) {
        state.selectedRoom.members = state.selectedRoom.members.filter(
          (m) => m.user._id !== action.payload.userId
        );
      }
    },
    setInitialMessages(
      state,
      action: PayloadAction<{ roomId: string; messages: Message[] }>
    ) {
      state.messages[action.payload.roomId] = action.payload.messages;
    },

    updateWhiteboardState: (
      state,
      action: PayloadAction<{ roomId: string; whiteboardState: string }>
    ) => {
      const room = state.rooms.find((r) => r._id === action.payload.roomId);
      if (room) {
        room.whiteboardState = action.payload.whiteboardState;
      }
      if (state.selectedRoom?._id === action.payload.roomId) {
        state.selectedRoom.whiteboardState = action.payload.whiteboardState;
      }
    },

    setMessages: (
      state,
      action: PayloadAction<{ roomId: string; messages: Message[] }>
    ) => {
      state.messages[action.payload.roomId] = action.payload.messages;
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      const roomId = action.payload.room;
      if (!state.messages[roomId]) {
        state.messages[roomId] = [];
      }
      state.messages[roomId].push(action.payload);
    },

    updateMessage: (
      state,
      action: PayloadAction<{
        roomId: string;
        messageId: string;
        content: string;
      }>
    ) => {
      const { roomId, messageId, content } = action.payload;
      const messages = state.messages[roomId];
      if (messages) {
        const index = messages.findIndex((m) => m._id === messageId);
        if (index !== -1) {
          messages[index].content = content;
          messages[index].updatedAt = new Date().toISOString();
        }
      }
    },

    deleteMessage: (
      state,
      action: PayloadAction<{ roomId: string; messageId: string }>
    ) => {
      const { roomId, messageId } = action.payload;
      const messages = state.messages[roomId];
      if (messages) {
        state.messages[roomId] = messages.filter((m) => m._id !== messageId);
      }
    },

    clearMessages: (state, action: PayloadAction<string>) => {
      delete state.messages[action.payload];
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearRooms: (state) => {
      state.rooms = [];
      state.selectedRoom = null;
      state.messages = {};
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  setRooms,
  addRoom,
  updateRoom,
  deleteRoom,
  setSelectedRoom,
  addMemberToRoom,
  removeMemberFromRoom,
  updateWhiteboardState,
  setMessages,
  addMessage,
  setInitialMessages,
  updateMessage,
  deleteMessage,
  clearMessages,
  setLoading,
  setError,
  clearError,
  clearRooms,
} = roomSlice.actions;

export default roomSlice.reducer;
