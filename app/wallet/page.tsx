import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import WalletClient from "./wallet-client";

export default async function WalletPage() {
  const session = await getSession();

  if (!session) {
    redirect("/access");
  }

  return <WalletClient recipientName={session.recipientName} />;
}
