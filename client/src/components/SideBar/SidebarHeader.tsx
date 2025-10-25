import { Plus } from "lucide-react";

export function SidebarHeader({ onCreateRoom }: { onCreateRoom: () => void }) {
  return (
    <div className="p-4 flex justify-between items-center border-b border-emerald-800/20 h-[69px] flex-shrink-0 bg-neutral-950">
      <h2 className="text-xl font-bold text-neutral-200">Study Rooms</h2>
      <button
        className="btn btn-sm btn-emerald bg-emerald-500 hover:bg-emerald-600 text-neutral-100 btn-circle"
        title="Create New Room"
        onClick={onCreateRoom}
      >
        <Plus className="size-5" />
      </button>
    </div>
  );
}
