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
    <div className="p-4 flex-shrink-0 relative bg-neutral-950 border-b border-neutral-800 rounded-lg">
      <input
        type="text"
        placeholder={
          sidebarTab === "myRooms"
            ? "Search your rooms..."
            : "Search public rooms..."
        }
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full h-10 pl-10 pr-3 bg-neutral-900 text-neutral-100 placeholder-neutral-500 border border-neutral-800 rounded-lg focus:border-emerald-500 outline-none transition-all duration-150"
      />
      <Search className="size-5 absolute left-7 top-1/2 transform -translate-y-1/2 text-neutral-500 pointer-events-none" />
    </div>
  );
}
