import { Routes, Route, Outlet } from "react-router-dom";
import { UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import "./index.css";

const HomePage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold">Welcome to Studi.io</h1>
    <p className="mt-2">This is the placeholder homepage.</p>
  </div>
);

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl gap-2">
            <UsersIcon className="size-6 text-primary" />
            <span className="font-mono font-bold">Studi.io</span>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <Link to="/login" className="btn btn-ghost">
            Sign In
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Sign Up
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
