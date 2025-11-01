import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { StudyRoom } from "@/config/schema/StudyRoom";

export const useResourcePermissions = (selectedRoom: StudyRoom | null) => {
  const { userData } = useSelector((state: RootState) => state.user);

  const { canEdit } = useMemo(() => {
    if (!selectedRoom || !userData) return { canEdit: false };
    const isOwner = selectedRoom.owner._id === userData._id;
    const currentUserMemberInfo = selectedRoom.members.find(
      (m) => m.user._id === userData._id
    );
    const isAdmin = currentUserMemberInfo?.isAdmin || false;
    return { canEdit: isOwner || isAdmin };
  }, [selectedRoom, userData]);

  return { canEdit };
};