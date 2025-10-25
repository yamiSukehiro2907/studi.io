import { useState } from "react";
import {
  Users,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Lightbulb,
  MessageSquare,
  LayoutDashboard,
} from "lucide-react";
import image from "../assets/study-collabaration.png";
import { signIn } from "@/api/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "@/api/user";
import { setUserData } from "@/redux/slices/userSlice";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!loginData.identifier || !loginData.password) {
      toast.error("Please enter email/username and password.");
      return;
    }
    const loadingToastId = toast.loading("Signing in...");

    try {
      await signIn({
        identifier: loginData.identifier,
        password: loginData.password,
      });

      const response = await fetchCurrentUser();
      dispatch(setUserData(response));

      toast.success("Logged in successfully!", { id: loadingToastId });

      setLoginData({ identifier: "", password: "" });

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 100);
    } catch (error) {
      let errorMessage = "Login failed. Please check your credentials.";

      if (error instanceof AxiosError) {
        if (
          error.response?.status === 409 &&
          error.response?.data?.message === "Please verify your email first"
        ) {
          errorMessage = "Please verify your email first.";
          toast.error(errorMessage, { id: loadingToastId });
          navigate("/verify-email");
          return;
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      }
      toast.error(errorMessage, { id: loadingToastId });
      console.error("Login error:", error);
    }
  };

  const features = [
    { text: "Dynamic Shared Whiteboards", icon: Lightbulb },
    { text: "Real-time Collaborative Chat", icon: MessageSquare },
    { text: "Organize Study Resources with Ease", icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-emerald-500/20">
        {/* Left Section - Login Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col">
          <div className="mb-8 flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl">
              <Users className="w-8 h-8 text-emerald-500" />
            </div>
            <span className="text-3xl font-bold font-mono bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
              Studi.io
            </span>
          </div>

          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-gray-400 text-sm">
                Sign in to continue your learning journey
              </p>
            </div>

            <div className="space-y-5">
              {/* Email or Username */}
              <div>
                <label className="block mb-2">
                  <span className="font-semibold text-sm flex items-center gap-2 text-gray-300">
                    <Mail className="w-4 h-4 text-emerald-500" />
                    Email or Username
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your email or username"
                  className="w-full px-4 h-12 bg-slate-700/50 border-2 border-slate-600 focus:border-emerald-500 focus:bg-slate-700 transition-all duration-200 rounded-xl text-white placeholder-gray-500 outline-none"
                  value={loginData.identifier}
                  onChange={(e) =>
                    setLoginData({ ...loginData, identifier: e.target.value })
                  }
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2">
                  <span className="font-semibold text-sm flex items-center gap-2 text-gray-300">
                    <Lock className="w-4 h-4 text-emerald-500" />
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full pl-4 pr-12 h-12 bg-slate-700/50 border-2 border-slate-600 focus:border-emerald-500 focus:bg-slate-700 transition-all duration-200 rounded-xl text-white placeholder-gray-500 outline-none"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-500 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="mt-2 flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-emerald-500 font-semibold hover:underline text-xs"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Emerald Themed Sign In Button */}
              <button
                className="w-full text-base font-semibold mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white border-none py-3 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 cursor-pointer"
                type="submit"
                onClick={handleSubmit}
              >
                Sign In
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-700"></div>
                <span className="text-xs text-gray-500">OR</span>
                <div className="flex-1 h-px bg-gray-700"></div>
              </div>

              {/* Create Account */}
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="text-emerald-500 font-bold hover:underline transition-all"
                  >
                    Create account
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Feature Image & Highlights */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-emerald-500/10 via-emerald-900/20 to-teal-500/10 items-center justify-center p-8 relative overflow-hidden">
          <div className="relative z-10 max-w-sm text-center space-y-6">
            <div className="relative w-full max-w-xs mx-auto mb-8">
              <img
                src={image}
                alt="Students collaborating"
                className="relative w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>

            <div className="space-y-3 mt-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-slate-800/40 backdrop-blur-lg rounded-xl p-3 border border-emerald-500/15"
                  >
                    <Icon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-left text-white/90">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
