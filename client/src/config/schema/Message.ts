export interface Message {
  _id: string;
  content: string;
  sender: Message_Sender;
  room: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message_Sender {
  _id: string;
  name: string;
  profileImage?: string;
}
