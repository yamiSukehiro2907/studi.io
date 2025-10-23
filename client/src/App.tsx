import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import { UsersIcon, User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import "./index.css";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { SettingsPage } from "./pages/SettingsPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

const AppLayout = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" data-theme="forest">
      <header className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 lg:px-8">
        <div className="flex-1">
          <Link
            to={userData ? "/" : "/welcome"}
            className="btn btn-ghost text-xl gap-2 hover:bg-transparent"
          >
            <UsersIcon className="size-6 text-primary" />
            <span className="font-mono font-bold">Studi.io</span>
          </Link>
        </div>
        <div className="flex-none">
          {userData ? (
            <div
              className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 cursor-pointer hover:ring-offset-4 transition-all"
              onClick={() => navigate("/settings")}
            >
              {userData.profileImage ? (
                <img
                  alt="User Avatar"
                  src={userData.profileImage}
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-base-200 rounded-full">
                  <UserIcon className="size-5 text-base-content" />
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="btn btn-ghost btn-sm sm:btn-md normal-case font-semibold"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary btn-sm sm:btn-md normal-case font-semibold shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

const ProtectedRoute = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  return userData ? <AppLayout /> : <Navigate to="/welcome" replace />;
};

const LoggedOutRoute = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  return !userData ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  const { userData } = useSelector((state: RootState) => state.user);

  return (
    <Routes>
      {/* Public routes for logged-out users - no navbar */}
      <Route element={<LoggedOutRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>

      {/* Landing page - accessible to everyone*/}
      <Route path="/welcome" element={<AppLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      {/* Protected routes with AppLayout (includes navbar) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Catch-all redirect */}
      <Route
        path="*"
        element={<Navigate to={userData ? "/" : "/welcome"} replace />}
      />
    </Routes>
  );
}

export default App;
