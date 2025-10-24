export function SidebarTabs({
  sidebarTab,
  setSidebarTab,
}: {
  sidebarTab: "myRooms" | "findRooms";
  setSidebarTab: (tab: "myRooms" | "findRooms") => void;
}) {
  return (
    <div className="tabs tabs-boxed p-2 bg-base-200 flex-shrink-0">
      <button
        type="button"
        className={`tab flex-1 ${
          sidebarTab === "myRooms"
            ? "tab-active !bg-primary text-primary-content"
            : ""
        }`}
        onClick={() => setSidebarTab("myRooms")}
      >
        My Rooms
      </button>
      <button
        type="button"
        className={`tab flex-1 ${
          sidebarTab === "findRooms"
            ? "tab-active !bg-primary text-primary-content"
            : ""
        }`}
        onClick={() => setSidebarTab("findRooms")}
      >
        Find Rooms
      </button>
    </div>
  );
}
