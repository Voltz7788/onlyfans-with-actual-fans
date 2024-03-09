import React from "react";
import LoginHeader from "@/app/components/login-signup/LoginHeader";
import ContentPreview from "@/app/components/login-signup/ContentPreview";
import { auth } from "@/app/utilities/getServerSessionHelper";
import { redirect } from "next/navigation";
import populateDatabase from "@/prisma/populateDatabase";

export default async function Login() {
  const session = await auth();
  // await populateDatabase();

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
