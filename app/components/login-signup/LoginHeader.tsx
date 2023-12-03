import React from "react";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";

export default function LoginHeader() {
  return (
    <section className="flex w-full overflow-hidden md:h-[700px] border-b">
      <LeftHeader />
      <RightHeader>
        <RightHeader.HeaderText />
        <RightHeader.LoginForm />
        <RightHeader.SignupLink />
        <RightHeader.OAuthButtons />
      </RightHeader>
    </section>
  );
}
