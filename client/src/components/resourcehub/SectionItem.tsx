import React, { useState } from "react";
import { Plus, Trash2, Edit2, ChevronDown, Folder } from "lucide-react";
import type { Section } from "@/config/schema/Section";
import type { Resource } from "@/config/schema/Resource";
import ResourceList from "./ResourceList";

interface SectionItemProps {
  section: Section;
  canEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onAddResource: () => void;
  onEditResource: (resource: Resource) => void;
  onDeleteResource: (resourceId: string) => void;
}

const SectionItem: React.FC<SectionItemProps> = ({
  section,
  canEdit,
  onEdit,
  onDelete,
  onAddResource,
  onEditResource,
  onDeleteResource,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-200 dark:border-emerald-800 overflow-hidden">
      {/* Section Header */}
      <div
        className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 cursor-pointer hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900 dark:hover:to-teal-900 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-md">
            <Folder className="size-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 truncate">
              {section.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {section.resources.length}{" "}
              {section.resources.length === 1 ? "resource" : "resources"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {canEdit && (
            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
              <button
                className="p-2 hover:bg-emerald-200 dark:hover:bg-emerald-800 rounded-lg transition-colors"
                onClick={onEdit}
                title="Edit Section"
              >
                <Edit2 className="size-4 text-emerald-600 dark:text-emerald-400" />
              </button>
              <button
                className="p-2 hover:bg-emerald-200 dark:hover:bg-emerald-800 rounded-lg transition-colors"
                onClick={onAddResource}
                title="Add Resource"
              >
                <Plus className="size-4 text-emerald-600 dark:text-emerald-400" />
              </button>
              <button
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                onClick={onDelete}
                title="Delete Section"
              >
                <Trash2 className="size-4 text-red-500 dark:text-red-400" />
              </button>
            </div>
          )}
          <ChevronDown
            className={`size-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Section Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-5 bg-white dark:bg-gray-800">
          <ResourceList
            resources={section.resources}
            canEdit={canEdit}
            onEdit={onEditResource}
            onDelete={onDeleteResource}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionItem;
