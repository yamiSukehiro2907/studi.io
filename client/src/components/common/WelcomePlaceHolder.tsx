import logo from "../../assets/logo.png";

export const WelcomePlaceholder = ({userName}: { userName: string }) => {
    return (
        <div
            className="text-center max-w-sm mx-auto bg-gray-800/80 rounded-2xl p-8 border border-emerald-500/30 shadow-md hover:shadow-emerald-400/50 transition-all duration-300">
            <img
                src={logo}
                alt="Studi.io Logo"
                className="w-40 h-36 mx-auto mb-6 object-contain"
            />
            <h2 className="text-2xl font-semibold mt-2 text-emerald-400">
                Welcome, {userName}!
            </h2>
            <p className="mt-3 text-gray-300">
                Select a study room from the list to start collaborating, or create a new one.
            </p>
        </div>
    );
};
