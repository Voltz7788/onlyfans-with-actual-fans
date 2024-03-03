import React from "react";
import LoginHeader from "@/app/components/login-signup/LoginHeader";
import ContentPreview from "@/app/components/login-signup/ContentPreview";
import { auth } from "@/app/utilities/getServerSessionHelper";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <LoginHeader />
      <ContentPreview />
    </>
  );
}
