import React from "react";
import { FolderOpen } from "lucide-react";
import type { Section } from "@/config/schema/Section";
import type { Resource } from "@/config/schema/Resource";
import SectionItem from "./SectionItem";

interface SectionListProps {
  sections: Section[];
  canEdit: boolean;
  onEditSection: (section: Section) => void;
  onDeleteSection: (sectionId: string) => void;
  onAddResource: (sectionId: string) => void;
  onEditResource: (sectionId: string, resource: Resource) => void;
  onDeleteResource: (sectionId: string, resourceId: string) => void;
}

const SectionList: React.FC<SectionListProps> = ({
  sections,
  canEdit,
  onEditSection,
  onDeleteSection,
  onAddResource,
  onEditResource,
  onDeleteResource,
}) => {
  if (sections.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-dashed border-emerald-300 dark:border-emerald-700 max-w-md">
          <div className="mb-6 inline-flex p-4 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-full">
            <FolderOpen className="size-12 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            No Resources Yet
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start building your resource library
          </p>
          {canEdit && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              Click "Add Section" above to get started
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 max-w-5xl mx-auto">
      {sections.map((section, index) => (
        <SectionItem
          key={section._id || `section-${index}`}
          section={section}
          canEdit={canEdit}
          onEdit={() => onEditSection(section)}
          onDelete={() => onDeleteSection(section._id)}
          onAddResource={() => onAddResource(section._id)}
          onEditResource={(resource) => onEditResource(section._id, resource)}
          onDeleteResource={(resourceId) =>
            onDeleteResource(section._id, resourceId)
          }
        />
      ))}
    </div>
  );
};

export default SectionList;