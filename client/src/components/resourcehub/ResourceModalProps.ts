import type { Section } from "@/config/schema/Section";
import type { Resource } from "@/config/schema/Resource";

export type ModalState =
  | { type: "add-section" }
  | { type: "edit-section"; section: Section }
  | { type: "add-resource"; sectionId: string }
  | { type: "edit-resource"; sectionId: string; resource: Resource }
  | null;

  
export interface ResourceModalProps {
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
