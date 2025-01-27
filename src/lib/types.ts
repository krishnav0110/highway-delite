export interface UserType {
  _id: string;
  email: string;
  name: string;
  dob: string;
};

export interface NoteType {
  _id: string;
  userId: string;
  data: string;
};