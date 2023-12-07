import { Session } from "next-auth";

export type CustomSession = (Session & { username?: string }) | null;
