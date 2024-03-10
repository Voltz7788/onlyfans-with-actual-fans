import React from "react";
import TopNav from "@/app/components/shared/TopNav";
import { auth } from "../../utilities/getServerSessionHelper";
import { redirect } from "next/navigation";
import SubscriptionPanel from "@/app/components/subscriptions-page/SubscriptionPanel";
import SubscriptionList from "@/app/components/subscriptions-page/SubscriptionList";
import { CustomSession } from "@/@types/types";

export default async function SubscriptionsPage() {
  const session: CustomSession = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="border-x w-full xl:w-1/3 min-h-screen">
      <TopNav pageTitle="SUBSCRIPTIONS" />
      <SubscriptionList />
    </main>
  );
}
