import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Users, Mail, Lock, KeySquare, Eye, EyeOff} from "lucide-react";
import {sendEmailOTPVerification, verifyOTP} from "@/api/otp";
import {changePassword} from "@/api/user";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "@/redux/store.ts";
import {setUserData} from "@/redux/slices/userSlice.ts";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const {userData} = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();


    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setMessage(null);

        const loadingToastId = toast.loading("Sending OTP...");

        try {
            await sendEmailOTPVerification(email);
            setMessage(`An OTP has been sent to ${email}. Please check your inbox.`);
            setStep(2);
            toast.success("OTP sent successfully!", {id: loadingToastId});
        } catch (err: any) {
            console.error(err);
            const errorMsg = err.response?.data?.message || "Failed to send OTP.";
            setError(errorMsg);
            toast.error(errorMsg, {id: loadingToastId});
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setMessage(null);

        const loadingToastId = toast.loading("Verifying OTP...");

        try {
            await verifyOTP(email, otp);
            if (userData) {
                dispatch(setUserData({
                    ...userData,
                    verified: true
                }));
            }
            setMessage("Email verified successfully!");
            setStep(3);
            toast.success("OTP verified!", {id: loadingToastId});
        } catch (err: any) {
            console.error(err);
            const errorMsg = err.response?.data?.message || "Invalid or expired OTP.";
            setError(errorMsg);
            toast.error(errorMsg, {id: loadingToastId});
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setMessage(null);

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            setIsLoading(false);
            toast.error("Passwords do not match!");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long!");
            setIsLoading(false);
            toast.error("Password must be at least 6 characters long!");
            return;
        }

        const loadingToastId = toast.loading("Resetting password...");

        try {
            await changePassword(email, newPassword);
            setMessage("Password reset successfully! Redirecting to login...");
            toast.success("Password reset successfully!", {id: loadingToastId});
            navigate("/login");
        } catch (err: any) {
            console.error(err);
            const errorMsg =
                err.response?.data?.message || "Failed to reset password.";
            setError(errorMsg);
            toast.error(errorMsg, {id: loadingToastId});
        } finally {
            setIsLoading(false);
        }
    };

    const getStepTitle = () => {
        switch (step) {
            case 1:
                return "Forgot Your Password?";
            case 2:
                return "Verify Your Email";
            case 3:
                return "Create New Password";
            default:
                return "";
        }
    };

    const getStepDescription = () => {
        switch (step) {
            case 1:
                return "No problem. Enter your email and we'll send you a reset code.";
            case 2:
                return `Enter the 6-digit code sent to ${email}.`;
            case 3:
                return "Choose a strong password for your account.";
            default:
                return "";
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950">
            <div
                className="w-full max-w-lg mx-auto bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-emerald-500/20">
                <div className="p-6 sm:p-10 lg:p-12 flex flex-col">
                    <div className="mb-8 flex flex-col items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl">
                            <Users className="w-8 h-8 text-emerald-500"/>
                        </div>
                        <span
                            className="text-3xl font-bold font-mono bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
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
                                <div
                                    className={`w-12 h-1 ${
                                        step >= 3 ? "bg-emerald-500" : "bg-slate-600"
                                    }`}
                                ></div>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                        step >= 3
                                            ? "bg-emerald-500 text-white"
                                            : "bg-slate-600 text-gray-400"
                                    }`}
                                >
                                    3
                                </div>
                            </div>
                        </div>

                        {step === 1 && (
                            <form onSubmit={handleEmailSubmit} className="space-y-5">
                                <div>
                                    <label className="block mb-2">
                    <span className="font-semibold text-sm flex items-center gap-2 text-gray-300">
                      <Mail className="w-4 h-4 text-emerald-500"/>
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
                                    className="w-full text-base shadow-lg font-semibold mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-none py-3 transition-colors cursor-pointer"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        "Send OTP"
                                    )}
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleOtpVerify} className="space-y-5">
                                <div>
                                    <label className="block mb-2">
                    <span className="font-semibold text-sm flex items-center gap-2 text-gray-300">
                      <KeySquare className="w-4 h-4 text-emerald-500"/>
                      Verification Code (OTP)
                    </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter the 6-digit code"
                                        className="w-full px-4 h-12 bg-slate-700/50 border-2 border-slate-600 focus:border-emerald-500 focus:bg-slate-700 transition-all duration-200 rounded-xl text-white placeholder-gray-500 outline-none"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        maxLength={6}
                                        required
                                    />
                                </div>

                                <button
                                    className="w-full text-base shadow-lg font-semibold mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-none py-3 transition-colors cursor-pointer"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        "Verify OTP"
                                    )}
                                </button>

                                <button
                                    type="button"
                                    className="w-full text-sm text-emerald-500 hover:underline"
                                    onClick={() => setStep(1)}
                                >
                                    Resend OTP
                                </button>
                            </form>
                        )}

                        {step === 3 && (
                            <form onSubmit={handlePasswordReset} className="space-y-5">
                                <div>
                                    <label className="block mb-2">
                    <span className="font-semibold text-sm flex items-center gap-2 text-gray-300">
                      <Lock className="w-4 h-4 text-emerald-500"/>
                      New Password
                    </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter new password"
                                            className="w-full pl-4 pr-12 h-12 bg-slate-700/50 border-2 border-slate-600 focus:border-emerald-500 focus:bg-slate-700 transition-all duration-200 rounded-xl text-white placeholder-gray-500 outline-none"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-500 transition-colors"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5"/>
                                            ) : (
                                                <Eye className="w-5 h-5"/>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2">
                    <span className="font-semibold text-sm flex items-center gap-2 text-gray-300">
                      <Lock className="w-4 h-4 text-emerald-500"/>
                      Confirm Password
                    </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Re-enter new password"
                                            className="w-full pl-4 pr-12 h-12 bg-slate-700/50 border-2 border-slate-600 focus:border-emerald-500 focus:bg-slate-700 transition-all duration-200 rounded-xl text-white placeholder-gray-500 outline-none"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-500 transition-colors"
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-5 h-5"/>
                                            ) : (
                                                <Eye className="w-5 h-5"/>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    className="w-full text-base shadow-lg font-semibold mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-none py-3 transition-colors cursor-pointer"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </button>
                            </form>
                        )}

                        {error && (
                            <div
                                className="text-center text-red-400 text-sm mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                {error}
                            </div>
                        )}
                        {message && (
                            <div
                                className="text-center text-green-400 text-sm mt-4 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                                {message}
                            </div>
                        )}

                        <div className="text-center mt-8">
                            <p className="text-sm text-gray-400">
                                Remember your password?{" "}
                                <Link
                                    to="/login"
                                    className="text-emerald-500 font-bold hover:underline transition-all"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
