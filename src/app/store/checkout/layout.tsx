import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/session";

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();
  if (!user) redirect("/store/auth/login?next=/store/checkout");
  return <>{children}</>;
}
