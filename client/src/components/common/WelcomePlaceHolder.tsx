import logo from "../../assets/logo.png";

export const WelcomePlaceholder = ({ userName }: { userName: string }) => {
  return (
    <div className="text-center text-base-content/70 max-w-sm mx-auto bg-base-100/80 rounded-2xl p-8 border border-emerald-300/30 shadow-sm hover:shadow-emerald-400/30 transition-all duration-300">
      <img
        src={logo}
        alt="Studi.io Logo"
        className="w-36 h-36 mx-auto mb-4 object-contain"
      />
      <h2 className="text-2xl font-semibold mt-2 text-emerald-700">
        Welcome, {userName}!
      </h2>
      <p className="mt-2 text-base-content/70">
        Select a study room from the list to start collaborating, or create a
        new one.
      </p>
    </div>
  );
};
