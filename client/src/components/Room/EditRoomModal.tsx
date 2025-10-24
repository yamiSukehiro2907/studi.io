import React, { useState } from "react";
import { Camera, Upload, Trash2, Lock, Unlock } from "lucide-react";
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

  // handle image
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

  // save changes
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

  // delete room
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
    <div className="max-w-3xl mx-auto bg-base-100 rounded-2xl shadow-sm border border-base-300 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-base-300">
        <h2 className="text-2xl font-bold text-base-content">Room Settings</h2>
      </div>

      {/* Form */}
      <div className="p-6 space-y-8">
        {/* Image */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-base-content/80">
            Room Image
          </label>
          <div className="flex items-center gap-6">
            <div className="avatar">
              <div className="w-24 h-24 rounded-lg ring ring-primary ring-offset-base-100 ring-offset-2 shadow-md overflow-hidden">
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt="Room"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Camera className="size-10 text-primary" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="room-image-upload"
                className="btn btn-primary btn-sm gap-2"
              >
                <Upload className="size-4" />
                {displayImage ? "Change Image" : "Upload Image"}
              </label>
              <input
                id="room-image-upload"
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageChange}
                className="hidden"
                disabled={isSaving || isDeleting}
              />
              <p className="text-xs text-base-content/60">
                JPG, PNG, GIF or WebP • Max 2MB
              </p>
            </div>
          </div>
        </div>

        <div className="divider my-4"></div>

        {/* Room Name */}
        <div className="space-y-2">
          <label htmlFor="room-name" className="block text-sm font-medium">
            Room Name <span className="text-error">*</span>
          </label>
          <input
            id="room-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full input input-bordered input-md"
            placeholder="Enter room name"
            required
            disabled={isSaving || isDeleting}
            maxLength={50}
          />
          <div className="text-xs text-base-content/60 text-right">
            {name.length}/50
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label
            htmlFor="room-description"
            className="block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="room-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full resize-none"
            placeholder="Add a short description (max 50 chars)"
            disabled={isSaving || isDeleting}
            maxLength={50}
            rows={3}
          />
          <div className="text-xs text-base-content/60 text-right">
            {description.length}/50
          </div>
        </div>

        {/* Privacy */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Room Privacy</label>
          <div
            onClick={() => !isSaving && setIsPrivate((prev) => !prev)}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border ${
              isPrivate
                ? "bg-primary/10 border-primary"
                : "bg-base-200 border-base-300 hover:bg-base-300"
            }`}
          >
            <div className="flex items-center gap-3">
              {isPrivate ? (
                <Lock className="text-primary size-5" />
              ) : (
                <Unlock className="text-base-content/70 size-5" />
              )}
              <div>
                <span className="text-sm font-medium block">
                  {isPrivate ? "Private Room" : "Public Room"}
                </span>
                <span className="text-xs text-base-content/60 block mt-0.5">
                  {isPrivate
                    ? "Only invited members can join"
                    : "Anyone can join with the room link"}
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isPrivate}
              readOnly
              className="toggle toggle-primary toggle-sm"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex gap-3 px-6 py-5 border-t border-base-300 bg-base-100 rounded-b-2xl">
        <button
          type="button"
          className="btn btn-error flex-1 gap-2"
          onClick={() => setIsConfirmDeleteOpen(true)}
          disabled={isSaving || isDeleting}
        >
          <Trash2 className="size-4" />
          Delete Room
        </button>

        <button
          type="button"
          className="btn btn-primary flex-1"
          onClick={() => setIsConfirmSaveOpen(true)}
          disabled={isSaving || !name.trim() || isDeleting}
        >
          Save Changes
        </button>
      </div>

      {/* Confirm Delete Modal */}
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

      {/* Confirm Save Modal */}
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
