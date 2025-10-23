// SettingsPage.tsx
import { logOut } from "@/api/auth";
import { AccountModal } from "@/components/AccountModal";
import { AppearanceModal } from "@/components/AppearanceModal";
import { NotificationsModal } from "@/components/NotificationsModal";
import { PrivacyModal } from "@/components/PrivacyModal";
import { SecurityModal } from "@/components/SecurityModal";
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
    <>
      <div className="modal modal-open">
        <div className="modal-box max-w-6xl h-[85vh] flex flex-col p-0">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-base-300 bg-base-200/50">
            <h3 className="font-bold text-2xl">Settings</h3>
            <button
              className="btn btn-sm btn-circle btn-ghost hover:bg-base-300"
              onClick={() => navigate("/")}
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-72 flex-shrink-0 border-r border-base-300 bg-base-100 p-6">
              <nav className="space-y-2">
                <button
                  className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all group ${
                    activeTab === "account"
                      ? "bg-primary text-primary-content shadow-lg"
                      : "hover:bg-base-200"
                  }`}
                  onClick={() => setActiveTab("account")}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activeTab === "account"
                        ? "bg-primary-content/20"
                        : "bg-primary/10"
                    }`}
                  >
                    <User
                      className={`size-5 ${
                        activeTab === "account"
                          ? "text-primary-content"
                          : "text-primary"
                      }`}
                    />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold">Account</div>
                    <div
                      className={`text-sm ${
                        activeTab === "account"
                          ? "text-primary-content/70"
                          : "text-base-content/60"
                      }`}
                    >
                      Profile & details
                    </div>
                  </div>
                </button>

                <button
                  className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all group ${
                    activeTab === "security"
                      ? "bg-primary text-primary-content shadow-lg"
                      : "hover:bg-base-200"
                  }`}
                  onClick={() => setActiveTab("security")}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activeTab === "security"
                        ? "bg-primary-content/20"
                        : "bg-success/10"
                    }`}
                  >
                    <Lock
                      className={`size-5 ${
                        activeTab === "security"
                          ? "text-primary-content"
                          : "text-success"
                      }`}
                    />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold">Security</div>
                    <div
                      className={`text-sm ${
                        activeTab === "security"
                          ? "text-primary-content/70"
                          : "text-base-content/60"
                      }`}
                    >
                      Password & auth
                    </div>
                  </div>
                </button>

                <button
                  className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all group ${
                    activeTab === "notifications"
                      ? "bg-primary text-primary-content shadow-lg"
                      : "hover:bg-base-200"
                  }`}
                  onClick={() => setActiveTab("notifications")}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activeTab === "notifications"
                        ? "bg-primary-content/20"
                        : "bg-warning/10"
                    }`}
                  >
                    <Bell
                      className={`size-5 ${
                        activeTab === "notifications"
                          ? "text-primary-content"
                          : "text-warning"
                      }`}
                    />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold">Notifications</div>
                    <div
                      className={`text-sm ${
                        activeTab === "notifications"
                          ? "text-primary-content/70"
                          : "text-base-content/60"
                      }`}
                    >
                      Alert preferences
                    </div>
                  </div>
                </button>

                <button
                  className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all group ${
                    activeTab === "privacy"
                      ? "bg-primary text-primary-content shadow-lg"
                      : "hover:bg-base-200"
                  }`}
                  onClick={() => setActiveTab("privacy")}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activeTab === "privacy"
                        ? "bg-primary-content/20"
                        : "bg-info/10"
                    }`}
                  >
                    <Shield
                      className={`size-5 ${
                        activeTab === "privacy"
                          ? "text-primary-content"
                          : "text-info"
                      }`}
                    />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold">Privacy</div>
                    <div
                      className={`text-sm ${
                        activeTab === "privacy"
                          ? "text-primary-content/70"
                          : "text-base-content/60"
                      }`}
                    >
                      Visibility & data
                    </div>
                  </div>
                </button>

                <button
                  className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all group ${
                    activeTab === "appearance"
                      ? "bg-primary text-primary-content shadow-lg"
                      : "hover:bg-base-200"
                  }`}
                  onClick={() => setActiveTab("appearance")}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activeTab === "appearance"
                        ? "bg-primary-content/20"
                        : "bg-secondary/10"
                    }`}
                  >
                    <Palette
                      className={`size-5 ${
                        activeTab === "appearance"
                          ? "text-primary-content"
                          : "text-secondary"
                      }`}
                    />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold">Appearance</div>
                    <div
                      className={`text-sm ${
                        activeTab === "appearance"
                          ? "text-primary-content/70"
                          : "text-base-content/60"
                      }`}
                    >
                      Theme & language
                    </div>
                  </div>
                </button>

                <div className="divider my-4"></div>

                <button
                  className="flex items-center gap-4 w-full p-4 rounded-xl hover:bg-error/10 transition-all group"
                  onClick={handleLogoutClick}
                >
                  <div className="p-2 bg-error/10 rounded-lg">
                    <LogOut className="size-5 text-error" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-error">Logout</div>
                    <div className="text-sm text-error/70">Sign out now</div>
                  </div>
                </button>
              </nav>
            </div>

            {/* Content Area - Renders selected modal */}
            <div className="flex-1 overflow-y-auto bg-base-50">
              <div className="p-8 max-w-3xl">{renderContent()}</div>
            </div>
          </div>
        </div>
        <div
          className="modal-backdrop bg-black/50"
          onClick={() => navigate("/")}
        ></div>
      </div>
    </>
  );
};
