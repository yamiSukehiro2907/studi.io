import { Search } from "lucide-react";

export function SearchBar({
  searchQuery,
  setSearchQuery,
  sidebarTab,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sidebarTab: "myRooms" | "findRooms";
}) {
  return (
    <div className="p-4 border-b border-base-300 flex-shrink-0 relative">
      <input
        type="text"
        placeholder={
          sidebarTab === "myRooms"
            ? "Search your rooms..."
            : "Search public rooms..."
        }
        className="input input-bordered w-full h-10 pl-10"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search className="size-5 absolute left-7 top-1/2 transform -translate-y-1/2 text-base-content/40 pointer-events-none" />
    </div>
  );
}
