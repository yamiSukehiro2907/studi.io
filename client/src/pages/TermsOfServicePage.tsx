import { ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using Studi.io, you agree to be bound by these terms. If you do not agree, please do not use our service.",
    },
    {
      title: "2. Description of Service",
      content:
        "Studi.io provides a collaborative study platform that includes:",
      list: [
        "Study room creation and management",
        "Real-time messaging and collaboration",
        "Whiteboard and resource sharing",
        "AI-powered study assistance",
      ],
    },
    {
      title: "3. User Accounts",
      content:
        "To use certain features, you must register an account. You agree to:",
      list: [
        "Provide accurate registration information",
        "Keep your password and account secure",
        "Notify us of unauthorized account use",
        "Be responsible for activities under your account",
      ],
    },
    {
      title: "4. User Conduct",
      content: "You agree not to:",
      list: [
        "Use the service illegally or against laws",
        "Violate rights of third parties",
        "Post threatening, abusive, or hateful content",
        "Distribute harmful software or viruses",
        "Impersonate others",
        "Disrupt the service or servers",
      ],
    },
    {
      title: "5. Content Ownership",
      content:
        "You retain ownership of content you submit. By submitting, you grant Studi.io a worldwide, non-exclusive, royalty-free license to use it for service purposes.",
    },
    {
      title: "6. Intellectual Property",
      content:
        "All content, features, and functionality of Studi.io are owned by us and protected by intellectual property laws.",
    },
    {
      title: "7. Termination",
      content:
        "We may terminate your account immediately for any breach of these Terms.",
    },
    {
      title: "8. Limitation of Liability",
      content:
        "Studi.io is not liable for indirect, incidental, special, or consequential damages, including loss of profits or data.",
    },
    {
      title: "9. Disclaimer",
      content:
        'Use the service at your own risk. The service is provided "AS IS" without warranties.',
    },
    {
      title: "10. Changes to Terms",
      content:
        "We may modify these Terms at any time. Continued use after changes constitutes acceptance.",
    },
    {
      title: "11. Contact Us",
      content: "Questions? Reach us at:",
      email: "studi.io2907@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-emerald-400">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-emerald-500 mb-4">
          Terms of Service
        </h1>
        <p className="text-emerald-400 mb-8">Last updated: October 25, 2025</p>

        {/* Terms Content */}
        <div className="space-y-8 text-emerald-400">
          {sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-2xl font-semibold text-emerald-500 mb-3 flex items-center gap-2">
                {/* Optional section icon */}
                <span>📌</span>
                {section.title}
              </h2>
              <p>{section.content}</p>
              {section.list && (
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {section.email && (
                <div className="flex items-center gap-2 mt-2">
                  <Mail size={18} className="text-emerald-400" />
                  <a
                    href={`mailto:${section.email}`}
                    className="text-emerald-300 font-semibold hover:underline"
                  >
                    {section.email}
                  </a>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-emerald-500/20 text-center text-emerald-400 text-sm">
          © 2025 Studi.io. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
