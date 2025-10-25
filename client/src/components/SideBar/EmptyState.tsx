import { Plus } from "lucide-react";

export function EmptyState({
  searchQuery,
  sidebarTab,
  setSidebarTab,
  onCreateRoom,
}: {
  searchQuery: string;
  sidebarTab: "myRooms" | "findRooms";
  setSidebarTab: (tab: "myRooms" | "findRooms") => void;
  onCreateRoom: () => void;
}) {
  const textClass = "text-neutral-400"; // Subtle text for dark background

  if (searchQuery) {
    return (
      <div className={`text-center p-6 ${textClass}`}>
        <p>No rooms found matching "{searchQuery}"</p>
      </div>
    );
  }

  if (sidebarTab === "myRooms") {
    return (
      <div className={`text-center p-6 ${textClass} flex flex-col items-center gap-4`}>
        <p>You haven't joined any study rooms yet.</p>

        <div className="flex items-center gap-2 w-full justify-center">
          <button
            type="button"
            className="btn btn-outline btn-sm border-neutral-700 text-neutral-200 hover:border-emerald-500 hover:text-emerald-500 normal-case transition-all min-w-[120px]"
            onClick={() => setSidebarTab("findRooms")}
          >
            Find a room
          </button>

          <span className="text-neutral-500">or</span>

          <button
            type="button"
            className="btn btn-sm bg-emerald-500 hover:bg-emerald-600 text-neutral-100 normal-case transition-all min-w-[150px] flex items-center justify-center gap-2"
            onClick={onCreateRoom}
          >
            <Plus className="size-4" />
            Create one
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center p-6 ${textClass}`}>
      <p>Search for public rooms above.</p>
    </div>
  );
}
