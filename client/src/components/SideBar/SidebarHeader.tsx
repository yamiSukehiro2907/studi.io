import { Plus } from "lucide-react";

export function SidebarHeader({ onCreateRoom }: { onCreateRoom: () => void }) {
  return (
    <div className="p-4 flex justify-between items-center border-b border-base-300 h-[69px] flex-shrink-0">
      <h2 className="text-xl font-bold">Study Rooms</h2>
      <button
        className="btn btn-primary btn-sm btn-circle"
        title="Create New Room"
        onClick={onCreateRoom}
      >
        <Plus className="size-5" />
      </button>
    </div>
  );
}
