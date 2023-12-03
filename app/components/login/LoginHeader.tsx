import React from "react";
import LeftHeader from "./LeftHeader";
import LoginForm from "./LoginForm";

export default function LoginHeader() {
  return (
    <section className="flex w-full overflow-hidden  md:h-[700px] border-b shadow-sm">
      <LeftHeader />
      <LoginForm />
    </section>
  );
}
