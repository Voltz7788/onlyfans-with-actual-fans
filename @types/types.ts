import { ISODateString } from "next-auth";

export type CustomSession = {
  expires: ISODateString;
  user?: CustomUser;
} | null;

type CustomUser = {
  name: string;
  email: string;
  image?: string | null;
  username: string;
};
