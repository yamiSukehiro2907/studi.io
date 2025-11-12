import type { Member, RoomMember } from "./Member";
import type { Message } from "./Message";
import type { Section } from "./Section";

export interface StudyRoom {
  _id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  roomImage: string;
  owner: Member;
  members: RoomMember[];
  whiteBoardState: string;
  messages?: Message[];
  resourceHub: Section[];
  createdAt: string;
  updatedAt: string;
}
