import React from "react";
import TopNav from "@/app/components/shared/TopNav";
import { auth } from "../../utilities/getServerSessionHelper";
import { redirect } from "next/navigation";

export default async function CollectionsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="border-x w-full xl:w-1/3 h-[2000px]">
      <TopNav pageTitle="Collections" />
      <div className="mt-16"></div>
    </main>
  );
}
