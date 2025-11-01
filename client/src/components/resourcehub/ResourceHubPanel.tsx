import React, { useState } from "react";
import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { Plus, BookOpen } from "lucide-react";
import type { StudyRoom } from "@/config/schema/StudyRoom";
import type { ModalState } from "./ResourceModalProps";
import ResourceModal from "./ResourceModal";
import SectionList from "./SectionList";
import { useResourcePermissions } from "@/hooks/useResourcePermissions";
import { useResourceHandlers } from "@/hooks/useResourceHandlers";
import { ConfirmModal } from "../common/ConfirmModal";

const ResourceHubPanel: React.FC = () => {
  const [modalState, setModalState] = useState<ModalState>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "section" | "resource";
    id: string;
    sectionId?: string;
  } | null>(null);
  const dispatch = useDispatch();

  const selectedRoom = useSelector(
    (state: RootState) => state.room.selectedRoom
  ) as StudyRoom | null;

  const { canEdit } = useResourcePermissions(selectedRoom);
  const handlers = useResourceHandlers(
    selectedRoom,
    dispatch,
    setModalState,
    setConfirmModal
  );

  if (!selectedRoom) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-950">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-emerald-200 dark:border-emerald-800">
          <BookOpen className="size-12 text-emerald-500 mx-auto mb-4" />
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            No room selected
          </p>
        </div>
      </div>
    );
  }

  const resourceHub = selectedRoom.resourceHub || [];

  return (
    <div className="h-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-950 dark:to-teal-950">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-emerald-200 dark:border-emerald-800 shadow-sm">
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                <BookOpen className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                  Resource Hub
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {resourceHub.length}{" "}
                  {resourceHub.length === 1 ? "section" : "sections"}
                </p>
              </div>
            </div>
            {canEdit && (
              <button
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                onClick={() => setModalState({ type: "add-section" })}
              >
                <Plus className="size-5" />
                Add Section
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        className="p-6 overflow-y-auto"
        style={{ height: "calc(100% - 88px)" }}
      >
        <SectionList
          sections={resourceHub}
          canEdit={canEdit}
          onEditSection={(section) =>
            setModalState({ type: "edit-section", section })
          }
          onDeleteSection={handlers.handleDeleteSection}
          onAddResource={(sectionId) =>
            setModalState({ type: "add-resource", sectionId })
          }
          onEditResource={(sectionId, resource) =>
            setModalState({ type: "edit-resource", sectionId, resource })
          }
          onDeleteResource={handlers.handleDeleteResource}
        />
      </div>

      {modalState && (
        <ResourceModal
          initialState={modalState}
          onClose={() => setModalState(null)}
          onAddSection={handlers.handleAddSection}
          onUpdateSection={handlers.handleUpdateSection}
          onAddResource={handlers.handleAddResource}
          onUpdateResource={handlers.handleUpdateResource}
        />
      )}

      <ConfirmModal
        isOpen={confirmModal?.isOpen || false}
        heading={
          confirmModal?.type === "section"
            ? "Delete Section?"
            : "Delete Resource?"
        }
        description={
          confirmModal?.type === "section"
            ? "This will permanently delete this section and all its resources. This action cannot be undone."
            : "This will permanently delete this resource. This action cannot be undone."
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (confirmModal?.type === "section") {
            handlers.confirmDeleteSection(confirmModal.id);
          } else if (
            confirmModal?.type === "resource" &&
            confirmModal.sectionId
          ) {
            handlers.confirmDeleteResource(
              confirmModal.sectionId,
              confirmModal.id
            );
          }
        }}
        onCancel={() => setConfirmModal(null)}
      />
    </div>
  );
};

export default ResourceHubPanel;
