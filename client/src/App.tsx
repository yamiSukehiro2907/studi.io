import {
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate,
  Link,
} from "react-router-dom";
import { User as UserIcon } from "lucide-react";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import "./index.css";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/api/user";
import { clearUserData, setUserData } from "@/redux/slices/userSlice";
import { persistor, type RootState } from "./redux/store";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { SettingsPage } from "./pages/SettingsPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import logo from "./assets/logo.png";
import TermsOfService from "./pages/TermsOfServicePage";
import PrivacyPolicy from "./pages/PrivacyPolicyPage";

const AppLayout = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col bg-base-100"
      data-theme="emerald"
    >
      <header className="navbar bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 backdrop-blur-md shadow-md sticky top-0 z-50 px-4 lg:px-8 border-b border-emerald-200/20">
        <div className="flex-1">
          <Link
            to={userData ? "/" : "/welcome"}
            className="flex items-center gap-2"
          >
            <img
              src={logo}
              alt="Studi.io Logo"
              className="object-contain"
              style={{ width: "160px", height: "auto" }}
            />
          </Link>
        </div>
        <div className="flex-none">
          {userData ? (
            <div
              className="w-10 h-10 rounded-full ring ring-emerald-400 ring-offset-base-100 ring-offset-2 cursor-pointer hover:ring-offset-4 transition-all duration-300"
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
                  <UserIcon className="size-5 text-base-content/70" />
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="btn btn-ghost btn-sm sm:btn-md normal-case font-semibold hover:text-emerald-600 transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="btn bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 btn-sm sm:btn-md normal-case font-semibold text-white shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      if (userData) {
        try {
          const fetchedUser = await fetchCurrentUser();
          dispatch(setUserData(fetchedUser));
        } catch (error) {
          dispatch(clearUserData());
          await persistor.purge();
          localStorage.clear();
          navigate("/login");
        }
      }
      setIsLoading(false);
    };
    validateSession();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-emerald-500"></span>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<LoggedOutRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>

      <Route path="/welcome" element={<AppLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      <Route
        path="*"
        element={<Navigate to={userData ? "/" : "/welcome"} replace />}
      />
    </Routes>
  );
}

export default App;
