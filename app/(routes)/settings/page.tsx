import { SettingsForm } from "@/app/components/settings-page/SettingsForm";
import SettingsHeader from "@/app/components/settings-page/SettingsHeader";
import TopNav from "@/app/components/shared/TopNav";
import { auth } from "@/app/utilities/getServerSessionHelper";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return (
    <main className="relative border-x w-full xl:w-1/3 min-h-screen overflow-">
      <TopNav pageTitle="SETTINGS" />
      <SettingsHeader />
      <SettingsForm />
    </main>
  );
}
