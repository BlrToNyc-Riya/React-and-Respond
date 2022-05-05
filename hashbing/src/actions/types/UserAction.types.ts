import firebase from "firebase";

export type UserAction = {
  type: string;
  payload?: string | UserType;
  user: firebase.User | null;
};

export type UserType = {
  user: firebase.User | null;
};
