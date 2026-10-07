import { Dispatch, SetStateAction } from "react";

export interface Auth {
  username?: string;
  [key: string]: any;
}

export interface AuthContextType {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
}
