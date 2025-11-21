import {BookOpen, Info, LayoutGrid, MessageSquare, Settings} from "lucide-react";

export function MainContentHeader({
                                      roomName,
                                      roomImage,
                                      mainContentTab,
                                      setMainContentTab,
                                      canEdit,
                                  }: {
    roomName: string;
    roomImage?: string;
    mainContentTab: "chat" | "info" | "whiteboard" | "resourceHub" | "settings";
    setMainContentTab: (
        tab: "chat" | "info" | "whiteboard" | "resourceHub" | "settings"
    ) => void;
    canEdit: Boolean;
}) {
    const tabs = [
        {key: "chat", label: "Chat", icon: <MessageSquare className="size-4"/>},
        {
            key: "whiteboard",
            label: "Whiteboard",
            icon: <LayoutGrid className="size-4"/>,
        },
        {
            key: "resourceHub",
            label: "Resources",
            icon: <BookOpen className="size-4"/>,
        },
        {key: "info", label: "Info", icon: <Info className="size-4"/>},
    ];

    if (canEdit) {
        tabs.push({
            key: "settings",
            label: "Settings",
            icon: <Settings className="size-4"/>,
        });
    }

    return (
        <div
            className="px-6 py-4 bg-neutral-900 border-b border-emerald-900/40 flex justify-between items-center shadow-sm sticky top-0 z-20">
            <div
                className="flex items-center gap-4 flex-1 min-w-0"
                onClick={() => {
                    if (mainContentTab === "info") {
                        setMainContentTab("chat");
                    } else {
                        setMainContentTab("info");
                    }
                }}
            >
                <div className="avatar">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-emerald-950 ring-1 ring-emerald-700/40">
                        {roomImage ? (
                            <img
                                src={roomImage}
                                alt={roomName}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div
                                className="flex items-center justify-center h-full w-full text-emerald-400 font-semibold">
                                {roomName.substring(0, 2).toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>
                <h2 className="font-bold text-lg truncate text-emerald-100">
                    {roomName}
                </h2>
            </div>

            <div className="flex items-center gap-2">
                <div
                    className="inline-flex items-center gap-1 p-1 bg-neutral-800 rounded-xl border border-emerald-800/40 shadow-inner">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                mainContentTab === tab.key
                                    ? "bg-emerald-600 text-white shadow-md"
                                    : "text-emerald-300 hover:text-white hover:bg-emerald-800/40"
                            }`}
                            onClick={() =>
                                setMainContentTab(
                                    tab.key as
                                        | "chat"
                                        | "info"
                                        | "whiteboard"
                                        | "resourceHub"
                                        | "settings"
                                )
                            }
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}