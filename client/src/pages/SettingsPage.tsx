import { logOut } from "@/api/auth";
import { AccountModal } from "@/components/Settings/AccountModal";
import { AppearanceModal } from "@/components/Settings/AppearanceModal";
import { NotificationsModal } from "@/components/Settings/NotificationsModal";
import { PrivacyModal } from "@/components/Settings/PrivacyModal";
import { SecurityModal } from "@/components/Settings/SecurityModal";
import { clearUserData } from "@/redux/slices/userSlice";
import { persistor } from "@/redux/store";
import { X, User, Lock, Bell, Shield, Palette, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<string>("account");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutClick = async () => {
    const loadingToastId = toast.loading("Logging out...");

    try {
      await logOut();
      dispatch(clearUserData());
      await persistor.purge();
      localStorage.clear();
      toast.success("Logged out successfully!", { id: loadingToastId });
      navigate("/welcome", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.", { id: loadingToastId });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountModal />;
      case "security":
        return <SecurityModal />;
      case "notifications":
        return <NotificationsModal />;
      case "privacy":
        return <PrivacyModal />;
      case "appearance":
        return <AppearanceModal />;
      default:
        return <AccountModal />;
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-6xl h-[85vh] flex flex-col p-0 bg-gray-900 rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-gray-800/50">
          <h3 className="font-bold text-2xl text-white">Settings</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost hover:bg-gray-700"
            onClick={() => navigate("/")}
          >
            <X className="size-5 text-white" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-72 flex-shrink-0 border-r border-gray-700 bg-gray-900 p-6">
            <nav className="space-y-2">
              {[
                {
                  key: "account",
                  icon: User,
                  label: "Account",
                  desc: "Profile & details",
                  color: "emerald",
                },
                {
                  key: "security",
                  icon: Lock,
                  label: "Security",
                  desc: "Password & auth",
                  color: "green",
                },
                {
                  key: "notifications",
                  icon: Bell,
                  label: "Notifications",
                  desc: "Alert preferences",
                  color: "yellow",
                },
                {
                  key: "privacy",
                  icon: Shield,
                  label: "Privacy",
                  desc: "Visibility & data",
                  color: "cyan",
                },
                {
                  key: "appearance",
                  icon: Palette,
                  label: "Appearance",
                  desc: "Theme & language",
                  color: "teal",
                },
              ].map(({ key, icon: Icon, label, desc, color }) => (
                <button
                  key={key}
                  className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all group ${
                    activeTab === key
                      ? `bg-emerald-600 text-white shadow-lg`
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activeTab === key ? "bg-white/20" : `bg-${color}-500/10`
                    }`}
                  >
                    <Icon
                      className={`size-5 ${
                        activeTab === key ? "text-white" : `text-${color}-400`
                      }`}
                    />
                  </div>
                  <div className="text-left flex-1">
                    <div
                      className={`font-semibold ${
                        activeTab === key ? "text-white" : "text-gray-200"
                      }`}
                    >
                      {label}
                    </div>
                    <div
                      className={`text-sm ${
                        activeTab === key ? "text-white/70" : "text-gray-400"
                      }`}
                    >
                      {desc}
                    </div>
                  </div>
                </button>
              ))}

              <div className="divider my-4 border-gray-700"></div>

              <button
                className="flex items-center gap-4 w-full p-4 rounded-xl hover:bg-red-800/10 transition-all group"
                onClick={handleLogoutClick}
              >
                <div className="p-2 bg-red-800/10 rounded-lg">
                  <LogOut className="size-5 text-red-500" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-red-500">Logout</div>
                  <div className="text-sm text-red-400/70">Sign out now</div>
                </div>
              </button>
            </nav>
          </div>

          {/* Content Area - Renders selected modal */}
          <div className="flex-1 overflow-y-auto bg-gray-900">
            <div className="p-8 max-w-3xl">{renderContent()}</div>
          </div>
        </div>
      </div>

      <div
        className="modal-backdrop bg-black/50"
        onClick={() => navigate("/")}
      ></div>
    </div>
  );
};
