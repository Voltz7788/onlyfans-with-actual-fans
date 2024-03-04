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

export type PostListProps = {
  posts: {
    id: string;
    timePosted: string;
    User: {
      id: string;
      name: string | null;
      username: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
      password: string | null;
    } | null;
    text: string;
    images:
      | {
          id: string;
          url: string | null;
          key: string;
          postId: string | null;
        }[]
      | null;
    video: string | null;
    numOfLikes: number;
    userId: string | null;
  }[];
};

export type Post = {
  id: string;
  timePosted: string;
  User: {
    id: string;
    name: string | null;
    username: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
  } | null;
  text: string;
  images:
    | {
        id: string;
        url: string | null;
        key: string;
        postId: string | null;
      }[]
    | null;
  video: string | null;
  numOfLikes: number;
  userId: string | null;
};

export type PostComponentProps = {
  post: Post;
  isLiked: boolean;
  postedByCurrentUser: boolean;
};
