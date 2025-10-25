import { useState } from "react";
import { Camera } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { updateUser } from "@/api/user";
import { setUserData } from "@/redux/slices/userSlice";
import toast from "react-hot-toast";

export const AccountModal = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [username, setUsername] = useState(userData?.username || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [name, setName] = useState(userData?.name || "");
  const [bio, setBio] = useState(userData?.bio || "");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("File size should be less than 2MB");
      toast.error(error);
      return;
    }

    setImageFile(file);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = async () => {
    const loadingToastId = toast.loading("Saving changes...");

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("name", name);
      formData.append("bio", bio);

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }
      const response = await updateUser(formData);
      dispatch(setUserData(response));

      setImagePreview(null);
      setImageFile(null);
      toast.success("Profile updated successfully!", { id: loadingToastId });
    } catch (err) {
      console.error("Failed to update user:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update profile";
      setError(errorMessage);
      toast.error(errorMessage, { id: loadingToastId });
    } finally {
      setLoading(false);
    }
  };

  const displayImage = imagePreview || userData?.profileImage;

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-10 bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="space-y-3">
        <h4 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
          Account Settings
        </h4>
      </div>

      {/* Profile Image */}
      <div className="card bg-gray-800/70 shadow-md transition-all duration-300 border border-gray-700">
        <div className="card-body p-8">
          <h5 className="card-title text-xl mb-6 font-semibold text-emerald-400">
            Profile Picture
          </h5>
          <div className="flex items-center gap-8">
            <div className="avatar">
              <div className="w-28 h-28 rounded-full ring ring-emerald-500/40 ring-offset-gray-900 ring-offset-2 shadow-md transition-all duration-300">
                {displayImage ? (
                  <img src={displayImage} alt="Profile" className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-700">
                    <Camera className="size-12 text-emerald-400" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="profile-upload"
                className="btn btn-emerald gap-2 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Camera className="size-4" />
                {displayImage ? "Change Photo" : "Upload Photo"}
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageChange}
                className="hidden"
                disabled={loading}
              />
              <p className="text-sm text-gray-400">
                JPG, PNG, GIF or WebP • Max 2MB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="space-y-7">
        <div className="form-control">
          <label className="label pb-2 gap-4">
            <span className="label-text font-semibold text-emerald-400 text-base">Full Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full pl-4 pr-12 h-12 rounded-xl bg-gray-800 border border-emerald-500 text-gray-100 shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-control">
          <label className="label pb-2 gap-4">
            <span className="label-text font-semibold text-emerald-400 text-base">Username</span>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            className="w-full pl-4 pr-12 h-12 rounded-xl bg-gray-800 border border-emerald-500 text-gray-100 shadow-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-control">
          <label className="label pb-2 gap-4">
            <span className="label-text font-semibold text-emerald-400 text-base">Email Address</span>
          </label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full pl-4 pr-12 h-12 rounded-xl bg-gray-800 border border-emerald-500 text-gray-100 shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-control">
          <label className="label pb-2 gap-4">
            <span className="label-text font-semibold text-emerald-400 text-base">Bio</span>
          </label>
          <div className="mt-4">
            <textarea
              placeholder="Tell us about yourself..."
              className="pt-2 pl-4 pr-12 textarea textarea-bordered textarea-lg h-5 resize-none rounded-xl bg-gray-800 border border-emerald-500 text-gray-100 shadow-sm"
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 50))}
              disabled={loading}
              maxLength={50}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6">
        <button
          className="btn py-3 px-6 h-auto rounded-xl shadow-sm font-semibold text-base transition-all duration-200 hover:shadow-md hover:scale-[1.02] bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600"
          onClick={handleSaveChanges}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-md" />
              Saving Changes...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
              </svg>
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
};
