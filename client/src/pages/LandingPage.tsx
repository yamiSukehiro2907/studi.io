import { Link } from "react-router-dom";
import {
  Lightbulb,
  MessageSquare,
  LayoutDashboard,
  ArrowRight,
  Github,
} from "lucide-react";
import heroImage from "../assets/study-collabaration.png";
import { FeatureCard } from "@/components/common/FeatureCard";
import { StepCard } from "@/components/common/StepCard";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-base-100 via-base-200/40 to-base-100 text-base-content">
      {/* Hero Section */}
      <section className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6 py-20 lg:py-28 relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse delay-200"></div>

        {/* Left side - content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm">
            Study Smarter. Together.
          </h1>
          <p className="text-lg text-base-content/70 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Welcome to{" "}
            <span className="font-semibold text-primary">Studi.io</span>, the
            collaborative workspace where whiteboards, chat, and resources unite
            for smarter group study.
          </p>

          {/* Buttons section */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
            <Link
              to="/signup"
              className="btn btn-primary btn-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started for Free
              <ArrowRight className="size-5 ml-2" />
            </Link>

            <Link
              to="/login"
              className="btn btn-ghost btn-lg hover:bg-base-200 transition-all"
            >
              Sign In
            </Link>

            <a
              href="https://github.com/yamiSukehiro2907/studi.io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg gap-2 hover:border-primary hover:text-primary transition-all"
            >
              <Github className="size-5" />
              GitHub
            </a>
          </div>
        </div>

        {/* Right side - image */}
        <div className="lg:w-1/2 flex justify-center relative">
          <img
            src={heroImage}
            alt="Students collaborating"
            className="rounded-3xl shadow-2xl border-4 border-primary/10 w-full max-w-md lg:max-w-lg transition-transform duration-500 hover:scale-[1.03]"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-base-200/50 backdrop-blur-md">
        <div className="container mx-auto px-6 text-center">
          <span className="text-primary font-semibold uppercase tracking-wider">
            Core Features
          </span>
          <h2 className="text-4xl font-bold my-4">
            Everything You Need in One Place
          </h2>
          <p className="text-base-content/70 mb-12 max-w-2xl mx-auto">
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
        <div className="absolute inset-0 bg-gradient-to-b from-base-100/0 via-base-200/30 to-base-100/0 -z-10"></div>
        <div className="container mx-auto px-6 text-center">
          <span className="text-primary font-semibold uppercase tracking-wider">
            Get Started Fast
          </span>
          <h2 className="text-4xl font-bold my-4">How It Works</h2>
          <p className="text-base-content/70 max-w-xl mx-auto mb-12">
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
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Study Sessions?
          </h2>
          <p className="text-base-content/70 mb-10 max-w-xl mx-auto leading-relaxed">
            Stop switching between apps. Build, learn, and collaborate together
            — all in Studi.io.
          </p>
          <Link
            to="/signup"
            className="btn btn-primary btn-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            Sign Up Now
            <ArrowRight className="size-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-base-content/60 border-t border-base-300 flex flex-col items-center gap-3">
        <p>
          © {new Date().getFullYear()} Studi.io — Built for learners, by
          learners.
        </p>
        <a
          href="https://github.com/yamiSukehiro2907/studi.io"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
        >
          <Github className="size-4" />
          <span>View on GitHub</span>
        </a>
      </footer>
    </div>
  );
}
