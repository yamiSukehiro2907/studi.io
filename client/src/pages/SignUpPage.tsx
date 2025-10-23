import { useState } from "react";
import {
  Users,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Lightbulb,
  MessageSquare,
  LayoutDashboard,
} from "lucide-react";
import image from "../assets/study-collabaration.png";
import { signUp } from "@/api/auth";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await signUp(signupData);
    navigate("/login");
  };

  const features = [
    { text: "Dynamic Shared Whiteboards", icon: Lightbulb },
    { text: "Real-time Collaborative Chat", icon: MessageSquare },
    { text: "Organize Study Resources with Ease", icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-emerald-500/20">
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
                Create an Account
              </h2>
              <p className="text-gray-400 text-sm">
                Join thousands of students collaborating on Studi.io
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block mb-2">
                  <span className="font-semibold text-sm flex items-center gap-2 text-gray-300">
                    <User className="w-4 h-4 text-emerald-500" />
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 h-12 bg-slate-700/50 border-2 border-slate-600 focus:border-emerald-500 focus:bg-slate-700 transition-all duration-200 rounded-xl text-white placeholder-gray-500 outline-none"
                  value={signupData.name}
                  onChange={(e) =>
                    setSignupData({ ...signupData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2">
                  <span className="font-semibold text-sm flex items-center gap-2 text-gray-300">
                    <Mail className="w-4 h-4 text-emerald-500" />
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 h-12 bg-slate-700/50 border-2 border-slate-600 focus:border-emerald-500 focus:bg-slate-700 transition-all duration-200 rounded-xl text-white placeholder-gray-500 outline-none"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  required
                />
              </div>

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
                    placeholder="Create a strong password"
                    className="w-full pl-4 pr-12 h-12 bg-slate-700/50 border-2 border-slate-600 focus:border-emerald-500 focus:bg-slate-700 transition-all duration-200 rounded-xl text-white placeholder-gray-500 outline-none"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-500 transition-colors z-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-gray-500">
                    Must be at least 6 characters
                  </span>
                </div>
              </div>

              <div>
                <label className="flex items-start gap-3 py-3 px-1 cursor-pointer">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      className="appearance-none w-5 h-5 border-2 border-gray-400 rounded cursor-pointer checked:bg-emerald-500 checked:border-emerald-500 transition-all duration-200"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      required
                    />
                    {agreedToTerms && (
                      <svg
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-300">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-emerald-500 font-semibold hover:underline transition-all"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-emerald-500 font-semibold hover:underline transition-all"
                    >
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              <button
                className="w-full text-base shadow-lg font-semibold mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-none py-3 transition-colors cursor-pointer"
                type="submit"
                onClick={handleSubmit}
              >
                Create Account
              </button>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-700"></div>
                <span className="text-xs text-gray-500">OR</span>
                <div className="flex-1 h-px bg-gray-700"></div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-emerald-500 font-bold hover:underline transition-all"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

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
