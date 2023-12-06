import React from "react";
import ContentPreview from "@/app/components/login-signup/ContentPreview";
import SignupHeader from "@/app/components/login-signup/SignupHeader";
import { auth } from "@/app/utilities/getServerSessionHelper";
import { redirect } from "next/navigation";

export default async function Signup() {
  const session = await auth();

  if (session) redirect("/");
  return (
    <>
      <SignupHeader />
      <ContentPreview />
    </>
  );
}
