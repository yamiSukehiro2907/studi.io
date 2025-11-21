import type { Dispatch as ReduxDispatch } from "@reduxjs/toolkit";
import type { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import type { StudyRoom } from "@/config/schema/StudyRoom";
import type { Section } from "@/config/schema/Section";
import type { Resource } from "@/config/schema/Resource";
import {
  addSection as addSectionAction,
  updateSection as updateSectionAction,
  deleteSection as deleteSectionAction,
  addResource as addResourceAction,
  updateResource as updateResourceAction,
  deleteResource as deleteResourceAction,
} from "@/redux/slices/roomSlice";
import {
  createSection,
  deleteSection,
  updateSection,
} from "@/api/room_section";
import {
  createResource,
  deleteResource,
  updateResource,
} from "@/api/room_resource";
import type {ModalState} from "@/components/resourcehub/ResourceModalProps.ts";

type ConfirmModalState = {
  isOpen: boolean;
  type: "section" | "resource";
  id: string;
  sectionId?: string;
} | null;

export const useResourceHandlers = (
  selectedRoom: StudyRoom | null,
  dispatch: ReduxDispatch,
  setModalState: (state: ModalState) => void,
  setConfirmModal: Dispatch<SetStateAction<ConfirmModalState>>
) => {
  const handleAddSection = async (title: string) => {
    if (!selectedRoom) return;
    const tempId = `temp-section-${Date.now()}`;
    const newSection: Section = { _id: tempId, title, resources: [] };

    dispatch(
      addSectionAction({ roomId: selectedRoom._id, section: newSection })
    );
    setModalState(null);

    try {
      const savedSection = await createSection(selectedRoom._id, title);
      dispatch(
        deleteSectionAction({ roomId: selectedRoom._id, sectionId: tempId })
      );
      dispatch(
        addSectionAction({ roomId: selectedRoom._id, section: savedSection })
      );
      toast.success("Section added!");
    } catch {
      dispatch(
        deleteSectionAction({ roomId: selectedRoom._id, sectionId: tempId })
      );
      toast.error("Failed to add section");
    }
  };

  const handleUpdateSection = async (sectionId: string, title: string) => {
    if (!selectedRoom) return;
    const section = selectedRoom.resourceHub?.find((s) => s._id === sectionId);
    if (!section) return;

    const updatedSection: Section = { ...section, title };
    dispatch(
      updateSectionAction({ roomId: selectedRoom._id, section: updatedSection })
    );
    setModalState(null);

    try {
      const savedSection = await updateSection(
        selectedRoom._id,
        sectionId,
        title
      );
      dispatch(
        updateSectionAction({ roomId: selectedRoom._id, section: savedSection })
      );
      toast.success("Section updated!");
    } catch {
      dispatch(updateSectionAction({ roomId: selectedRoom._id, section }));
      toast.error("Failed to update section");
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!selectedRoom) return;
    setConfirmModal({ isOpen: true, type: "section", id: sectionId });
  };

  const confirmDeleteSection = async (sectionId: string) => {
    if (!selectedRoom) return;

    const section = selectedRoom.resourceHub?.find((s) => s._id === sectionId);
    if (!section) return;

    dispatch(deleteSectionAction({ roomId: selectedRoom._id, sectionId }));
    setConfirmModal(null);

    try {
      await deleteSection(selectedRoom._id, sectionId);
      toast.success("Section deleted!");
    } catch {
      dispatch(addSectionAction({ roomId: selectedRoom._id, section }));
      toast.error("Failed to delete section");
    }
  };

  const handleAddResource = async (
    sectionId: string,
    title: string,
    link: string
  ) => {
    if (!selectedRoom) return;
    const tempId = `temp-res-${Date.now()}`;
    const newResource: Resource = { _id: tempId, title, link };

    dispatch(
      addResourceAction({
        roomId: selectedRoom._id,
        sectionId,
        resource: newResource,
      })
    );
    setModalState(null);

    try {
      const savedResource = await createResource(selectedRoom._id, sectionId, {
        title,
        link,
      });
      dispatch(
        deleteResourceAction({
          roomId: selectedRoom._id,
          sectionId,
          resourceId: tempId,
        })
      );
      dispatch(
        addResourceAction({
          roomId: selectedRoom._id,
          sectionId,
          resource: savedResource,
        })
      );
      toast.success("Resource added!");
    } catch {
      dispatch(
        deleteResourceAction({
          roomId: selectedRoom._id,
          sectionId,
          resourceId: tempId,
        })
      );
      toast.error("Failed to add resource");
    }
  };

  const handleUpdateResource = async (
    sectionId: string,
    resourceId: string,
    title: string,
    link: string
  ) => {
    if (!selectedRoom) return;
    const section = selectedRoom.resourceHub?.find((s) => s._id === sectionId);
    const resource = section?.resources.find((r) => r._id === resourceId);
    if (!resource) return;

    const updatedResource: Resource = { _id: resourceId, title, link };
    dispatch(
      updateResourceAction({
        roomId: selectedRoom._id,
        sectionId,
        resource: updatedResource,
      })
    );
    setModalState(null);

    try {
      const savedResource = await updateResource(
        selectedRoom._id,
        sectionId,
        resourceId,
        { title, link }
      );
      dispatch(
        updateResourceAction({
          roomId: selectedRoom._id,
          sectionId,
          resource: savedResource,
        })
      );
      toast.success("Resource updated!");
    } catch {
      dispatch(
        updateResourceAction({ roomId: selectedRoom._id, sectionId, resource })
      );
      toast.error("Failed to update resource");
    }
  };

  const handleDeleteResource = async (
    sectionId: string,
    resourceId: string
  ) => {
    if (!selectedRoom) return;
    setConfirmModal({
      isOpen: true,
      type: "resource",
      id: resourceId,
      sectionId,
    });
  };

  const confirmDeleteResource = async (
    sectionId: string,
    resourceId: string
  ) => {
    if (!selectedRoom) return;

    const section = selectedRoom.resourceHub?.find((s) => s._id === sectionId);
    const resource = section?.resources.find((r) => r._id === resourceId);
    if (!resource) return;

    dispatch(
      deleteResourceAction({ roomId: selectedRoom._id, sectionId, resourceId })
    );
    setConfirmModal(null);

    try {
      await deleteResource(selectedRoom._id, sectionId, resourceId);
      toast.success("Resource deleted!");
    } catch {
      dispatch(
        addResourceAction({ roomId: selectedRoom._id, sectionId, resource })
      );
      toast.error("Failed to delete resource");
    }
  };

  return {
    handleAddSection,
    handleUpdateSection,
    handleDeleteSection,
    confirmDeleteSection,
    handleAddResource,
    handleUpdateResource,
    handleDeleteResource,
    confirmDeleteResource,
  };
};
