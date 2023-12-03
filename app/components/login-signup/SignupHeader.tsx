import React from "react";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";

export default function SignupHeader() {
  return (
    <section className="flex w-full overflow-hidden md:h-[860px] border-b">
      <LeftHeader />
      <RightHeader>
        <RightHeader.HeaderText />
        <RightHeader.SignupForm />
        <RightHeader.SignupDisclaimer />
        <RightHeader.LoginLink />
        <RightHeader.OAuthButtons />
      </RightHeader>
    </section>
  );
}
