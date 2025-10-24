import type { Member, StudyRoom } from "@/config/schema/StudyRoom";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RoomState {
  rooms: StudyRoom[];
  selectedRoom: StudyRoom | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  rooms: [],
  selectedRoom: null,
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
          (m) => m.user !== action.payload.userId
        );
      }
      if (state.selectedRoom?._id === action.payload.roomId) {
        state.selectedRoom.members = state.selectedRoom.members.filter(
          (m) => m.user !== action.payload.userId
        );
      }
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
  setLoading,
  setError,
  clearError,
  clearRooms,
} = roomSlice.actions;

export default roomSlice.reducer;
