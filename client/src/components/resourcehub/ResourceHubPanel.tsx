// import React, { useState, useEffect, useMemo } from "react";
// import type { RootState } from "@/redux/store";
// import { useSelector, useDispatch } from "react-redux";
// import { PopulatedStudyRoom } from "@/components/RoomInfoPanel";
// import {
//   Plus,
//   Edit3,
//   Trash2,
//   Link as LinkIcon,
//   ChevronDown,
//   X,
// } from "lucide-react";
// import {
//   addSectionApi,
//   addResourceApi,
//   updateSectionApi,
//   updateResourceApi,
//   deleteSectionApi,
//   deleteResourceApi,
// } from "@/api/room_section";
// import toast from "react-hot-toast";
// import { setRoomData } from "@/redux/slices/roomSlice";
// import type { Section, Resource } from "@/config/schema/StudyRoom";

// type ModalState =
//   | { type: "add-section" }
//   | { type: "add-resource"; sectionId: string }
//   | { type: "edit-section"; section: Section }
//   | { type: "edit-resource"; sectionId: string; resource: Resource }
//   | null;

// const ResourceHubPanel: React.FC = () => {
//   const [modalState, setModalState] = useState<ModalState>(null);
//   const dispatch = useDispatch();

//   const selectedRoom = useSelector(
//     (state: RootState) => state.room.selectedRoom
//   ) as PopulatedStudyRoom | null;
//   const { userData } = useSelector((state: RootState) => state.user);

//   const resourceHub = selectedRoom?.resourceHub || [];

//   const { canEdit } = useMemo(() => {
//     if (!selectedRoom || !userData) return { canEdit: false };
//     const isOwner = selectedRoom.owner._id === userData._id;
//     const currentUserMemberInfo = selectedRoom.members.find(
//       (m) => m.user._id === userData._id
//     );
//     const isAdmin = currentUserMemberInfo?.isAdmin || false;
//     return { canEdit: isOwner || isAdmin };
//   }, [selectedRoom, userData]);

//   const handleOptimisticUpdate = (updatedRoomData: PopulatedStudyRoom) => {
//     dispatch(setRoomData(updatedRoomData));
//   };

//   const handleAddSection = async (title: string) => {
//     if (!selectedRoom) return;
//     const tempId = `temp-section-${Date.now()}`;
//     const newSection: Section = { _id: tempId, title, resources: [] };
//     const optimisticRoom = {
//       ...selectedRoom,
//       resourceHub: [...resourceHub, newSection],
//     };
//     handleOptimisticUpdate(optimisticRoom);
//     setModalState(null);

//     try {
//       const savedSection = await addSectionApi(selectedRoom._id, title);
//       const finalRoom = {
//         ...optimisticRoom,
//         resourceHub: resourceHub.map((s) =>
//           s._id === tempId ? savedSection : s
//         ),
//       };
//       dispatch(setRoomData(finalRoom));
//       toast.success("Section added!");
//     } catch (error) {
//       toast.error("Failed to add section");
//       dispatch(setRoomData(selectedRoom));
//     }
//   };

//   const handleAddResource = async (
//     sectionId: string,
//     title: string,
//     link: string
//   ) => {
//     if (!selectedRoom) return;
//     const tempId = `temp-res-${Date.now()}`;
//     const newResource: Resource = { _id: tempId, title, link };

//     const optimisticRoom = {
//       ...selectedRoom,
//       resourceHub: resourceHub.map((section) =>
//         section._id === sectionId
//           ? { ...section, resources: [...section.resources, newResource] }
//           : section
//       ),
//     };
//     handleOptimisticUpdate(optimisticRoom);
//     setModalState(null);

//     try {
//       const savedResource = await addResourceApi(
//         selectedRoom._id,
//         sectionId,
//         title,
//         link
//       );
//       const finalRoom = {
//         ...optimisticRoom,
//         resourceHub: optimisticRoom.resourceHub.map((section) =>
//           section._id === sectionId
//             ? {
//                 ...section,
//                 resources: section.resources.map((r) =>
//                   r._id === tempId ? savedResource : r
//                 ),
//               }
//             : section
//         ),
//       };
//       dispatch(setRoomData(finalRoom));
//       toast.success("Resource added!");
//     } catch (error) {
//       toast.error("Failed to add resource");
//       dispatch(setRoomData(selectedRoom));
//     }
//   };

//   const handleDeleteSection = async (sectionId: string) => {
//     if (
//       !selectedRoom ||
//       !window.confirm(
//         "Are you sure you want to delete this section and all its resources?"
//       )
//     )
//       return;

//     const originalRoom = selectedRoom;
//     const optimisticRoom = {
//       ...selectedRoom,
//       resourceHub: resourceHub.filter((s) => s._id !== sectionId),
//     };
//     handleOptimisticUpdate(optimisticRoom);

//     try {
//       await deleteSectionApi(selectedRoom._id, sectionId);
//       toast.success("Section deleted!");
//     } catch (error) {
//       toast.error("Failed to delete section");
//       dispatch(setRoomData(originalRoom));
//     }
//   };

//   const handleDeleteResource = async (
//     sectionId: string,
//     resourceId: string
//   ) => {
//     if (
//       !selectedRoom ||
//       !window.confirm("Are you sure you want to delete this resource?")
//     )
//       return;

//     const originalRoom = selectedRoom;
//     const optimisticRoom = {
//       ...selectedRoom,
//       resourceHub: resourceHub.map((section) =>
//         section._id === sectionId
//           ? {
//               ...section,
//               resources: section.resources.filter((r) => r._id !== resourceId),
//             }
//           : section
//       ),
//     };
//     handleOptimisticUpdate(optimisticRoom);

//     try {
//       await deleteResourceApi(selectedRoom._id, sectionId, resourceId);
//       toast.success("Resource deleted!");
//     } catch (error) {
//       toast.error("Failed to delete resource");
//       dispatch(setRoomData(originalRoom));
//     }
//   };

//   if (!selectedRoom) {
//     return <div className="p-6">Error: No room selected.</div>;
//   }

//   return (
//     <div className="p-6 h-full overflow-y-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-2xl font-bold">Resource Hub</h3>
//         {canEdit && (
//           <button
//             className="btn btn-primary btn-sm"
//             onClick={() => setModalState({ type: "add-section" })}
//           >
//             <Plus className="size-4" />
//             Add Section
//           </button>
//         )}
//       </div>

//       <div className="space-y-3">
//         {resourceHub.length === 0 && (
//           <div className="text-center p-10 bg-base-200 rounded-lg">
//             <p className="text-base-content/70">No resources here yet.</p>
//             {canEdit && (
//               <p className="text-base-content/70 text-sm">
//                 Click "Add Section" to get started.
//               </p>
//             )}
//           </div>
//         )}
//         {resourceHub.map((section, index) => (
//           <div
//             key={section._id || `section-${index}`}
//             className="collapse collapse-arrow bg-base-200"
//           >
//             <input type="checkbox" className="min-h-0" defaultChecked />
//             <div className="collapse-title min-h-0 py-3 px-4 flex justify-between items-center">
//               <span className="font-semibold">{section.title}</span>
//               {canEdit && (
//                 <div className="flex gap-1 z-10">
//                   <button
//                     className="btn btn-xs btn-ghost btn-circle"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setModalState({
//                         type: "add-resource",
//                         sectionId: section._id!,
//                       });
//                     }}
//                   >
//                     <Plus className="size-4" />
//                   </button>
//                   <button
//                     className="btn btn-xs btn-ghost btn-circle"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDeleteSection(section._id!);
//                     }}
//                   >
//                     <Trash2 className="size-4 text-error" />
//                   </button>
//                 </div>
//               )}
//             </div>
//             <div className="collapse-content bg-base-100">
//               <ul className="py-2">
//                 {section.resources.length === 0 && (
//                   <li className="text-sm text-base-content/60 italic p-2">
//                     No resources in this section.
//                   </li>
//                 )}
//                 {section.resources.map((resource, rIndex) => (
//                   <li
//                     key={resource._id || `res-${rIndex}`}
//                     className="flex justify-between items-center p-2 rounded-lg hover:bg-base-200 group"
//                   >
//                     <a
//                       href={resource.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-2 text-primary"
//                     >
//                       <LinkIcon className="size-4" />
//                       <span className="font-medium hover:underline">
//                         {resource.title}
//                       </span>
//                     </a>
//                     {canEdit && (
//                       <button
//                         className="btn btn-xs btn-ghost btn-circle opacity-0 group-hover:opacity-100 transition-opacity"
//                         onClick={() =>
//                           handleDeleteResource(section._id!, resource._id!)
//                         }
//                       >
//                         <Trash2 className="size-4 text-error" />
//                       </button>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))}
//       </div>

//       {modalState && (
//         <ResourceModal
//           initialState={modalState}
//           onClose={() => setModalState(null)}
//           onAddSection={handleAddSection}
//           onAddResource={handleAddResource}
//         />
//       )}
//     </div>
//   );
// };

// export default ResourceHubPanel;

// interface ResourceModalProps {
//   initialState: ModalState;
//   onClose: () => void;
//   onAddSection: (title: string) => void;
//   onAddResource: (sectionId: string, title: string, link: string) => void;
// }

// const ResourceModal: React.FC<ResourceModalProps> = ({
//   initialState,
//   onClose,
//   onAddSection,
//   onAddResource,
// }) => {
//   const [title, setTitle] = useState(
//     initialState?.type === "edit-section" ? initialState.section.title : ""
//   );
//   const [link, setLink] = useState(
//     initialState?.type === "edit-resource" ? initialState.resource.link : ""
//   );
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       if (initialState?.type === "add-section") {
//         await onAddSection(title);
//       } else if (initialState?.type === "add-resource") {
//         await onAddResource(initialState.sectionId, title, link);
//       }
//     } catch (error) {
//       console.error("Modal submit error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getTitle = () => {
//     if (initialState?.type === "add-section") return "Add New Section";
//     if (initialState?.type === "add-resource") return "Add New Resource";
//     return "Edit";
//   };

//   return (
//     <div className={`modal ${initialState ? "modal-open" : ""}`}>
//       <div className="modal-box">
//         <button
//           className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//           onClick={onClose}
//         >
//           <X className="size-5" />
//         </button>
//         <h3 className="font-bold text-lg">{getTitle()}</h3>
//         <form onSubmit={handleSubmit} className="space-y-4 mt-4">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Title</span>
//             </label>
//             <input
//               type="text"
//               placeholder="e.g., Chapter 1 Notes"
//               className="input input-bordered w-full"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           {initialState?.type === "add-resource" && (
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Link (URL)</span>
//               </label>
//               <input
//                 type="url"
//                 placeholder="https://example.com"
//                 className="input input-bordered w-full"
//                 value={link}
//                 onChange={(e) => setLink(e.target.value)}
//                 required
//               />
//             </div>
//           )}

//           <div className="modal-action">
//             <button
//               type="button"
//               className="btn btn-ghost"
//               onClick={onClose}
//               disabled={isLoading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn btn-primary"
//               disabled={
//                 isLoading ||
//                 !title.trim() ||
//                 (initialState?.type === "add-resource" && !link.trim())
//               }
//             >
//               {isLoading ? (
//                 <span className="loading loading-spinner loading-xs"></span>
//               ) : (
//                 "Save"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//       <div className="modal-backdrop" onClick={onClose}></div>
//     </div>
//   );
// };
