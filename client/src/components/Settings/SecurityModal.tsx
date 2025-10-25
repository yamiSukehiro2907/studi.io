import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { changePassword2 } from "@/api/user";
import toast from "react-hot-toast";

export const SecurityModal = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password");
      return;
    }

    setIsLoading(true);
    const loadingToastId = toast.loading("Changing password...");

    try {
      await changePassword2(currentPassword, newPassword);
      toast.success("Password changed successfully!", { id: loadingToastId });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to change password. Please check your current password.";
      setError(errorMessage);
      toast.error(errorMessage, { id: loadingToastId });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full pl-4 pr-12 h-12 bg-gray-800 border border-emerald-500 text-gray-100 rounded-xl placeholder-gray-400 focus:border-emerald-400 focus:bg-gray-700 transition-all duration-200 outline-none";

  const btnClass =
    "btn py-3 px-6 h-auto rounded-xl shadow-sm font-semibold text-base transition-all duration-200 hover:shadow-md hover:scale-[1.02] bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600";

  return (
    <form
      onSubmit={handleOnSubmit}
      className="space-y-6 bg-gray-900 p-6 rounded-xl shadow-md"
    >
      {/* Header */}
      <div>
        <h4 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
          Security Settings
        </h4>
        <p className="text-gray-400 text-base">
          Keep your account secure with a strong password
        </p>
      </div>

      <div className="divider border-gray-700"></div>

      {error && (
        <div className="alert alert-error bg-red-800 text-red-200 border-red-600 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Current Password */}
      <div className="form-control">
        <label className="label pb-2 gap-4">
          <span className="label-text font-semibold text-base text-emerald-400">
            Current Password
          </span>
        </label>
        <div className="relative">
          <input
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Enter current password"
            className={inputClass}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-400 transition-colors"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* New Password */}
      <div className="form-control">
        <label className="label pb-2 gap-4">
          <span className="label-text font-semibold text-base text-emerald-400">
            New Password
          </span>
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            className={inputClass}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isLoading}
            required
            minLength={6}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-400 transition-colors"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <label className="label">
          <span className="label-text-alt text-gray-400">
            Must be at least 6 characters long
          </span>
        </label>
      </div>

      {/* Confirm Password */}
      <div className="form-control">
        <label className="label pb-2 gap-4">
          <span className="label-text font-semibold text-base text-emerald-400">
            Confirm New Password
          </span>
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            className={inputClass}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-400 transition-colors"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className={btnClass} disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="loading loading-spinner loading-sm mr-2"></span>{" "}
            Changing...
          </>
        ) : (
          "Change Password"
        )}
      </button>
    </form>
  );
};
