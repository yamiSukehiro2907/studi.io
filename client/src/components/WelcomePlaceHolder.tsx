import { Users } from "lucide-react";

export const WelcomePlaceholder = ({ userName }: { userName: string }) => {
  return (
    <div className="text-center text-base-content/60 max-w-sm mx-auto">
      <Users className="size-16 mx-auto" />
      <h2 className="text-2xl font-semibold mt-4">Welcome, {userName}!</h2>
      <p className="mt-2">
        Select a study room from the list to start collaborating, or create a
        new one.
      </p>
    </div>
  );
};