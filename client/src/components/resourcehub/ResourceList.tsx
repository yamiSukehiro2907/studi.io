import React from "react";
import { FileText } from "lucide-react";
import type { Resource } from "@/config/schema/Resource";
import ResourceItem from "./ResourceItem";

interface ResourceListProps {
  resources: Resource[];
  canEdit: boolean;
  onEdit: (resource: Resource) => void;
  onDelete: (resourceId: string) => void;
}

const ResourceList: React.FC<ResourceListProps> = ({
  resources,
  canEdit,
  onEdit,
  onDelete,
}) => {
  if (resources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-950 rounded-lg border-2 border-dashed border-emerald-300 dark:border-emerald-700">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full mb-3">
          <FileText className="size-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          No resources in this section yet
        </p>
        {canEdit && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
            Click the + button above to add one
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {resources.map((resource, index) => (
        <ResourceItem
          key={resource._id || `res-${index}`}
          resource={resource}
          canEdit={canEdit}
          onEdit={() => onEdit(resource)}
          onDelete={() => onDelete(resource._id)}
        />
      ))}
    </div>
  );
};

export default ResourceList;