export interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
  bio?: string;
  isVerified: Boolean;
  deleted: Boolean;
  createdAt: string;
  updatedAt: string;
  profileImage?: string;
}
