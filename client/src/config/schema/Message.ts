export interface Message {
  _id: string;
  content: string;
  sender: {
    _id: string;
    name: string;
    profileImage?: string;
  };
  createdAt: string;
}
