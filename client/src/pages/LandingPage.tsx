import {Link} from "react-router-dom";
import {
    Lightbulb,
    MessageSquare,
    LayoutDashboard,
    ArrowRight,
    Github,
} from "lucide-react";
import heroImage from "../assets/study-collabaration.png";
import {FeatureCard} from "@/components/common/FeatureCard";
import {StepCard} from "@/components/common/StepCard";

export default function LandingPage() {
    return (
        <div
            className="flex flex-col min-h-screen bg-gradient-to-b from-emerald-950 via-slate-900 to-teal-950 text-white">
            {/* Hero Section */}
            <section
                className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6 py-20 lg:py-28 relative overflow-hidden">
                {/* Decorative glowing orbs */}
                <div
                    className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div
                    className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-200"></div>

                {/* Left side - content */}
                <div className="lg:w-1/2 text-center lg:text-left space-y-6">
                    <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent drop-shadow-md">
                        Study Smarter. Together.
                    </h1>
                    <p className="text-lg text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                        Welcome to{" "}
                        <span className="font-semibold text-emerald-400">Studi.io</span>,
                        the collaborative workspace where whiteboards, chat, and resources
                        unite for smarter group study.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
                        <Link
                            to="/signup"
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-lg shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Get Started for Free
                            <ArrowRight className="size-5 inline ml-2"/>
                        </Link>

                        <Link
                            to="/login"
                            className="px-6 py-3 rounded-xl border border-emerald-500/40 text-emerald-400 font-semibold hover:bg-emerald-500/10 transition-all duration-300"
                        >
                            Sign In
                        </Link>

                        <a
                            href="https://github.com/yamiSukehiro2907/studi.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-xl border border-emerald-500/30 hover:border-emerald-500 text-gray-300 hover:text-emerald-400 font-semibold transition-all duration-300 flex items-center gap-2"
                        >
                            <Github className="size-5"/>
                            GitHub
                        </a>
                    </div>
                </div>

                {/* Right side - hero image */}
                <div className="lg:w-1/2 flex justify-center relative">
                    <img
                        src={heroImage}
                        alt="Students collaborating"
                        className="rounded-3xl shadow-2xl border-4 border-emerald-500/10 w-full max-w-md lg:max-w-lg transition-transform duration-500 hover:scale-[1.03]"
                    />
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-slate-800/40 backdrop-blur-md border-y border-emerald-500/10">
                <div className="container mx-auto px-6 text-center">
          <span className="text-emerald-400 font-semibold uppercase tracking-wider">
            Core Features
          </span>
                    <h2 className="text-4xl font-bold my-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Everything You Need in One Place
                    </h2>
                    <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                        Studi.io integrates every tool you need to brainstorm, chat, and
                        collaborate — all in one space.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Lightbulb}
                            title="Dynamic Whiteboards"
                            description="Brainstorm, visualize, and co-create in real-time using interactive, shared canvases."
                        />
                        <FeatureCard
                            icon={MessageSquare}
                            title="Real-time Chat"
                            description="Instantly communicate, share ideas, and keep your team connected without switching tabs."
                        />
                        <FeatureCard
                            icon={LayoutDashboard}
                            title="Resource Hub"
                            description="Keep all your documents, links, and study materials neatly organized in one spot."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 relative">
                <div
                    className="absolute inset-0 bg-gradient-to-b from-emerald-900/0 via-emerald-900/10 to-teal-900/0 -z-10"></div>
                <div className="container mx-auto px-6 text-center">
          <span className="text-emerald-400 font-semibold uppercase tracking-wider">
            Get Started Fast
          </span>
                    <h2 className="text-4xl font-bold my-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        How It Works
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto mb-12">
                        Jump in and start collaborating in minutes — it’s that simple.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
                        <StepCard
                            number="1"
                            title="Create Your Room"
                            description="Sign up and set up a room tailored for your subject or project."
                        />
                        <StepCard
                            number="2"
                            title="Invite Your Friends"
                            description="Send an invite link and bring your classmates into your collaborative space."
                        />
                        <StepCard
                            number="3"
                            title="Study Together"
                            description="Use the tools to chat, visualize, and share resources seamlessly."
                        />
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section
                className="bg-gradient-to-br from-emerald-500/10 via-emerald-900/10 to-teal-500/10 py-24 border-t border-emerald-500/10">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                        Ready to Transform Your Study Sessions?
                    </h2>
                    <p className="text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
                        Stop switching between apps. Build, learn, and collaborate together
                        — all in{" "}
                        <span className="text-emerald-400 font-semibold">Studi.io</span>.
                    </p>
                    <Link
                        to="/signup"
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-lg shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Sign Up Now
                        <ArrowRight className="size-5 inline ml-2"/>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="py-8 text-center text-sm text-gray-400 border-t border-emerald-500/20 flex flex-col items-center gap-3">
                <p>
                    © {new Date().getFullYear()}{" "}
                    <span className="text-emerald-400 font-semibold">Studi.io</span> —
                    Built for learners, by learners.
                </p>
                <a
                    href="https://github.com/yamiSukehiro2907/studi.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
                >
                    <Github className="size-4"/>
                    <span>View on GitHub</span>
                </a>
            </footer>
        </div>
    );
}
