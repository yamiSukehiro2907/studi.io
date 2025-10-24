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
  if (searchQuery) {
    return (
      <div className="text-center p-6 text-base-content/60">
        <p>No rooms found matching "{searchQuery}"</p>
      </div>
    );
  }

  if (sidebarTab === "myRooms") {
    return (
      <div className="text-center p-6 text-base-content/60">
        <p>You haven't joined any study rooms yet.</p>
        <button
          type="button"
          className="btn btn-link btn-sm mt-2 normal-case"
          onClick={() => setSidebarTab("findRooms")}
        >
          Find a room to join
        </button>
        <span className="mx-2">or</span>
        <button
          type="button"
          className="btn btn-primary btn-sm mt-2"
          onClick={onCreateRoom}
        >
          Create one
        </button>
      </div>
    );
  }

  return (
    <div className="text-center p-6 text-base-content/60">
      <p>Search for public rooms above.</p>
    </div>
  );
}
