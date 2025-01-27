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

export enum AuthErrorType {
  SIGNIN_ERROR="Invalid credentials",
  SIGNUP_ERROR="User already exists",
  CLIENT_ERROR="Client Error",
  SERVER_ERROR="Intenal Server Error",
};