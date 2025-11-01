import React, { useState, useEffect } from "react";
import { X, Save, FolderPlus, Link as LinkIcon } from "lucide-react";
import type { ModalState } from "./ResourceModalProps";

interface ResourceModalProps {
  initialState: ModalState;
  onClose: () => void;
  onAddSection: (title: string) => void;
  onUpdateSection: (sectionId: string, title: string) => void;
  onAddResource: (sectionId: string, title: string, link: string) => void;
  onUpdateResource: (
    sectionId: string,
    resourceId: string,
    title: string,
    link: string
  ) => void;
}

const ResourceModal: React.FC<ResourceModalProps> = ({
  initialState,
  onClose,
  onAddSection,
  onUpdateSection,
  onAddResource,
  onUpdateResource,
}) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState<{ title?: string; link?: string }>({});

  useEffect(() => {
    if (initialState?.type === "edit-section" && initialState.section) {
      setTitle(initialState.section.title);
    } else if (initialState?.type === "edit-resource" && initialState.resource) {
      setTitle(initialState.resource.title);
      setLink(initialState.resource.link);
    }
  }, [initialState]);

  const validateForm = () => {
    const newErrors: { title?: string; link?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (
      (initialState?.type === "add-resource" ||
        initialState?.type === "edit-resource") &&
      !link.trim()
    ) {
      newErrors.link = "Link is required";
    }

    if (
      (initialState?.type === "add-resource" ||
        initialState?.type === "edit-resource") &&
      link.trim() &&
      !isValidUrl(link)
    ) {
      newErrors.link = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (urlString: string) => {
    try {
      const url = new URL(urlString);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (initialState?.type === "add-section") {
      onAddSection(title.trim());
    } else if (initialState?.type === "edit-section" && initialState.section) {
      onUpdateSection(initialState.section._id, title.trim());
    } else if (initialState?.type === "add-resource" && initialState.sectionId) {
      onAddResource(initialState.sectionId, title.trim(), link.trim());
    } else if (
      initialState?.type === "edit-resource" &&
      initialState.sectionId &&
      initialState.resource
    ) {
      onUpdateResource(
        initialState.sectionId,
        initialState.resource._id,
        title.trim(),
        link.trim()
      );
    }
  };

  const getModalTitle = () => {
    switch (initialState?.type) {
      case "add-section":
        return "Add New Section";
      case "edit-section":
        return "Edit Section";
      case "add-resource":
        return "Add New Resource";
      case "edit-resource":
        return "Edit Resource";
      default:
        return "Modal";
    }
  };

  const getModalIcon = () => {
    switch (initialState?.type) {
      case "add-section":
      case "edit-section":
        return <FolderPlus className="size-6 text-white" />;
      case "add-resource":
      case "edit-resource":
        return <LinkIcon className="size-6 text-white" />;
      default:
        return null;
    }
  };

  const isResourceModal =
    initialState?.type === "add-resource" ||
    initialState?.type === "edit-resource";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all animate-scaleIn overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              {getModalIcon()}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white">{getModalTitle()}</h3>
              <p className="text-emerald-100 text-sm mt-0.5">
                {isResourceModal
                  ? "Enter the resource details below"
                  : "Enter the section name"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="size-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {isResourceModal ? "Resource Title" : "Section Title"}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: undefined });
              }}
              placeholder={
                isResourceModal
                  ? "e.g., React Documentation"
                  : "e.g., Programming Resources"
              }
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 ${
                errors.title
                  ? "border-red-500 dark:border-red-500"
                  : "border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500"
              } rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all text-gray-900 dark:text-gray-100`}
              autoFocus
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.title}
              </p>
            )}
          </div>

          {/* Link Input (only for resources) */}
          {isResourceModal && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Resource Link
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                  if (errors.link) setErrors({ ...errors, link: undefined });
                }}
                placeholder="https://example.com"
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 ${
                  errors.link
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500"
                } rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all text-gray-900 dark:text-gray-100`}
              />
              {errors.link && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.link}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Save className="size-5" />
              {initialState?.type?.startsWith("edit") ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ResourceModal;