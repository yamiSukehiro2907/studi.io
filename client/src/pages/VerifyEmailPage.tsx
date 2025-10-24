import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, Mail, KeySquare, CheckCircle } from "lucide-react";
import { sendEmailOTPVerification, verifyOTP } from "@/api/otp";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const { userData } = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState(userData?.email || "");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const loadingToastId = toast.loading("Sending verification code...");

    try {
      await sendEmailOTPVerification(email);
      setMessage(
        `A verification code has been sent to ${email}. Please check your inbox.`
      );
      setStep(2);
      setResendCountdown(60);

      toast.success("Verification code sent!", { id: loadingToastId });
    } catch (err: any) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message || "Failed to send verification code.";
      setError(errorMsg);

      toast.error(errorMsg, { id: loadingToastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const loadingToastId = toast.loading("Verifying code...");

    try {
      await verifyOTP(email, otp);
      setMessage("Email verified successfully!");
      setStep(3);

      toast.success("Email verified successfully!", { id: loadingToastId });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message || "Invalid or expired verification code.";
      setError(errorMsg);

      toast.error(errorMsg, { id: loadingToastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const loadingToastId = toast.loading("Resending verification code...");

    try {
      await sendEmailOTPVerification(email);
      setMessage("Verification code resent successfully!");
      setResendCountdown(60);

      toast.success("Verification code resent!", { id: loadingToastId });
    } catch (err: any) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message || "Failed to resend verification code.";
      setError(errorMsg);

      toast.error(errorMsg, { id: loadingToastId });
    } finally {
      setIsLoading(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Verify Your Email";
      case 2:
        return "Enter Verification Code";
      case 3:
        return "Email Verified!";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Enter your email address to receive a verification code.";
      case 2:
        return `Enter the 6-digit code sent to ${email}.`;
      case 3:
        return "Your email has been successfully verified. Redirecting...";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950">
      <div className="w-full max-w-lg mx-auto bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-emerald-500/20">
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col">
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl">
              <Users className="w-8 h-8 text-emerald-500" />
            </div>
            <span className="text-3xl font-bold font-mono bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
              Studi.io
            </span>
          </div>

          <div className="flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {getStepTitle()}
              </h2>
              <p className="text-gray-400 text-sm">{getStepDescription()}</p>
            </div>

            {step !== 3 && (
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step >= 1
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-600 text-gray-400"
                    }`}
                  >
                    1
                  </div>
                  <div
                    className={`w-12 h-1 ${
                      step >= 2 ? "bg-emerald-500" : "bg-slate-600"
                    }`}
                  ></div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step >= 2
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-600 text-gray-400"
                    }`}
                  >
                    2
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <form onSubmit={handleEmailSubmit} className="space-y-5">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  className="w-full text-base shadow-lg font-semibold mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-none py-3 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Send Verification Code"
                  )}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleOtpVerify} className="space-y-5">
                <div>
                  <label className="block mb-2">
                    <span className="font-semibold text-sm flex items-center gap-2 text-gray-300">
                      <KeySquare className="w-4 h-4 text-emerald-500" />
                      Verification Code
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 h-12 bg-slate-700/50 border-2 border-slate-600 focus:border-emerald-500 focus:bg-slate-700 transition-all duration-200 rounded-xl text-white placeholder-gray-500 outline-none text-center text-2xl tracking-widest"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    maxLength={6}
                    required
                  />
                </div>

                <button
                  className="w-full text-base shadow-lg font-semibold mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-none py-3 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Verify Email"
                  )}
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">
                    Didn't receive the code?
                  </p>
                  <button
                    type="button"
                    className="text-sm text-emerald-500 hover:underline font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
                    onClick={handleResendOTP}
                    disabled={resendCountdown > 0 || isLoading}
                  >
                    {resendCountdown > 0
                      ? `Resend in ${resendCountdown}s`
                      : "Resend Code"}
                  </button>
                </div>

                <button
                  type="button"
                  className="w-full text-sm text-gray-400 hover:text-emerald-500 transition-colors"
                  onClick={() => setStep(1)}
                >
                  ← Change Email Address
                </button>
              </form>
            )}

            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="p-4 bg-emerald-500/20 rounded-full animate-bounce">
                    <CheckCircle className="w-16 h-16 text-emerald-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-lg text-gray-300">
                    Your email has been verified successfully!
                  </p>
                  <p className="text-sm text-gray-400">
                    Redirecting you to the dashboard...
                  </p>
                </div>
                <div className="flex justify-center">
                  <span className="loading loading-spinner loading-md text-emerald-500"></span>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center text-red-400 text-sm mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {error}
              </div>
            )}
            {message && step !== 3 && (
              <div className="text-center text-green-400 text-sm mt-4 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                {message}
              </div>
            )}

            {step !== 3 && (
              <div className="text-center mt-8">
                <p className="text-sm text-gray-400">
                  Already verified?{" "}
                  <Link
                    to="/login"
                    className="text-emerald-500 font-bold hover:underline transition-all"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
