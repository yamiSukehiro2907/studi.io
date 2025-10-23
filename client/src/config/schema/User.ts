export interface User {
  _id: string;
  username: string;
  email: string;
  name: string,
  profileImage?: string;
  bio?: string;
  isVerified: Boolean;
  deleted: Boolean;
  createdAt: string;
}