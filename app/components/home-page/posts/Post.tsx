import { ReactNode } from "react";
import {
  PostHeader,
  PostText,
  PostImage,
  PostVideo,
  PostButtons,
} from "./PostParts";

export default function Post({ children }: { children: ReactNode }) {
  return <section className="p-4 border-b">{children}</section>;
}

Post.Header = PostHeader;
Post.Text = PostText;
Post.Image = PostImage;
Post.Video = PostVideo;
Post.Buttons = PostButtons;
