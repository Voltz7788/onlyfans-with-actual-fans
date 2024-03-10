import SubscriptionPanel from "./SubscriptionPanel";
import { auth } from "@/app/utilities/getServerSessionHelper";
import { CustomSession } from "@/@types/types";
import getUserSubscriptions from "@/app/utilities/data-utilities/getUserSubscriptions";

export default async function SubscriptionList() {
  const session: CustomSession = await auth();

  const allSubscriptions = await getUserSubscriptions({
    email: session?.user?.email!,
  });

  console.log(
    allSubscriptions.map((sub) => sub.id.substring(sub.id.length - 3))
  );

  return (
    <section className="flex flex-col gap-4 p-4">
      {allSubscriptions.map((sub) => (
        <SubscriptionPanel key={sub.id} sub={sub} session={session} />
      ))}
    </section>
  );
}
