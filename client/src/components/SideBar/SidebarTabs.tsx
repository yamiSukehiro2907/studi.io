export function SidebarTabs({
  sidebarTab,
  setSidebarTab,
}: {
  sidebarTab: "myRooms" | "findRooms";
  setSidebarTab: (tab: "myRooms" | "findRooms") => void;
}) {
  return (
    <div className="tabs tabs-boxed p-2 flex-shrink-0 bg-neutral-950 border-b border-emerald-800/20">
      <button
        type="button"
        className={`tab flex-1 rounded-lg transition-colors duration-200 ${
          sidebarTab === "myRooms"
            ? "tab-active bg-emerald-600 text-neutral-100"
            : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-emerald-400"
        }`}
        onClick={() => setSidebarTab("myRooms")}
      >
        My Rooms
      </button>
      <button
        type="button"
        className={`tab flex-1 rounded-lg transition-colors duration-200 ${
          sidebarTab === "findRooms"
            ? "tab-active bg-emerald-600 text-neutral-100"
            : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-emerald-400"
        }`}
        onClick={() => setSidebarTab("findRooms")}
      >
        Find Rooms
      </button>
    </div>
  );
}
