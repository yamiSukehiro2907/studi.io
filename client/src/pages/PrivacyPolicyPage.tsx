import { ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Introduction",
      content:
        "Welcome to Studi.io. We respect your privacy and are committed to protecting your personal data. This policy explains how we handle your data and your rights.",
    },
    {
      title: "2. Information We Collect",
      content: "We collect and process the following types of information:",
      list: [
        "Personal Information: Name, email, username, password, profile picture (optional)",
        "Usage Data: IP address, browser type, pages visited, device info, study room activity",
        "Content Data: Messages, whiteboard notes, uploaded files",
      ],
    },
    {
      title: "3. How We Use Your Information",
      list: [
        "Provide and maintain our service",
        "Authenticate and manage your account",
        "Enable collaboration features",
        "Improve and personalize your experience",
        "Send updates and notifications",
        "Detect and prevent fraud and abuse",
        "Comply with legal obligations",
      ],
    },
    {
      title: "4. Data Storage and Security",
      list: [
        "Passwords encrypted with industry-standard hashing",
        "Data transmitted over secure HTTPS connections",
        "Access restricted to authorized personnel",
        "Regular security audits and updates",
        "Data stored on secure servers with backups",
      ],
    },
    {
      title: "5. Data Sharing and Disclosure",
      list: [
        "With study room members (name, profile picture, messages)",
        "With service providers assisting our platform",
        "When required by law",
        "In connection with mergers or acquisitions",
      ],
    },
    {
      title: "6. Cookies and Tracking",
      content:
        "We use cookies and similar technologies to maintain sessions, remember preferences, and analyze usage. Control cookies through your browser settings.",
    },
    {
      title: "7. Your Privacy Rights",
      list: [
        "Access your personal data",
        "Rectify inaccurate data",
        "Delete your account and data",
        "Restrict or object to data processing",
        "Data portability",
        "Withdraw consent at any time",
      ],
      email: "privacy@studi.io",
    },
    {
      title: "8. Data Retention",
      content:
        "We retain data only as long as needed. Deleted accounts will have data removed or anonymized within 30 days, except where legally required.",
    },
    {
      title: "9. Children's Privacy",
      content:
        "Our service is not for children under 13. If you believe a child has provided personal information, contact us.",
    },
    {
      title: "10. International Data Transfers",
      content:
        "Data may be transferred to servers outside your country with appropriate safeguards.",
    },
    {
      title: "11. Changes to This Policy",
      content:
        "We may update this policy and will notify you of significant changes. Please review periodically.",
    },
    {
      title: "12. Contact Us",
      email: "vimalyadavkr001@gmail.com",
      support: "studi.io2907@gmail.com",
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
          Privacy Policy
        </h1>
        <p className="text-emerald-400 mb-8">Last updated: October 25, 2025</p>

        {/* Privacy Content */}
        <div className="space-y-8 text-emerald-400">
          {sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-2xl font-semibold text-emerald-500 mb-3 flex items-center gap-2">
                {/* Optional icon */}
                <span>📌</span>
                {section.title}
              </h2>

              {section.content && <p>{section.content}</p>}

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
                  {section.support && (
                    <>
                      <span>|</span>
                      <a
                        href={`mailto:${section.support}`}
                        className="text-emerald-300 font-semibold hover:underline"
                      >
                        {section.support}
                      </a>
                    </>
                  )}
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

export default PrivacyPolicy;
