import { ISODateString } from "next-auth";

export type CustomSession = {
  expires: ISODateString;
  user?: CustomUser;
} | null;

type CustomUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
};
