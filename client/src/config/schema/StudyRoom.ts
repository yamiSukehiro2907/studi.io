export interface Member {
  user: {
    _id: string;
    name: string;
    profileImage?: string;
  };
  isAdmin: boolean;
  _id?: string;
}

export interface Section {
  title: string;
  resources: any[];
  _id?: string;
}

export interface StudyRoom {
  _id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  owner: {
    _id: string;
    name: string;
    profileImage?: string;
  };
  members: Member[];
  roomImage: string;
  whiteboardState?: string;
  resourceHub: Section[];
  createdAt: string;
  updatedAt: string;
}
