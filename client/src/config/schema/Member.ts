export interface Member {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export interface RoomMember {
  user: Member;
  isAdmin: boolean;
}
