import SubscriptionPanel from "./SubscriptionPanel";
import { auth } from "@/app/utilities/getServerSessionHelper";
import { CustomSession } from "@/@types/types";
import getUserSubscriptions from "@/app/utilities/data-utilities/getUserSubscriptions";

export default async function SubscriptionList() {
  const session: CustomSession = await auth();

  const allSubscriptions = await getUserSubscriptions({
    email: session?.user?.email!,
  });

  return (
    <section className="flex flex-col gap-4 p-4">
      {allSubscriptions.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-600 text-lg">
            You don&apos;t have any subscriptions
          </p>
        </div>
      ) : (
        allSubscriptions.map((sub) => (
          <SubscriptionPanel key={sub.id} sub={sub} session={session} />
        ))
      )}
    </section>
  );
}
