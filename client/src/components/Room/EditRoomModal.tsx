import React, { useState } from "react";
import { Camera, Upload, Trash2, Lock, Unlock, Save } from "lucide-react";
import toast from "react-hot-toast";
import type { StudyRoom } from "@/config/schema/StudyRoom";
import { deleteRoomDB, updateRoomInfo } from "@/api/room";
import { updateRoom, deleteRoom } from "@/redux/slices/roomSlice";
import { useDispatch } from "react-redux";
import { ConfirmModal } from "@/components/common/ConfirmModal";

interface EditRoomPanelProps {
  room: StudyRoom;
}

export const EditRoomPanel: React.FC<EditRoomPanelProps> = ({ room }) => {
  const [name, setName] = useState(room.name);
  const [description, setDescription] = useState(room.description || "");
  const [isPrivate, setIsPrivate] = useState(room.isPrivate || false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isConfirmSaveOpen, setIsConfirmSaveOpen] = useState(false);

  const dispatch = useDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const saveRoomChanges = async () => {
    const loadingToastId = toast.loading("Saving changes...");
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("isPrivate", String(isPrivate));
      if (imageFile) formData.append("roomImage", imageFile);

      const response = await updateRoomInfo(formData, room._id);
      dispatch(updateRoom(response));
      toast.success("Room updated successfully!", { id: loadingToastId });
    } catch (error) {
      console.error("Failed to update room:", error);
      toast.error("Failed to update room", { id: loadingToastId });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRoomHandler = async () => {
    const loadingToastId = toast.loading("Deleting room...");
    setIsDeleting(true);
    try {
      await deleteRoomDB(room._id);
      dispatch(deleteRoom(room._id));
      toast.success("Room deleted successfully!", { id: loadingToastId });
    } catch (error) {
      console.error("Failed to delete room:", error);
      toast.error("Failed to delete room", { id: loadingToastId });
    } finally {
      setIsDeleting(false);
    }
  };

  const displayImage = imagePreview || room.roomImage;

  return (
    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg p-6 max-w-3xl mx-auto overflow-hidden">
      {/* Emerald glow accent (soft, not too bright) */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 blur-3xl -translate-y-1/2 translate-x-1/3 rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="relative flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          Room Settings
          <span className="text-emerald-400">⚙️</span>
        </h2>
      </div>

      {/* Image Section */}
      <div className="space-y-3 mb-8">
        <label className="block text-sm font-semibold text-slate-300">
          Room Image
        </label>
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center shadow-inner">
            {displayImage ? (
              <img
                src={displayImage}
                alt="Room"
                className="object-cover w-full h-full"
              />
            ) : (
              <Camera className="w-10 h-10 text-emerald-400" />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="room-image-upload"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg transition-all duration-200 cursor-pointer shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40"
            >
              <Upload className="w-4 h-4" />
              {displayImage ? "Change Image" : "Upload Image"}
            </label>
            <input
              id="room-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={isSaving || isDeleting}
            />
            <p className="text-xs text-slate-500">
              JPG, PNG, or WebP • Max 2MB
            </p>
          </div>
        </div>
      </div>

      {/* Name Input */}
      <div className="space-y-2 mb-6">
        <label className="block text-sm font-semibold text-slate-300">
          Room Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 focus:border-emerald-500 focus:bg-slate-700 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Enter room name"
          maxLength={50}
          disabled={isSaving || isDeleting}
        />
        <p className="text-xs text-slate-500 text-right">{name.length}/50</p>
      </div>

      {/* Description */}
      <div className="space-y-2 mb-6">
        <label className="block text-sm font-semibold text-slate-300">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 focus:border-emerald-500 focus:bg-slate-700 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-200 resize-none"
          placeholder="Add a short description..."
          maxLength={200}
          rows={3}
          disabled={isSaving || isDeleting}
        />
        <p className="text-xs text-slate-500 text-right">
          {description.length}/200
        </p>
      </div>

      {/* Privacy */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Room Privacy
        </label>
        <div
          onClick={() => !isSaving && setIsPrivate((prev) => !prev)}
          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
            isPrivate
              ? "bg-emerald-500/10 border-emerald-500"
              : "bg-slate-700/50 border-slate-600 hover:border-emerald-400"
          }`}
        >
          <div className="flex items-center gap-3">
            {isPrivate ? (
              <Lock className="text-emerald-400 w-5 h-5" />
            ) : (
              <Unlock className="text-slate-400 w-5 h-5" />
            )}
            <div>
              <p className="text-sm font-semibold text-white">
                {isPrivate ? "Private Room" : "Public Room"}
              </p>
              <p className="text-xs text-slate-400">
                {isPrivate
                  ? "Only invited members can join"
                  : "Anyone can join with the room link"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setIsConfirmDeleteOpen(true)}
          disabled={isSaving || isDeleting}
          className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md shadow-red-500/20 hover:shadow-red-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Trash2 className="w-5 h-5" />
          Delete Room
        </button>

        <button
          type="button"
          onClick={() => setIsConfirmSaveOpen(true)}
          disabled={isSaving || !name.trim() || isDeleting}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Confirm Modals */}
      <ConfirmModal
        isOpen={isConfirmDeleteOpen}
        heading="Delete Room?"
        description="This action cannot be undone. Are you sure you want to delete this room?"
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={() => {
          setIsConfirmDeleteOpen(false);
          deleteRoomHandler();
        }}
        onCancel={() => setIsConfirmDeleteOpen(false)}
        isProcessing={isDeleting}
      />

      <ConfirmModal
        isOpen={isConfirmSaveOpen}
        heading="Save Changes?"
        description="Do you want to save the changes made to this room?"
        confirmText="Yes, Save"
        cancelText="Cancel"
        onConfirm={() => {
          setIsConfirmSaveOpen(false);
          saveRoomChanges();
        }}
        onCancel={() => setIsConfirmSaveOpen(false)}
        isProcessing={isSaving}
      />
    </div>
  );
};
