import type { Message } from "@/config/schema/Message";
import type { Resource } from "@/config/schema/Resource";
import type { Section } from "@/config/schema/Section";
import type { StudyRoom } from "@/config/schema/StudyRoom";
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

    setMessages: (
      state,
      action: PayloadAction<{ roomId: string; messages: Message[] }>
    ) => {
      const { roomId, messages } = action.payload;

      const room = state.rooms.find((r) => r._id === roomId);
      if (room) {
        room.messages = messages;
      }

      if (state.selectedRoom?._id === roomId) {
        state.selectedRoom.messages = messages;
      }
    },

    addMessage: (
      state,
      action: PayloadAction<{ message: Message; currentUserId?: string }>
    ) => {
      const { message, currentUserId } = action.payload;
      const roomId = message.room;

      const updateRoomMessages = (room: StudyRoom) => {
        if (!room.messages) {
          room.messages = [];
        }

        if (currentUserId && currentUserId === message.sender._id) {
          const tempIndex = room.messages.findIndex(
            (m) =>
              m._id?.startsWith("temp-") &&
              m.sender._id === message.sender._id &&
              m.content === message.content
          );

          if (tempIndex !== -1) {
            room.messages[tempIndex] = message;
            return;
          }
        }

        const existingIndex = room.messages.findIndex(
          (m) => m._id === message._id
        );
        if (existingIndex === -1) {
          room.messages.push(message);
        }
      };

      const room = state.rooms.find((r) => r._id === roomId);
      if (room) {
        updateRoomMessages(room);
      }

      if (state.selectedRoom?._id === roomId) {
        updateRoomMessages(state.selectedRoom);
      }
    },

    updateMessage: (
      state,
      action: PayloadAction<{ roomId: string; message: Message }>
    ) => {
      const { roomId, message } = action.payload;

      const updateRoomMessage = (room: StudyRoom) => {
        if (!room.messages) return;

        const messageIndex = room.messages.findIndex(
          (m) => m._id === message._id
        );
        if (messageIndex !== -1) {
          room.messages[messageIndex] = message;
        }
      };

      const room = state.rooms.find((r) => r._id === roomId);
      if (room) {
        updateRoomMessage(room);
      }

      if (state.selectedRoom?._id === roomId) {
        updateRoomMessage(state.selectedRoom);
      }
    },

    deleteMessage: (
      state,
      action: PayloadAction<{ roomId: string; messageId: string }>
    ) => {
      const { roomId, messageId } = action.payload;

      const deleteRoomMessage = (room: StudyRoom) => {
        if (!room.messages) return;
        room.messages = room.messages.filter((m) => m._id !== messageId);
      };

      const room = state.rooms.find((r) => r._id === roomId);
      if (room) {
        deleteRoomMessage(room);
      }

      if (state.selectedRoom?._id === roomId) {
        deleteRoomMessage(state.selectedRoom);
      }
    },

    addSection: (
      state,
      action: PayloadAction<{ roomId: string; section: Section }>
    ) => {
      const { roomId, section } = action.payload;

      const room = state.rooms.find((r) => r._id === roomId);
      if (room) {
        if (!room.resourceHub) {
          room.resourceHub = [];
        }
        room.resourceHub.push(section);
      }

      if (state.selectedRoom?._id === roomId) {
        if (!state.selectedRoom.resourceHub) {
          state.selectedRoom.resourceHub = [];
        }
        state.selectedRoom.resourceHub.push(section);
      }

      state.error = null;
    },

    updateSection: (
      state,
      action: PayloadAction<{ roomId: string; section: Section }>
    ) => {
      const { roomId, section } = action.payload;

      const room = state.rooms.find((r) => r._id === roomId);
      if (room && room.resourceHub) {
        const sectionIndex = room.resourceHub.findIndex(
          (s) => s._id === section._id
        );
        if (sectionIndex !== -1) {
          room.resourceHub[sectionIndex] = section;
        }
      }

      if (
        state.selectedRoom?._id === roomId &&
        state.selectedRoom.resourceHub
      ) {
        const sectionIndex = state.selectedRoom.resourceHub.findIndex(
          (s) => s._id === section._id
        );
        if (sectionIndex !== -1) {
          state.selectedRoom.resourceHub[sectionIndex] = section;
        }
      }

      state.error = null;
    },

    deleteSection: (
      state,
      action: PayloadAction<{ roomId: string; sectionId: string }>
    ) => {
      const { roomId, sectionId } = action.payload;

      const room = state.rooms.find((r) => r._id === roomId);
      if (room && room.resourceHub) {
        room.resourceHub = room.resourceHub.filter((s) => s._id !== sectionId);
      }

      if (
        state.selectedRoom?._id === roomId &&
        state.selectedRoom.resourceHub
      ) {
        state.selectedRoom.resourceHub = state.selectedRoom.resourceHub.filter(
          (s) => s._id !== sectionId
        );
      }

      state.error = null;
    },

    addResource: (
      state,
      action: PayloadAction<{
        roomId: string;
        sectionId: string;
        resource: Resource;
      }>
    ) => {
      const { roomId, sectionId, resource } = action.payload;

      const room = state.rooms.find((r) => r._id === roomId);
      if (room && room.resourceHub) {
        const section = room.resourceHub.find((s) => s._id === sectionId);
        if (section) {
          if (!Array.isArray(section.resources)) {
            section.resources = [];
          }
          section.resources.push(resource);
        }
      }

      if (
        state.selectedRoom?._id === roomId &&
        state.selectedRoom.resourceHub
      ) {
        const section = state.selectedRoom.resourceHub.find(
          (s) => s._id === sectionId
        );
        if (section) {
          if (!Array.isArray(section.resources)) {
            section.resources = [];
          }
          section.resources.push(resource);
        }
      }

      state.error = null;
    },

    updateResource: (
      state,
      action: PayloadAction<{
        roomId: string;
        sectionId: string;
        resource: Resource;
      }>
    ) => {
      const { roomId, sectionId, resource } = action.payload;

      const room = state.rooms.find((r) => r._id === roomId);
      if (room && room.resourceHub) {
        const section = room.resourceHub.find((s) => s._id === sectionId);
        if (section && Array.isArray(section.resources)) {
          const resourceIndex = section.resources.findIndex(
            (r) => r._id === resource._id
          );
          if (resourceIndex !== -1) {
            section.resources[resourceIndex] = resource;
          }
        }
      }

      if (
        state.selectedRoom?._id === roomId &&
        state.selectedRoom.resourceHub
      ) {
        const section = state.selectedRoom.resourceHub.find(
          (s) => s._id === sectionId
        );
        if (section && Array.isArray(section.resources)) {
          const resourceIndex = section.resources.findIndex(
            (r) => r._id === resource._id
          );
          if (resourceIndex !== -1) {
            section.resources[resourceIndex] = resource;
          }
        }
      }

      state.error = null;
    },

    deleteResource: (
      state,
      action: PayloadAction<{
        roomId: string;
        sectionId: string;
        resourceId: string;
      }>
    ) => {
      const { roomId, sectionId, resourceId } = action.payload;

      const room = state.rooms.find((r) => r._id === roomId);
      if (room && room.resourceHub) {
        const section = room.resourceHub.find((s) => s._id === sectionId);
        if (section && Array.isArray(section.resources)) {
          section.resources = section.resources.filter(
            (r) => r._id !== resourceId
          );
        }
      }

      if (
        state.selectedRoom?._id === roomId &&
        state.selectedRoom.resourceHub
      ) {
        const section = state.selectedRoom.resourceHub.find(
          (s) => s._id === sectionId
        );
        if (section && Array.isArray(section.resources)) {
          section.resources = section.resources.filter(
            (r) => r._id !== resourceId
          );
        }
      }

      state.error = null;
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
  },
});

export const {
  setRooms,
  addRoom,
  updateRoom,
  deleteRoom,
  setSelectedRoom,
  setMessages,
  addMessage,
  updateMessage,
  deleteMessage,
  addSection,
  updateSection,
  deleteSection,
  addResource,
  updateResource,
  deleteResource,
  setLoading,
  setError,
  clearError,
} = roomSlice.actions;

export default roomSlice.reducer;
