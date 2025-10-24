import { useState } from "react";
import { X, Users, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createStudyRoom } from "@/api/room";
import { addRoom } from "@/redux/slices/roomSlice";

export const CreateRoomModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch();
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!roomName.trim()) {
      setError("Room name is required");
      return;
    }

    if (roomName.trim().length < 3) {
      setError("Room name must be at least 3 characters");
      return;
    }

    setIsLoading(true);

    const loadingToastId = toast.loading("Creating study room...");

    try {
      const response = await createStudyRoom(roomName, description);
      dispatch(addRoom(response));
      toast.success("Study room created successfully!", { id: loadingToastId });

      setRoomName("");
      setDescription("");
      onClose();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to create room. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, { id: loadingToastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setRoomName("");
      setDescription("");
      setError("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700/50 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="relative">
          <div className="flex items-start justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-xl">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  Create Study Room
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Start collaborating with your study group
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="px-6 pb-6">
            <div className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-red-300">{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">
                  Room Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Physics Study Group"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleCreateRoom(e as any);
                    }
                  }}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-slate-700/50 border-2 border-slate-600 focus:border-emerald-500 focus:bg-slate-700 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  maxLength={50}
                  required
                />
                <p className="text-xs text-slate-500">
                  {roomName.length}/50 characters
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">
                  Description <span className="text-slate-500">(Optional)</span>
                </label>
                <textarea
                  placeholder="What will you study in this room?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-slate-700/50 border-2 border-slate-600 focus:border-emerald-500 focus:bg-slate-700 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  rows={3}
                  maxLength={200}
                />
                <p className="text-xs text-slate-500">
                  {description.length}/200 characters
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateRoom}
                  disabled={isLoading || !roomName.trim()}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Users className="w-5 h-5" />
                      Create Room
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
