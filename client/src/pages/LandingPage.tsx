import { Link } from "react-router-dom";
import {
  Lightbulb,
  MessageSquare,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import heroImage from "../assets/study-collabaration.png";
import { FeatureCard } from "@/components/common/FeatureCard";
import { StepCard } from "@/components/common/StepCard";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen" data-theme="forest">
      {/* Hero Section */}
      <section className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6 py-20 lg:py-32">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent leading-tight">
            Study Smarter, Not Harder. Together.
          </h1>
          <p className="text-lg text-base-content/70 mb-10 max-w-lg mx-auto lg:mx-0">
            Welcome to Studi.io, the all-in-one collaborative platform that
            combines shared whiteboards, real-time chat, and organized resource
            hubs.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Link
              to="/signup"
              className="btn btn-primary btn-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
            >
              Get Started for Free
              <ArrowRight className="size-5 ml-2" />
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2">
          <img
            src={heroImage}
            alt="Students collaborating"
            className="rounded-3xl shadow-2xl border-4 border-primary/10 w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-200/50">
        <div className="container mx-auto px-6 text-center">
          <span className="text-primary font-semibold uppercase">
            Core Features
          </span>
          <h2 className="text-4xl font-bold my-4">
            Everything You Need in One Place
          </h2>
          <p className="text-base-content/70 mb-12 max-w-2xl mx-auto">
            Studi.io brings the best study tools into a single, seamless
            workspace.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Lightbulb}
              title="Dynamic Whiteboards"
              description="Brainstorm ideas, solve problems, and take notes in real-time on a shared canvas."
            />
            <FeatureCard
              icon={MessageSquare}
              title="Real-time Chat"
              description="Communicate with your study group instantly without ever leaving the app."
            />
            <FeatureCard
              icon={LayoutDashboard}
              title="Resource Hub"
              description="Organize all your links, documents, and notes into easy-to-find sections."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <span className="text-primary font-semibold uppercase">
            Get Started Fast
          </span>
          <h2 className="text-4xl font-bold my-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <StepCard
              number="1"
              title="Create Your Room"
              description="Sign up and create a new study room for any subject or group."
            />
            <StepCard
              number="2"
              title="Invite Your Friends"
              description="Share a simple link to invite your classmates and friends to collaborate."
            />
            <StepCard
              number="3"
              title="Study Together"
              description="Use the whiteboard, chat, and resource hub to learn and succeed as a team."
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-primary/10 via-emerald-900/20 to-secondary/10 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Study Sessions?
          </h2>
          <p className="text-base-content/70 mb-10 max-w-xl mx-auto">
            Stop juggling apps and start collaborating. Create your free
            Studi.io account today.
          </p>
          <Link
            to="/signup"
            className="btn btn-primary btn-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up Now
            <ArrowRight className="size-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
