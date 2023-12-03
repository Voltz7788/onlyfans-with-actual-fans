import React from "react";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";

export default function SignupHeader() {
  return (
    <section className="flex w-full overflow-hidden md:h-[800px] border-b">
      <LeftHeader />
      <RightHeader>
        <RightHeader.HeaderText />
        <RightHeader.SignupForm />
        <RightHeader.LoginLink />
        <RightHeader.OAuthButtons />
      </RightHeader>
    </section>
  );
}
