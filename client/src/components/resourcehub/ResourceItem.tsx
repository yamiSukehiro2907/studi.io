import React from "react";
import {ExternalLink, Edit2, Trash2} from "lucide-react";
import type {Resource} from "@/config/schema/Resource";

interface ResourceItemProps {
    resource: Resource;
    canEdit: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

const ResourceItem: React.FC<ResourceItemProps> = ({
                                                       resource,
                                                       canEdit,
                                                       onEdit,
                                                       onDelete,
                                                   }) => {
    const handleLinkClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const getFullLink = (link: string) => {
        if (!link) return "#";
        if (/^https?:\/\//i.test(link)) return link;
        return `https://${link}`;
    };

    return (
        <div
            className="group flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-950 hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-950 dark:hover:to-teal-950 rounded-lg border border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-200 hover:shadow-md">
            <a
                href={getFullLink(resource.link)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="flex items-center gap-3 flex-1 min-w-0"
            >
                <div
                    className="flex-shrink-0 p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                    <ExternalLink className="size-4 text-white"/>
                </div>
                <div className="flex-1 min-w-0">
          <span
              className="font-semibold text-gray-800 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors block truncate">
            {resource.title}
          </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500 truncate block">
            {resource.link}
          </span>
                </div>
            </a>

            {canEdit && (
                <div className="flex gap-1 ml-3">
                    <button
                        className="p-2 hover:bg-emerald-200 dark:hover:bg-emerald-800 rounded-lg transition-colors"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onEdit();
                        }}
                        title="Edit Resource"
                    >
                        <Edit2 className="size-4 text-emerald-600 dark:text-emerald-400"/>
                    </button>
                    <button
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete();
                        }}
                        title="Delete Resource"
                    >
                        <Trash2 className="size-4 text-red-500 dark:text-red-400"/>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResourceItem;
