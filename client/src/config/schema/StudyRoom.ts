export interface Member {
  user: string;
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
  whiteboardState?: string;
  resourceHub: Section[];
  createdAt: string;
  updatedAt: string;
}
