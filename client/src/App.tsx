import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { UsersIcon, LogOut, User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import "./index.css";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

const AppLayout = () => {
  const { userData } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {};

  return (
    <div className="min-h-screen flex flex-col" data-theme="forest">
      <header className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
        <div className="flex-1">
          <Link
            to={userData ? "/" : "/welcome"}
            className="btn btn-ghost text-xl gap-2"
          >
            <UsersIcon className="size-6 text-primary" />
            <span className="font-mono font-bold">Studi.io</span>
          </Link>
        </div>
        <div className="flex-none gap-2">
          {userData ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {userData.profileImage ? (
                    <img alt="User Avatar" src={userData.profileImage} />
                  ) : (
                    <span className="flex items-center justify-center h-full">
                      <UserIcon className="size-6" />
                    </span>
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
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
      <Route element={<LoggedOutRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      <Route path="/welcome" element={<AppLayout />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route
        path="*"
        element={<Navigate to={userData ? "/" : "/welcome"} replace />}
      />
    </Routes>
  );
}

export default App;
