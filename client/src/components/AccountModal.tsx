import { useState } from "react";
import { Camera } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { updateUser } from "@/api/user";
import { setUserData } from "@/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AccountModal = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="max-w-5xl mx-auto p-8 space-y-10">
      {/* Header Section */}
      <div className="space-y-3">
        <h4 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Account Settings
        </h4>
      </div>

      {/* Profile Image Section */}
      <div className="card bg-base-200/50 shadow-md hover:shadow-lg transition-all duration-300 border border-base-300">
        <div className="card-body p-8">
          <h5 className="card-title text-xl mb-6 font-semibold">
            Profile Picture
          </h5>
          <div className="flex items-center gap-8">
            <div className="avatar">
              <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-3 shadow-xl hover:shadow-2xl transition-all duration-300">
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt="Profile"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Camera className="size-12 text-primary" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="profile-upload"
                className="btn btn-primary gap-2 shadow-md hover:shadow-lg transition-all duration-300"
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
              <p className="text-sm text-base-content/60">
                JPG, PNG, GIF or WebP • Max 2MB
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-7">
        {/* Full Name */}
        <div className="form-control">
          <label className="label pb-2 gap-4">
            <span className="label-text font-semibold text-base">
              Full Name
            </span>
            <input
              type="text"
              placeholder="Enter your full name"
              className="input input-bordered input-lg focus:input-primary transition-all duration-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label pb-2 gap-4">
            <span className="label-text font-semibold text-base">Username</span>
            <input
              type="text"
              placeholder="Enter username"
              className="input input-bordered input-lg focus:input-primary transition-all duration-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </label>
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label pb-2">
            <span className="label-text font-semibold text-base">
              Email Address
            </span>
          </label>
          <div className="flex items-center gap-[10px]">
            <input
              type="email"
              placeholder="Enter email"
              className="input input-bordered input-lg focus:input-primary transition-all duration-200 flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            {userData?.isVerified && (
              <span className="badge badge-success badge-md gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified
              </span>
            )}
          </div>
          {!userData?.isVerified && (
            <div className="flex items-center justify-between mt-2">
              <label className="label pt-0">
                <span className="label-text-alt text-warning flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Email not verified yet
                </span>
              </label>
              <button
                type="button"
                className="btn btn-sm btn-warning"
                onClick={() => {
                  navigate("/verify-email");
                }}
              >
                Verify Email
              </button>
            </div>
          )}
        </div>

        <div className="form-control">
          <label className="label pb-2 gap-4">
            <span className="label-text font-semibold text-base">Bio</span>
          </label>
          <div className="mt-2">
            <textarea
              placeholder="Tell us about yourself..."
              className="textarea textarea-bordered textarea-lg focus:textarea-primary h-10 resize-none transition-all duration-200 leading-relaxed"
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
          className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
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
