export interface Message {
  _id: string;
  content: string;
  sender: {
    _id?: string;
    username?: string;
    name?: string;
    profileImage?: string;
  } ; 
  room: string;
  createdAt?: string;
  updatedAt?: string;
}